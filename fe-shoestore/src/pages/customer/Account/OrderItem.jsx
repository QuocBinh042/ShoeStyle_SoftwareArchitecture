import { Button, Card, Image, Tag } from "antd";
import React, { useState } from "react";
import OrderDetailModal from "./OrderDetailModal";

function OrderItem({ order }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Card
        title={`Order ID: #${order.id}`}
        extra={<Button onClick={showModal}>View Detail</Button>}
      >
        <div style={styles.row}>
          <div style={styles.rightColumn}>
            <p><strong>Order Date:</strong> {order.date}</p>
            <p>
              <strong>Status:</strong>{" "}
              <Tag color='blue'>{order.status}</Tag>
            </p>
            <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
            <p><strong>Shipping Address:</strong> {order.shippingAddress}</p>
          </div>

          <div style={styles.leftColumn}>
            <Image src={order.details.image} width={150} style={styles.image} />
            <div style={styles.details}>
              <h3 style={styles.name}>{order.details.name}</h3>
              <div style={styles.tags}>
                <Tag color="black">{order.details.color}</Tag>
                <Tag color="blue">{order.details.size}</Tag>
              </div>
              <div style={styles.info}>
                <span>Quantity: {order.quantity}</span>
                <span>Total: {order.total}</span>
              </div>
            </div>
          </div>
          
        </div>
      </Card>

      <OrderDetailModal isOpen={isModalOpen} onClose={closeModal} order={order} />
    </>
  );
}

const styles = {
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "30px",
  },
  leftColumn: {
    display: "flex",
    alignItems: "center",
    gap: "30px",
    flex: 2,
  },
  rightColumn: {
    flex: 2,
    padding: "10px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  },
  image: {
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  },
  details: {
    flex: 1,
  },
  name: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333",
  },
  tags: {
    marginTop: "10px",
    marginBottom: "10px",
    display: "flex",
    gap: "10px",
  },
  info: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    color: "#555",
    fontSize: "14px",
  },
};

export default OrderItem;
