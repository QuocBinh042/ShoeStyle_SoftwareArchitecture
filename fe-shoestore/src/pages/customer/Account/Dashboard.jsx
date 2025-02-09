import React, { useState, useEffect } from "react";
import { Card, Row, Col, Table, Statistic, Avatar, Typography, Button, Modal, Form, Input, notification } from "antd";
import { ShoppingCartOutlined, DollarOutlined, UserOutlined, EditOutlined } from "@ant-design/icons";
import { countOrderByUser, sumAmount, fetchOrderByUser } from "../../../services/orderService";
import { fetchUserInfoById, updateUserInfo } from "../../../services/userService";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useAuth } from "../../../context/AuthContext";
const { Title, Text } = Typography;

const UserDashboard = () => {
    const [quantiyOrder, setQuantityOrder] = useState(0);
    const [amount, setAmount] = useState(0);
    const [orderData, setOrderData] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [user, setUser] = useState({});
    const [form] = Form.useForm();
    const { user: authUser } = useAuth();

    useEffect(() => {
        if (authUser) {
            fetchUserInfo(authUser.id);
            fetchQuantityOrder(authUser.id);
            fetchtotalAmount(authUser.id);
            fetchOrders(authUser.id);
        }
    }, [authUser]);
    const fetchQuantityOrder = async (userId) => {
        const count = await countOrderByUser(userId);
        setQuantityOrder(count);
    };

    const fetchtotalAmount = async (userId) => {
        const amount = await sumAmount(userId);
        setAmount(amount);
    };

    const fetchOrders = async (userId) => {
        const orders = await fetchOrderByUser(userId);
        processMonthlyData(orders);
        setFilteredOrders(orders.filter(order => order.status !== "Completed"));
    };

    const fetchUserInfo = async (userId) => {
        const userInfo = await fetchUserInfoById(userId);
        setUser(userInfo);
    };

    const processMonthlyData = (orders) => {
        const monthlyData = Array.from({ length: 12 }, (_, index) => ({
            month: `${index + 1}`,
            amount: 0,
        }));

        orders.forEach(order => {
            const orderDate = new Date(order.orderDate);
            if (!isNaN(orderDate) && orderDate.getFullYear() === new Date().getFullYear()) {
                monthlyData[orderDate.getMonth()].amount += order.total;
            }
        });

        setOrderData(monthlyData);
    };

    const showModal = () => {
        form.setFieldsValue(user);
        setIsModalOpen(true);
    };

    const handleOk = () => {
        form.validateFields().then(async (values) => {
            const updatedUser = await updateUserInfo(user.userID, values);
            setUser(updatedUser);
            setIsModalOpen(false);
        }).catch(() => {
            notification.error({ message: 'Form has errors!', description: 'Please fix the errors before submitting.' });
        });
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const columns = [
        { title: "Order code", dataIndex: "code", key: "code" },
        { title: "Order date", dataIndex: "orderDate", key: "orderDate" },
        { title: "Total", dataIndex: "total", key: "total", render: (text) => `${text} đ` },
        { title: "Status", dataIndex: "status", key: "status" },
    ];

    return (
        <div style={{ padding: 20 }}>
            {/* User Info */}
            <Card style={{ textAlign: "center" }}>
                <Avatar size={100} icon={<UserOutlined />} />
                <Title level={3}>{user.name}</Title>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", padding: "10px" }}>
                    <Text><b>Email: </b> {user.email}</Text>
                    <Text><b>User name: </b> {user.userName}</Text>
                    <Text><b>CI: </b> {user.ci}</Text>
                    <Text><b>Phone: </b> {user.phoneNumber}</Text>
                </div>
                <Button type="primary" icon={<EditOutlined />} onClick={showModal} style={{ marginTop: 10 }}>Edit</Button>
            </Card>

            {/* Order Statistics */}
            <Row gutter={16} style={{ marginTop: 20 }}>
                <Col span={12}>
                    <Card>
                        <Statistic title="Your total order" value={quantiyOrder} prefix={<ShoppingCartOutlined />} />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card>
                        <Statistic title="Total amount spent" value={amount} prefix={<DollarOutlined />} suffix="đ" />
                    </Card>
                </Col>
            </Row>
            <Card title="Monthly expenses in 2025" style={{ marginTop: 20 }}>
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={orderData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="amount" fill="#1890ff" />
                    </BarChart>
                </ResponsiveContainer>
            </Card>


            <Card title="Current orders" style={{ marginTop: 20 }}>
                <Table dataSource={filteredOrders} columns={columns} pagination={false} />
            </Card>

            <Modal
                title="Edit User Info"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="email"
                        label="Email"

                    >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        name="userName"
                        label="User name"
                        rules={[
                            { required: true, message: "Please enter your user name!" },
                            { pattern: /^[A-Za-z].*/, message: "User name must start with a letter!" }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="phoneNumber"
                        label="Phone"
                        rules={[
                            { required: true, message: "Please enter your phone number!" },
                            { pattern: /^[0-9]{10}$/, message: "Phone number must contain exactly 10 digits!" }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="ci"
                        label="CI"
                        rules={[
                            { required: true, message: "Please enter your CI!" },
                            { pattern: /^[0-9]{12}$/, message: "CI must contain exactly 12 digits!" }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default UserDashboard;