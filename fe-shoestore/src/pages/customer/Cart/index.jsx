import React, { useState } from "react";
import { Table, InputNumber, Button, Card, Checkbox, Row, Col, Select, Input, Modal } from "antd";
import './Cart.scss'
import { ArrowLeftOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([
    {
      key: "1",
      name: "Cardigan",
      size: [38, 39, 40, 41, 42, 43, 44],
      colors: ['Blue', 'Red', 'Black', 'White'],
      quantity: 1,
      price: 2500,
      image: "https://via.placeholder.com/100",
    },
    {
      key: "2",
      name: "Cahier Leather Shoulder Bag",
      size: [38, 39, 40, 41, 42, 43, 44],
      colors: ['Blue', 'Red', 'Black', 'White'],
      quantity: 13,
      price: 2500,
      image: "https://via.placeholder.com/100",
    },
    {
      key: "3",
      name: "Nordgreen Watches",
      size: [38, 39, 40, 41, 42, 43, 44],
      colors: ['Blue', 'Red', 'Black', 'White'],
      quantity: 1,
      price: 2500,
      image: "https://via.placeholder.com/100",
    },
  ]);
  
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
                className='cart-item__dropdown'
                defaultValue={product.size[0]}
                options={product.size.map((size) => ({
                  value: size,
                  label: size,
                }
                ))}
              />
              <Select
                className="cart-item__dropdown"
                defaultValue={product.colors[0]}
                options={product.colors.map((color) => ({
                  value: color,
                  label: (
                    <span style={{ display: 'flex', alignItems: "center", gap: "8px", }} >
                      <span style={{ width: "16px", height: "16px", backgroundColor: color, borderRadius: "20%", border: "1px solid #ddd" }} />
                      {color}
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
          <Button type="primary" block onClick={()=>navigate("/checkout")}>
            Checkout now
          </Button>
          <Button className='cart-summary__continue' block onClick={() => navigate("/search")}>
            <ArrowLeftOutlined /> Continue shopping
          </Button>
        </Card>
      </Col>
      
    </Row>
  );
};

export default Cart;
