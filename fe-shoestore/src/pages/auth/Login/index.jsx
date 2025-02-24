import React, { useState } from "react";
import { Form, Input, Button, Typography, Row, Col, Card, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { login } from "../../../services/authService";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { jwtDecode } from "jwt-decode";
const { Title, Text } = Typography;

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useAuth();
  const onFinish = async (values) => {
    try {
      const data = await login(values);
      if (data?.accessToken) {
        message.success("Login successful");
        const decoded = jwtDecode(data.accessToken);
        setUser({
          id: decoded.userId,
          email: decoded.sub,
          roles: decoded.roles,
        });

        const redirectTo = location.state?.from || "/";
        navigate(redirectTo, { replace: true });
      } else {
        message.error("Login failed");
      }
    } catch (error) {
      message.error("Đã có lỗi xảy ra!");
    }
  };


  return (
    <Row justify="center" align="middle" style={{ height: "80vh" }}>
      <Col xs={24} sm={18} md={12} lg={8}>
        <Card bordered={false} style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
          <Title level={2} style={{ textAlign: "center" }}>Login</Title>
          <Form name="login" onFinish={onFinish} layout="vertical">
            <Form.Item
              name="email"
              label="Email address"
              rules={[{ required: true, message: "Please input your email address!" }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Enter your email address" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: "Please input your password!" }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Enter your password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" block htmlType="submit" loading={loading}>
                Login
              </Button>
            </Form.Item>
          </Form>
          <Button type="default" block onClick={() => navigate("/")}>
            Back to Home
          </Button>
          <Text style={{ display: "block", textAlign: "center", marginTop: "16px" }}>
            Don't have an account? <a href="/sign-up">Sign up here</a>
          </Text>
        </Card>
      </Col>
    </Row>
  );
};

export default LoginPage;
