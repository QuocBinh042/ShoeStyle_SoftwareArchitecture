import { Modal, Tabs, Timeline, Tag, Image, Steps, Divider } from "antd";
import React from "react";

function OrderDetailModal({ isOpen, onClose, order }) {
  const orderHistory = [
    {
      status: "Order Placed",
      time: "Oct 24, 2024",
    },
    {
      status: "Processing",
      time: "Oct 28, 2024",
    },
    {
      status: "Shipped",
      time: "Oct 30, 2024",
      estimatedDelivery: "Estimated Delivery Date: Nov 01, 2024",
    },
    {
      status: "Delivered",
      time: "Nov 01, 2024",
      details: "Shipped successfully!",
    },  
    
  ];

  return (
    <Modal
      title={`Order #${order.id}`}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={750}
      centered
    >
      <div style={{ padding: "20px" }}>
        {/* Progress Section */}
        <div style={{ marginBottom: 20 }}>
          <Steps
            current={orderHistory.length - 1} // Đặt trạng thái hiện tại là trạng thái cuối cùng
            direction="horizontal"
            style={{ marginBottom: 20 }}
          >
            {orderHistory.map((item, index) => (
              <Steps.Step
                key={index}
                title={item.status}
                description={item.time}
                status={index === orderHistory.length - 1 ? "finish" : "process"} // Màu xanh cho trạng thái cuối cùng
              />
            ))}
          </Steps>
        </div>
          <Divider/>

        {/* Item Details Section */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", margin:0 }}>
            <Image src={order.details.image} width={100} />
            <div style={{ marginLeft: 20 }}>
              <h3>{order.details.name}</h3>
              <Tag color="black">{order.details.color}</Tag>
              <Tag color="blue">{order.details.size}</Tag>
              <Tag color="red">{order.details.price}</Tag>
              <div style={{ marginTop: 10 }}>Quantity: {order.quantity}</div>
              <div style={{ marginTop: 10 }}>
                <b>Total:</b> {order.total}
              </div>
            </div>
          </div>
        </div>
        <Divider/>
        <div style={{ marginBottom: 30 }}>
          <h3 style={{margin:0}}>Shipping Details</h3>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <h4>Ordered From</h4>
              <p>{order.sellerName}</p>
              <p>{order.sellerAddress}</p>
            </div>
            <div>
              <h4>Shipping Address</h4>
              <p>{order.name}</p>
              <p>{order.shippingAddress}</p>
              <p>{order.phone}</p>
            </div>
          </div>
        </div>
        <Divider/>
        <div>
          <h3 style={{margin:0}}>Payment Summary</h3>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p>Payment Method:</p>
            <p>{order.paymentMethod}</p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p>Shipping:</p>
            <p>{order.shippingCost}</p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p>Discount:</p>
            <p>{order.discount}</p>
          </div>
          <Divider/>
          <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold" }}>
            <p style={{fontSize:20}}>Total:</p>
            <p style={{fontSize:20}}>{order.total}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default OrderDetailModal;
