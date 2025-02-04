import React, { useEffect, useState } from 'react';
import { Card, Avatar, Typography, Button, Modal, Form, Input, notification } from "antd";
import { UserOutlined, EditOutlined } from "@ant-design/icons";
import { fetchUserInfoById, updateUserInfo } from "../../../services/userService";

const { Title, Text } = Typography;

const MyInfo = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [user, setUser] = useState({});
    const [form] = Form.useForm();

    useEffect(() => {
        fetchUserInfo(2);
    }, []);

    const fetchUserInfo = async (userId) => {
        try {
            const userInfo = await fetchUserInfoById(userId);
            setUser(userInfo);
        } catch (error) {
            console.error("Failed to load user info:", error);
        }
    };

    const showModal = () => {
        form.setFieldsValue(user);
        setIsModalOpen(true);
    };

    const handleOk = () => {
        form.validateFields().then(async (values) => {
            try {
                const updatedUser = await updateUserInfo(user.userID, values);
                setUser(updatedUser);
                setIsModalOpen(false);
            } catch (error) {
                console.error("Failed to update user info:", error);
            }
        }).catch(() => {
            // Hiển thị thông báo khi form có lỗi
            notification.error({
                message: 'Form has errors!',
                description: 'Please fix the errors before submitting.',
            });
        });
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <Card style={{ maxWidth: '100%', margin: "auto", textAlign: "center", fontSize: 40 }}>
            <Avatar size={100} icon={<UserOutlined />} />
            <Title level={3}>{user.name}</Title>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", padding: "10px" }}>
                <Text><b>User name: </b> {user.userName}</Text>
                <Text><b>Email: </b> {user.email}</Text>
                <Text><b>CI: </b> {user.ci}</Text>

                <Text><b>Phone: </b> {user.phoneNumber}</Text>
            </div>

            <Button type="primary" icon={<EditOutlined />} onClick={showModal} style={{ marginTop: 10 }}>
                Edit
            </Button>

            <Modal
                title="Edit User Info"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="userName" label="User name">
                        <Input disabled />
                    </Form.Item>

                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[
                            { required: true, message: "Please enter your name!" },
                            { pattern: /^[A-Za-zÀ-Ỹà-ỹ\s]+$/, message: "Name cannot contain numbers or special characters!" }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            { required: true, message: "Please enter your email!" },
                            { type: "email", message: "Please enter a valid email!" }
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
        </Card>
    );
};

export default MyInfo;
