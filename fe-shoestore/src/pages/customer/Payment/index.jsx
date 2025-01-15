import React from "react";
import { Card, Typography, Row, Col, Button, Divider } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const PaymentSuccess = () => {
  return (
    <div >
      <Card bordered={false}>
        {/* Success Icon and Message */}
        <Row justify="center" align="middle">
          <CheckCircleOutlined style={{ fontSize: "48px", color: "#52c41a" }} />
        </Row>
        <Row justify="center" align="middle" >
          <Title level={3} style={{ textAlign: "center" }}>
            Thanks for your order!
          </Title>
        </Row>
        <Row justify="center">
          <Text type="secondary" style={{ textAlign: "center" }}>
            The order confirmation has been sent to{" "}
            <Text strong>binh@gmail.com</Text>
          </Text>
        </Row>

        <Divider />

        {/* Transaction Details */}
        <div style={{ marginBottom: "16px" }}>
          <Text type="secondary">Transaction Date</Text>
          <div>Thursday, November 17, 2022 (GMT+7)</div>
        </div>
        <div style={{ marginBottom: "16px" }}>
          <Text type="secondary">Payment Method</Text>
          <div>Mastercard ending with 2564</div>
        </div>
        <div>
          <Text type="secondary">Shipping Method</Text>
          <div>
            Express delivery (1-3 business days){" "}
          </div>
        </div>

        <Divider />

        <Title level={4}>
          Your Order
        </Title>
        <Row align="middle">
          <Col span={6}>
            <img
              src="https://via.placeholder.com/60"
              alt="Product"
              style={{
                width: "60px",
                height: "60px",
                objectFit: "cover",
                borderRadius: "4px",
              }}
            />
          </Col>
          <Col span={12}>
            <div>Cahier Leather Shoulder Bag</div>
            <Text type="secondary">Grey</Text>
            <div>x1</div>
          </Col>
          <Col span={6} style={{ textAlign: "right" }}>
            $2,500.00
          </Col>
        </Row>

        <Divider />
        <Row justify="space-between" style={{ marginBottom: "8px" }}>
          <Col>
            <Text>Subtotal</Text>
          </Col>
          <Col>
            <Text>$2,500.00</Text>
          </Col>
        </Row>
        <Row justify="space-between" style={{ marginBottom: "8px" }}>
          <Col>
            <Text>Applied discount code</Text>
          </Col>
          <Col>
            <Text style={{ color: "#52c41a" }}>20% OFF</Text>
          </Col>
        </Row>
        <Row justify="space-between" style={{ marginBottom: "8px" }}>
          <Col>
            <Text>Discount</Text>
          </Col>
          <Col>
            <Text>-$500.00 (20% OFF)</Text>
          </Col>
        </Row>
        <Row justify="space-between" style={{}}>
          <Col>
            <Text>Shipment cost</Text>
          </Col>
          <Col>
            <Text>$22.50</Text>
          </Col>
        </Row>

        <Divider />

        <Row justify="space-between">
          <Col>
            <Title level={3}>Total</Title>
          </Col>
          <Col>
            <Title level={3} style={{ color: "#1890ff" }}>
              $2,022.50
            </Title>
          </Col>
        </Row>
        <Button
          type="primary"
          block
          style={{ marginTop: "16px" }}
          onClick={() => {
            // Redirect to home or shop
            window.location.href = "/";
          }}
        >
          Continue shopping
        </Button>
      </Card>
    </div>
  );
};

export default PaymentSuccess;
