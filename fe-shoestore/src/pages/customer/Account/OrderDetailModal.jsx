import { Modal, Tabs, Timeline, Tag, Image, Steps, Divider } from "antd";
import React from "react";

function OrderDetailModal({ isOpen, onClose, order }) {
  if (!order) return null;
  const calculateTotal = () =>
    order.details.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

  return (
    <Modal
      title={`Order #${order.code}`}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={750}
      centered
    >
      <div style={{ padding: "20px" }}>
        <div style={{ marginBottom: 20 }}>
          <Steps
            current={order.orderHistory?.length - 1 || 0}
            direction="horizontal"
            style={{ marginBottom: 20 }}
          >
            {order.orderHistory?.map((item, index) => (
              <Steps.Step
                key={index}
                title={item.status}
                description={item.time}
                status={index === order.orderHistory.length - 1 ? "finish" : "process"}
              />
            ))}
          </Steps>
        </div>
        <Divider />

        <div style={{ marginBottom: 30 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {/* <div>
              <h4>Ordered From</h4>
              <p>{order.sellerName}</p>
              <p>{order.sellerAddress}</p>
            </div> */}
            <div>
              <h4>Shipping Address</h4>
              <p>{order.name}</p>
              <p>{order.shippingAddress}</p>
              <p>{order.phone}</p>
            </div>
          </div>
        </div>
        <div style={{ marginBottom: 20 }}>
          <h3 style={{ marginBottom:20 }}>Shipping Details</h3>
          {order.details.map((detail, index) => (
            <div
              key={index}
              style={{ display: "flex", alignItems: "center", marginBottom: 20 }}
            >
              <Image
                src={detail.image}
                width={100}
                style={{ borderRadius: "5px" }}
              />
              <div style={{ marginLeft: 20 }}>
                {/* <h3>{detail.name}</h3> */}
                <Tag color={detail.color}>{detail.color}</Tag>
                <Tag color="blue">{detail.size}</Tag>
                <Tag color="red">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(detail.price)}</Tag>
                <div style={{ marginTop: 10 }}>Quantity: {detail.quantity}</div>
                <div style={{ marginTop: 10 }}>
                  Subtotal:<b> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(detail.price * detail.quantity)}</b>
                </div>
              </div>
            </div>
          ))}
          <h5 style={{fontSize:18}}>Total price: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(calculateTotal())}</h5>
        </div>
        <Divider />

        {/* Shipping Details */}
        
        <Divider />

        {/* Payment Summary */}
        <div>
          <h3 style={{ margin: 0 }}>Payment Summary</h3>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p>Payment Method:</p>
            <p>{order.paymentMethod}</p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p>Payment status:</p>
            <p>{order.paymentStatus}</p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p>Shipping:</p>
            <p> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.feeShip)}</p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p>Discount:</p>
            <p> - {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.discount)}</p>
          </div>
          <Divider />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: "bold",
            }}
          >
            <p style={{ fontSize: 20 }}>Total:</p>
            <p style={{ fontSize: 20 }}> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.total)}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default OrderDetailModal;
