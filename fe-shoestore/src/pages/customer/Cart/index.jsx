import React, { useState, useEffect } from "react";
import { Table, InputNumber, Button, Card, Checkbox, Row, Col, Select, Input, Modal } from "antd";
import './Cart.scss'
import { ArrowLeftOutlined, DeleteOutlined } from "@ant-design/icons";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { fetchCartItemByCartId } from "../../../services/cartItemService";
import { fetchProductDetailById } from "../../../services/productDetailService";
import { fetchProductByProductDetailId } from "../../../services/productService";
const Cart = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isCheckout = location.pathname.includes("/cart/checkout");
  const [cartItems, setCartItems] = useState([]);
  const sizeMap = {
    SIZE_36: 36,
    SIZE_37: 37,
    SIZE_38: 38,
    SIZE_39: 39,
    SIZE_40: 40,
    SIZE_41: 41,
    SIZE_42: 42,
    SIZE_43: 43,
    SIZE_44: 44,
  };
  const handleSizeChange = (size, key) => {
    const sizeKey = `SIZE_${size}`;  // Chuyển size số thành SIZE_x để lưu vào cơ sở dữ liệu
    const updatedItems = cartItems.map((item) =>
      item.key === key ? { ...item, selectedSize: size, size: sizeKey } : item
    );
    console.log(updatedItems)
    setCartItems(updatedItems);
  };
  const colorOptions = [
    { value: "RED", label: "RED" },
    { value: "GREEN", label: "GREEN" },
    { value: "BLUE", label: "BLUE" },
    { value: "YELLOW", label: "YELLOW" },
    { value: "BLACK", label: "BLACK" },
    { value: "WHITE", label: "WHITE" },
    { value: "PINK", label: "PINK" },
  ];
  const handleColorChange = (color, key) => {
    const updatedItems = cartItems.map((item) =>
      item.key === key ? { ...item, colors: color } : item
    );
    console.log(updatedItems)
    setCartItems(updatedItems);
  };

  const loadCartItemByUser = async (id) => {
    const data = await fetchCartItemByCartId(id);
    if (data && Array.isArray(data)) {
      const productDetailIds = data.map(item => item.id.productDetailId);
      const productDetails = await Promise.all(
        productDetailIds.map(id => fetchProductDetailById(id))
      );
      const products = await Promise.all(
        productDetails.map((detail) =>
          fetchProductByProductDetailId(detail.productDetailID)
        )
      );
      const enrichedCartItems = data.map((cartItem, index) => ({
        key: `${cartItem.id.cartId}-${cartItem.id.productDetailId}`,
        name: products[index].productName,
        size: productDetails[index].size,
        colors: productDetails[index].color,
        quantity: cartItem.quantity,
        price: products[index].price,
        image: products[index].imageURL,

      }));
      setCartItems(enrichedCartItems)

    } else {
      console.log('No products received or invalid data format');
    }
  };

  useEffect(() => {
    loadCartItemByUser(1)
  }, []);
  const handleQuantityChange = (value, product) => {
    const updatedItems = cartItems.map((item) =>
      item.key === product.key ? { ...item, quantity: value } : item
    );
    setCartItems(updatedItems);
  };

  const handleRemove = (key) => {
    const updatedItems = cartItems.filter((item) => item.key !== key);
    setCartItems(updatedItems);
  };

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const columns = [
    {
      dataIndex: "checkbox",
      render: (_, product) => <Checkbox />,
    },
    {
      title: "PRODUCT",
      dataIndex: "name",
      render: (_, product) => (
        <Row gutter={[16, 16]} align="middle">
          <Col className="cart-item__image-wrapper">
            <img className="cart-item__image" src={product.image} alt={product.name} />
          </Col>
          <Col>
            <div className="cart-item__name">{product.name}</div>
            <div style={{ display: 'flex' }}>
              <Select
                className="cart-item__dropdown"
                value={product.size ? parseInt(product.size.replace('SIZE_', '')) : undefined}
                onChange={(size) => handleSizeChange(size, product.key)}
                options={[...Array(9).keys()].map(i => ({
                  value: 36 + i,
                  label: 36 + i
                }))}
              />
              <Select
                className="cart-item__dropdown"
                value={product.colors}  // Sử dụng màu sắc hiện tại của cartItem
                onChange={(color) => handleColorChange(color, product.key)}  // Cập nhật khi thay đổi màu
                options={colorOptions.map((color) => ({
                  value: color.value,
                  label: (
                    <span style={{ display: 'flex', alignItems: "center", gap: "8px", }} >
                      <span
                        style={{
                          width: "16px",
                          height: "16px",
                          backgroundColor: color.value.toLowerCase(),
                          borderRadius: "50%",
                          border: "1px solid #ddd"
                        }}
                      />
                      {color.label}
                    </span>
                  ),
                }))}
              />
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
      render: (price) => `$${price.toFixed(2)}`,
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: <Button type="text" color="default">REMOVE</Button>,
      dataIndex: "remove",
      render: (_, product) => (
        <Button type="text" danger onClick={() => handleRemove(product.key)}>
          <DeleteOutlined /> Remove
        </Button>
      ),
    },
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
              pagination={true}
              bordered={false}

            />
          </Col>

          {/* Tổng tiền */}
          <Col xs={24} lg={8}>
            <Card>
              <Row justify="space-between" style={{ marginBottom: 16 }}>
                <Col>Subtotal</Col>
                <Col>${subtotal.toFixed(2)}</Col>
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
                <Col>${subtotal.toFixed(2)}</Col>
              </Row>
              <Button type="primary" block onClick={() => navigate("/cart/checkout")}>
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