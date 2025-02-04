import React, { useState, useEffect } from "react";
import { Card, Row, Col, Table, Statistic } from "antd";
import { Column } from "@ant-design/plots";
import { ShoppingCartOutlined, DollarOutlined } from "@ant-design/icons";
import { countOrderByUser, sumAmount, fetchOrderByUser } from "../../../services/orderService";

const UserDashboard = () => {
    const [quantiyOrder, setQuantityOrder] = useState(0);
    const [amount, setAmount] = useState(0);
    const [orderData, setOrderData] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]); // Lưu các đơn hàng chưa hoàn thành

    useEffect(() => {
        fetchQuantityOrder(2);
        fetchtotalAmount(2);
        fetchOrders(2);
    }, []);

    const fetchQuantityOrder = async (userId) => {
        try {
            const count = await countOrderByUser(userId);
            setQuantityOrder(count);
        } catch (error) {
            console.error("Failed to load:", error);
        }
    };

    const fetchtotalAmount = async (userId) => {
        try {
            const amount = await sumAmount(userId);
            setAmount(amount);
        } catch (error) {
            console.error("Failed to load:", error);
        }
    };

    const fetchOrders = async (userId) => {
        try {
            const orders = await fetchOrderByUser(userId); // Giả sử API này trả về các đơn hàng của người dùng
            processMonthlyData(orders); // Xử lý dữ liệu cho biểu đồ
            filterIncompleteOrders(orders); // Lọc các đơn hàng chưa hoàn thành
        } catch (error) {
            console.error("Failed to load orders:", error);
        }
    };

    const processMonthlyData = (orders) => {
        const monthlyData = Array.from({ length: 12 }, (_, index) => ({
            month: `${index + 1}`,
            amount: 0,
        }));

        orders.forEach(order => {
            const orderDate = new Date(order.orderDate);

            if (isNaN(orderDate)) {
                console.error("Invalid order date:", order.orderDate);
                return;
            }

            const month = orderDate.getMonth();
            const year = orderDate.getFullYear();

            if (year === new Date().getFullYear()) {
                monthlyData[month].amount += order.total;
            }
        });

        const formattedData = monthlyData.map(item => ({
            month: `${item.month}`,
            amount: item.amount,
        }));

        setOrderData(formattedData);
    };

    // Lọc các đơn hàng chưa hoàn thành
    const filterIncompleteOrders = (orders) => {
        const incompleteOrders = orders.filter(order => order.status !== "Completed");
console.log(incompleteOrders)
        setFilteredOrders(incompleteOrders);
    };

    const config = {
        data: orderData,
        xField: "month",
        yField: "amount",
        height: 250,
        color: "#1890ff",
        xAxis: {
            label: {
                formatter: (value) => {
                    const monthNames = [
                        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                    ];
                    return monthNames[parseInt(value) - 1];
                }
            }
        },
        yAxis: {
            label: {
                formatter: (value) => `${value} đ`,
            }
        }
    };

    const columns = [
        { title: "Order code", dataIndex: "code", key: "code" },
        { title: "Order date", dataIndex: "orderDate", key: "orderDate" },
        { title: "Total", dataIndex: "total", key: "total", render: (text) => `${text} đ` }, 
        { title: "Status", dataIndex: "status", key: "status" },
    ];

    return (
        <div style={{ padding: 20 }}>
            <Row gutter={16}>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="Your total order"
                            value={quantiyOrder}
                            prefix={<ShoppingCartOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="Total amount spent"
                            value={amount}
                            prefix={<DollarOutlined />}
                            suffix="đ"
                        />
                    </Card>
                </Col>
            </Row>

            <Card title="Monthly expenses in 2025" style={{ marginTop: 20 }}>
                <Column {...config} />
            </Card>

            <Card title="Current orders" style={{ marginTop: 20 }}>
                <Table dataSource={filteredOrders} columns={columns} pagination={false} />
            </Card>
        </div>
    );
};

export default UserDashboard;
