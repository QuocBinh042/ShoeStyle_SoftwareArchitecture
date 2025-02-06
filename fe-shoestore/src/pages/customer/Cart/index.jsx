import React, { useState, useEffect, useCallback, useContext } from "react";
import { useNavigate, useLocation, UNSAFE_NavigationContext as NavigationContext, Outlet } from "react-router-dom";
import { Table, InputNumber, Button, Card, Checkbox, Row, Col, Select, Input, Modal } from "antd";
import './Cart.scss'
import { ArrowLeftOutlined, CheckCircleOutlined, DeleteOutlined, DownCircleFilled, EditOutlined } from "@ant-design/icons";
import { fetchCartItemByCartId, updateCartItem, deleteCartItem } from "../../../services/cartItemService";
import { fetchProductDetailById } from "../../../services/productDetailService";
import { fetchProductByProductDetailId } from "../../../services/productService";
import { getDiscountByProduct } from "../../../services/promotionService";
const Cart = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isCheckout = location.pathname.includes("/cart/checkout");
  const [cartItems, setCartItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [totalItems, setTotalItems] = useState(0);
  const [isChanged, setIsChanged] = useState(false);

  const loadCartItemByUser = async (id, page = 1, size = 3) => {
    const data = await fetchCartItemByCartId(id, page, size);
    if (data && Array.isArray(data.cartItems)) {
      const productDetailIds = data.cartItems.map(item => item.id.productDetailId);
      const productDetails = await Promise.all(
        productDetailIds.map(id => fetchProductDetailById(id))
      );
      const products = await Promise.all(
        productDetails.map((detail) =>
          fetchProductByProductDetailId(detail.productDetailID)
        )
      );
      const discountPrices = await Promise.all(
        products.map(product => getDiscountByProduct(product.productID))
      );
      const enrichedCartItems = data.cartItems.map((cartItem, index) => ({
        key: cartItem.id.productDetailId,
        name: products[index].productName,
        size: productDetails[index].size,
        colors: productDetails[index].color,
        quantity: cartItem.quantity,
        initialQuantity: cartItem.quantity,
        price: discountPrices[index] ,
        image: products[index].imageURL,
        stockQuantity: productDetails[index].stockQuantity,
        isChecked: false,
      }));


      setCartItems(enrichedCartItems);
      setTotalItems(data.total);
    } else {
      console.log('No products received or invalid data format');
    }
  };


  useEffect(() => {
    loadCartItemByUser(1)
  }, []);
  //To checkout form
  const handleCheckout = () => {

    const selectedItems = cartItems.filter(item => item.isChecked);

    if (selectedItems.length === 0) {
      Modal.warning({
        title: "No items selected",
        content: "Please select at least one item before proceeding to checkout.",
      });
      return;
    }
    console.log(selectedItems)
    navigate("/cart/checkout", { state: { selectedItems } });
  };
  //Check item
  const handleCheckboxChange = (checked, productKey) => {
    const updatedItems = cartItems.map((item) =>
      item.key === productKey ? { ...item, isChecked: checked } : item
    );
    setCartItems(updatedItems);
  };
  //Select all item
  const handleSelectAll = (checked) => {
    const updatedItems = cartItems.map((item) => ({
      ...item,
      isChecked: checked,
    }));
    setCartItems(updatedItems);
  };

  //Update quantity cartItem
  const handleUpdateButtonClick = (product) => {
    const updatedQuantity = product.quantity;
    const updatedData = {
      id: {
        cartId: 1,
        productDetailId: product.key,
      },
      quantity: updatedQuantity,
      subTotal: updatedQuantity * product.price,
    };

    updateCartItem(updatedData.id.cartId, updatedData.id.productDetailId, updatedData)
      .then((result) => {
        const updatedItems = cartItems.map((item) => {
          if (item.key === product.key) {
            return {
              ...item,
              initialQuantity: updatedQuantity,
              isChanged: false,
            };
          }
          return item;
        });

        setCartItems(updatedItems);
        setIsChanged(false);

        Modal.success({
          content: 'Item updated successfully!',
        });
      })
      .catch((error) => {
        console.error('Error updating cart item:', error);
      });
  };

  const handleQuantityChange = (value, product) => {
    if (value > product.stockQuantity) {
      Modal.error({
        content: `The quantity cannot exceed the available stock of ${product.stockQuantity}.`,
      });
      value = product.stockQuantity;
    }

    const updatedItems = cartItems.map((item) => {
      if (item.key === product.key) {
        return {
          ...item,
          quantity: value,
          isChanged: value !== item.initialQuantity,
        };
      }
      return item;
    });

    setCartItems(updatedItems);
    setIsChanged(updatedItems.some(item => item.isChanged));
  };

  //Delete cartItem
  const handleRemove = (key) => {
    const cartId = 1;
    const productDetailId = key;
    deleteCartItem(cartId, productDetailId)
      .then((result) => {
        if (result === 200) {
          loadCartItemByUser(cartId, currentPage, pageSize);
          Modal.success({
            content: 'Item removed successfully!',
          });
        } else {
          Modal.error({
            content: 'Unexpected error occurred while removing item.',
          });
        }
      })
      .catch((error) => {
        console.error('Error removing cart item:', error);
        Modal.error({
          content: 'Error removing item!',
        });
      });
  };
  const handleLeavePage = (e) => {
    if (isChanged && !isCheckout) {
      e.preventDefault();
      e.returnValue = "";
    }
  };



  const subtotal = cartItems
    .filter(item => item.isChecked)
    .reduce((total, item) => total + item.price * item.quantity, 0);


  const columns = [
    {
      dataIndex: "checkbox",
      title: (
        <Checkbox
          onChange={(e) => handleSelectAll(e.target.checked)}
          checked={cartItems.length > 0 && cartItems.every((item) => item.isChecked)}
          indeterminate={cartItems.some((item) => item.isChecked) && !cartItems.every((item) => item.isChecked)}
        >
          Select All
        </Checkbox>
      ),
      render: (_, product) => (
        <Checkbox
          checked={product.isChecked}
          onChange={(e) => handleCheckboxChange(e.target.checked, product.key)}
        />
      ),
    },
    {
      title: "PRODUCT",
      dataIndex: "name",
      render: (_, product) => (
        <Row gutter={[16, 16]} align="middle">
          <Col className="cart-item__image-wrapper">
            <img className="cart-item__image" src={product.image} />
          </Col>
          <Col>
            <div className="cart-item__name">{product.name}</div>
            <div style={{ display: 'flex' }}>
              <span className="size-item">
                {product.size ? parseInt(product.size.replace('SIZE_', '')) : 'N/A'}
              </span>

              <div className="color-item">
                <span
                  style={{
                    display: "inline-block",
                    width: "16px",
                    height: "16px",
                    backgroundColor: product.colors?.toLowerCase() || "#ddd",
                    borderRadius: "50%",
                    border: "1px solid #ddd",
                    marginRight: "3px",
                  }}
                ></span>
                <span>{product.colors || "N/A"}</span>
              </div>
              <span className="stock-item">
                Stock: {product.stockQuantity}
              </span>
            </div>
          </Col>
        </Row>
      ),
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "QUANTITY",
      dataIndex: "quantity",
      render: (_, product) => (
        <InputNumber
          min={1}
          value={product.quantity}
          onChange={(value) => handleQuantityChange(value, product)}
        />
      ),
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "PRICE",
      dataIndex: "price",
      render: (price) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price),
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
    },

    {
      title: "ACTIONS",
      dataIndex: "actions",
      render: (_, product) => (
        <Row gutter={8} align="middle">
          {/* Nút Update */}
          <Col>
            <Button
              type="text"
              onClick={() => handleUpdateButtonClick(product)}
              style={{
                color: product.isChanged ? "#1890ff" : "#999",
                fontWeight: product.isChanged ? "bold" : "normal",
              }}
              disabled={!product.isChanged}
            >
              <CheckCircleOutlined /> Update
            </Button>
          </Col>

          {/* Nút Remove */}
          <Col>
            <Button
              type="text"
              danger
              onClick={() => handleRemove(product.key)}
            >
              <DeleteOutlined /> Remove
            </Button>
          </Col>
        </Row>
      ),
    }

  ];

  return (
    <>
      {!isCheckout && (
        <Row gutter={[16, 16]} className="cart">
          {/* Bảng giỏ hàng */}
          <Col xs={24} lg={16}>
            <Table
              dataSource={cartItems}
              columns={columns}
              pagination={{
                current: currentPage,
                pageSize: pageSize,
                total: totalItems,
                onChange: (page, pageSize) => {
                  setCurrentPage(page);
                  setPageSize(pageSize);
                  loadCartItemByUser(1, page, pageSize);
                },
              }}
              bordered={false}
            />

          </Col>

          {/* Tổng tiền */}
          <Col xs={24} lg={8}>
            {/* {isChanged && (
              <div style={{ color: "red", marginBottom: "16px" }}>
                You have unsaved changes.
              </div>
            )} */}
            <Card>
              <Row justify="space-between" style={{ marginBottom: 16 }}>
                <Col>Subtotal</Col>
                <Col>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(subtotal)}</Col>
              </Row>
              <Row justify="space-between" className='cart-summary__promo'>
                <Input placeholder="Promocode" className='cart-summary__promo-input' />
                <Button className='cart-summary__promo-apply' type="primary">
                  Apply
                </Button>
              </Row>
              <Row justify="space-between" style={{ marginBottom: 16 }}>
                <Col>Discount</Col>
                <Col>$0.00</Col>
              </Row>
              <Row justify="space-between" className="cart-item__total-price" style={{ marginBottom: 24, fontWeight: 700 }}>
                <Col>Total</Col>
                <Col>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(subtotal)}</Col>
              </Row>
              <Button type="primary" block
                onClick={handleCheckout}
              >
                Checkout now
              </Button>
              <Button className='cart-summary__continue' block onClick={() => navigate("/search")}>
                <ArrowLeftOutlined /> Continue shopping
              </Button>
            </Card>
          </Col>

        </Row>)}<Outlet />
    </>
  );
};

export default Cart;