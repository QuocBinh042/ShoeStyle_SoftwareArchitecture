import React, { useState, useEffect } from "react";
import { Radio, Button, Image, Table, Steps, Divider, Modal } from "antd";
import "./Checkout.scss";
import OrderSuccess from "../Order";
import { useLocation } from "react-router-dom";
import { fetchProductDetailById } from "../../../services/productDetailService";
import { addOrder } from "../../../services/orderService";
import { addOrderDetails } from "../../../services/orderDetailService";
import logoVNPAY from '../../../assets/images/logos/vnpay_logo.png'
import { addPayment, getVnPayUrl } from "../../../services/paymentService";
const Checkout = () => {
  const location = useLocation();
  const selectedItems = location.state?.selectedItems || [];
  const [current, setCurrent] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [productDetails, setProductDetails] = useState([]);
  const [shippingMethod, setShippingMethod] = useState("Normal");
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [modalData, setModalData] = useState(null);
  useEffect(() => {
    const fetchProductDetails = async () => {
      const details = await Promise.all(
        selectedItems.map(async (item) => {
          const productDetailId = item.key.split("-")[1]; 
          const detail = await fetchProductDetailById(productDetailId); 
          return { ...item, detail }; 
        })
      );
      setProductDetails(details);
    };

    fetchProductDetails();
  }, [selectedItems]);
  const shippingCost = shippingMethod === "Express" ? 30000 : 0;
  const totalCost = productDetails.reduce((total, product) => total + product.quantity * product.price, 0) + shippingCost;
  const createOrder = async () => {
    if (!paymentMethod) {
      Modal.error({
        content: "Please select a payment method!",
      });
      return;
    }
    const date = new Date();
    const orderCode = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}${String(date.getHours()).padStart(2, "0")}${String(date.getMinutes()).padStart(2, "0")}${String(date.getSeconds()).padStart(2, "0")}`;

    const order = {
      orderDate: new Date().toISOString().split("T")[0],
      status: "Processing",
      total: totalCost,
      feeShip: shippingCost,
      shippingAddress: `${infoUser.address.street}, ${infoUser.address.ward}, ${infoUser.address.district}, ${infoUser.address.city}`,
      user: { userID: 1 },
      code: orderCode
    };

    try {
      const response = await addOrder(order);
      if (response && response.orderID) {
        const orderID = response.orderID;

        // Add order details
        await Promise.all(
          productDetails.map(async (product) => {
            const orderDetail = {
              quantity: product.quantity,
              price: product.price,
              productDetail: { productDetailID: product.detail.productDetailID },
              order: { orderID },
            };
            await addOrderDetails(orderDetail);
          })
        );

        // Add payment
        const payment = {
          paymentDate: new Date().toISOString(),
          status: "Pending",
          order: { orderID },
        };
        await addPayment(payment);
        let vnPayUrl = null;
        if (paymentMethod === "vnpay") {
          const vnPayResponse = await getVnPayUrl(totalCost,orderCode);
          vnPayUrl = vnPayResponse.paymentUrl;
        }
        // Set modal data
        setModalData({
          email: infoUser.email,
          transactionDate: new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" }),
          paymentMethod: paymentMethod === "vnpay" ? "VNPay" : "Cash on Delivery",
          shippingMethod: shippingMethod === "Express" ? "Express delivery (1-3 business days)" : "Normal delivery (3-5 business days)",
          products: productDetails,
          subtotal: productDetails.reduce((total, product) => total + product.quantity * product.price, 0),
          shippingCost: shippingCost,
          total: totalCost,
          vnPayUrl, 
        });
        setIsModalVisible(true)
      }
    } catch (error) {
      console.error("Error creating order, order details, or payment:", error);
      Modal.error({
        content: "Failed to place the order. Please try again.",
      });
    }
  };

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
      content: (
        <Radio.Group
          value={shippingMethod}
          onChange={(e) => setShippingMethod(e.target.value)}
        >
          <Radio value="Normal">Normal</Radio>
          <Radio value="Express">Express</Radio>
        </Radio.Group>
      ),
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
        <Radio.Group
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <Radio value="vnpay">
            <img src={logoVNPAY} className="payment-logo" /> VNPay
          </Radio>
          <Radio value="cod">Cash on Delivery</Radio>
        </Radio.Group>
      ),
    },
    {
      title: "Order confirm",
      content: <Button className="checkout-form__payment-pay-now" onClick={createOrder}>Pay now</Button>,
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
            {productDetails.map((product) => (
              <div key={product.detail.productDetailID}>
                <div className="checkout-summary__item">
                  <Image src={product.image} className="checkout-summary__image" width={120} />
                  <div className="checkout-summary__details">
                    <p className="checkout-summary__product-name">{product.name}</p>
                    <p>{`${product.detail.color} / ${product.detail.size}`}</p>
                    <p>Quantity: {product.quantity}</p>
                  </div>
                  <p className="checkout-summary__product-price">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.quantity * product.price)}</p>
                </div>
                <Divider style={{ marginTop: 1, marginBottom: 1 }} ></Divider>
              </div>

            ))}
          </div>
          <div className="checkout-summary__totals">
            <p className="checkout-summary__subtotal">Subtotal
              <span>
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                  productDetails.reduce((total, product) => total + product.quantity * product.price, 0)
                )}
              </span>
            </p>
            <p className="checkout-summary__shipping">Shipping
              <span>{shippingMethod === "Express" ? "30.000 ₫" : "FREE"}</span>
            </p>
            <p className="checkout-summary__discount">Discount price<span>0</span></p>
            <Divider style={{ marginTop: 5, marginBottom: 10 }} ></Divider>
            <h4 className="checkout-summary__totals">Total <span>
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalCost)}
            </span></h4>
          </div>
        </div>
      </div>
      <Modal
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        centered
        footer={false}
      >
        <OrderSuccess data={modalData} />
      </Modal>
    </>
  );
};

export default Checkout;
