import React, { useState } from "react";
import { Radio, Button, Image, Table, Steps, Divider, Modal } from "antd";
import "./Checkout.scss";
import PaymentSuccess from "../Payment";

const Checkout = () => {
  const [current, setCurrent] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleCheckout = () => {
    setIsModalVisible(true); 
  };

  const products = [
    { id: 1, size: '38', color: 'Black', name: 'Nike Air Max', price: '180.000 VNĐ', image: 'https://res.cloudinary.com/dowsceq4o/image/upload/v1735919650/project_ShoeStore/ImageProduct/1/i3p1us11avw3p4ya1g02.png' },
    { id: 2, size: '38', color: 'White', name: 'Nike Air Max', price: '180.000 VNĐ', image: 'https://res.cloudinary.com/dowsceq4o/image/upload/v1735919650/project_ShoeStore/ImageProduct/1/kxgjis3uuvn3ulvjtluy.png' },
    { id: 3, size: '38', color: 'Black', name: 'Nike Air Max', price: '180.000 VNĐ', image: 'https://res.cloudinary.com/dowsceq4o/image/upload/v1735919650/project_ShoeStore/ImageProduct/1/kxgjis3uuvn3ulvjtluy.png' },
    { id: 4, size: '38', color: 'Black', name: 'Nike Air Max', price: '180.000 VNĐ', image: 'https://res.cloudinary.com/dowsceq4o/image/upload/v1735919650/project_ShoeStore/ImageProduct/1/i3p1us11avw3p4ya1g02.png' },
    { id: 5, size: '38', color: 'Black', name: 'Nike Air Max', price: '180.000 VNĐ', image: 'https://res.cloudinary.com/dowsceq4o/image/upload/v1735919650/project_ShoeStore/ImageProduct/1/i3p1us11avw3p4ya1g02.png' },

  ];

  const infoUser = {
    fullname: "Tran Le Quoc Binh",
    email: "binh@gmail.com",
    phoneNumber: "012345678",
    address: {
      street: "440/45 Thong Nhat",
      ward: "phuong 16",
      district: "quan Go Vap",
      city: "Ho Chi Minh",
    }
  }


  const dataSource = [
    {
      key: '1',
      title: 'Contact',
      content: `${infoUser.fullname}, ${infoUser.phoneNumber}`,
      // action: <Button type="link">Change</Button>,
    },
    {
      key: '2',
      title: 'Shipping address',
      content: `${infoUser.address.street}, ${infoUser.address.ward}, ${infoUser.address.district}, ${infoUser.address.city}`,
      action: <Button type="link">Change</Button>,
    },
    {
      key: '3',
      title: 'Shipping Method',
      content: 'Ship',
      action: null,
    },
  ];

  const columns = [
    {
      title: '',
      dataIndex: 'title',
      key: 'title',
      width: '20%',
    },
    {
      title: '',
      dataIndex: 'content',
      key: 'content',
      width: '60%',
    },
    {
      title: '',
      dataIndex: 'action',
      key: 'action',
      width: '20%',
      align: 'right',
    },
  ];
  const steps = [
    {
      title: "Shipping address",
      content: (
        <>
          <Table
            style={{ padding: '20px 0' }}
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            showHeader={false}
          />
        </>
      ),
    },
    {
      title: "Payment method",
      content: (
        <>
          <div className="checkout-form__payment">
            <div className="checkout-form__payment-options">
              <Radio.Group>
                <Radio value="vnpay">
                  <img src="vnpay_logo.png" alt="VNPay" className="checkout-form__payment-logo" /> VNPay
                </Radio>
                <Radio value="cod">Cash on Delivery</Radio>
              </Radio.Group>
            </div>
          </div>
        </>
      ),
    },
    {
      title: "Order confirm",
      content: <Button className="checkout-form__payment-pay-now" onClick={handleCheckout}>Pay now</Button>,
    },
  ];
  return (
    <>
      <div className="checkout-container">
        <div className="checkout-form">
          <Steps size="small" current={current} direction="vertical" onChange={setCurrent}>
            {steps.map((step, index) => (
              <Steps.Step
                key={index}
                title={<span className="custom-step-title">{step.title}</span>}
                description={step.content}
                // description={current === index ? step.content : null} 
                onClick={() => setCurrent(index)} />
            ))}
          </Steps>
        </div>

        <div className="checkout-summary">
          <div className="checkout-summary__title">
            <span >Order Summary</span>
          </div>
          <div className="scrollable">
            {products.map((product) => (
              <>
                <div key={product.id} className="checkout-summary__item">
                  <Image src={product.image} alt={product.name} className="checkout-summary__image" width={120} />
                  <div className="checkout-summary__details">
                    <p className="checkout-summary__product-name">{product.name}</p>
                    <p>{`${product.color} / ${product.size}`}</p>
                  </div>
                  <p className="checkout-summary__product-price">{product.price}</p>
                </div>
                <Divider style={{ marginTop: 1, marginBottom: 1 }} ></Divider>
              </>

            ))}
          </div>
          <div className="checkout-summary__totals">
            <p className="checkout-summary__subtotal">Subtotal <span>2.225.000 VNĐ</span></p>
            <p className="checkout-summary__shipping">Shipping <span>FREE</span></p>
            <p className="checkout-summary__discount">Discount price<span>225.000 VNĐ</span></p>
            <Divider style={{ marginTop: 5, marginBottom: 10 }} ></Divider>
            <h4 className="checkout-summary__totals">Total <span>2.000.000 VNĐ</span></h4>
          </div>
        </div>
      </div>
      <Modal
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)} 
        centered
        footer={false}
      >
        <PaymentSuccess />
      </Modal>
    </>
  );
};

export default Checkout;
