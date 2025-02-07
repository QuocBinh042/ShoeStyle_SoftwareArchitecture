import React from 'react';
import { Form, Input, Button, Typography, Row, Col, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const { Title } = Typography;

const LoginPage = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  return (
    <Row justify="center" align="middle" style={{ height: '100vh' }}>
      <Col xs={24} sm={18} md={12} lg={8}>
        <Card bordered={false} style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <Title level={2} style={{ textAlign: 'center' }}>Login</Title>
          <Form
            name="login"
            onFinish={onFinish}
            initialValues={{ remember: true }}
            layout="vertical"
          >
            <Form.Item
              name="email"
              label="Email address"
              rules={[{ required: true, message: 'Please input your email address!' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Enter your email address" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Enter your password"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" block htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default LoginPage;
