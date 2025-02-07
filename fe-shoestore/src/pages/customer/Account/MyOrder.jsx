import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import OrderItem from './OrderItem';
import { fetchOrderByUser } from '../../../services/orderService';
import { fetcPaymentByOrder } from '../../../services/paymentService';
import { fetchOrderDetailByOrder } from '../../../services/orderDetailService';
import { fetchProductByProductDetailId } from "../../../services/productService"
const onChange = (key) => {
  // console.log(key);
};


function MyOrder() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    loadOrdersWithDetails(1)
  }, []);
  const loadOrdersWithDetails = async (userId) => {
    try {
      // Lấy danh sách đơn hàng
      const fetchedOrders = await fetchOrderByUser(userId);

      const detailedOrders = await Promise.all(
        fetchedOrders.map(async (order) => {
          const details = await fetchOrderDetailByOrder(order.orderID);
          const payment = await fetcPaymentByOrder(order.orderID);
          const formattedDetails = details.map((detail) => ({
            id: detail.id,
            price: detail.price,
            quantity: detail.quantity,
            size: detail.productDetail.size,
            color: detail.productDetail.color,
            stockQuantity: detail.productDetail.stockQuantity,
          }));
          return {
            id: order.orderID,
            name: order.user.name,
            phone: order.user.phoneNumber,
            date: order.orderDate,
            status: order.status,
            paymentMethod: order.typePayment,
            shippingAddress: order.shippingAddress,
            total: order.total,
            details: formattedDetails,
            code:order.code,
            paymentStatus:payment.status,
            feeShip:order.feeShip,
            discount:order.discount
          };
        })
      );
      setOrders(detailedOrders);
    } catch (error) {
      console.error("Failed to load orders with details:", error);
    }
  };
  
  const filterOrdersByStatus = (status) =>
    orders.filter((order) => order.status === status);

  const items = [
    {
      key: '1',
      label: 'All Orders',
      children: (
        <div style={{ maxHeight: "500px", overflowY: "scroll" }}>
          {orders.map((order) => (
            <OrderItem key={order.orderID} order={order} />
          ))}
        </div>
      ),
    },
    {
      key: "2",
      label: "Processing",
      children: (
        <div style={{ maxHeight: "500px", overflowY: "scroll" }}>
          {filterOrdersByStatus("Processing").map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </div>
      ),
    },
    {
      key: "3",
      label: "Shipped",
      children: (
        <div style={{ maxHeight: "500px", overflowY: "scroll" }}>
          {filterOrdersByStatus("Shipped").map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </div>
      ),
    },
    {
      key: "4",
      label: "Delivered",
      children: (
        <div style={{ maxHeight: "500px", overflowY: "scroll" }}>
          {filterOrdersByStatus("Delivered").map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </div>
      ),
    },

  ];
  return (
    <>
      <Tabs
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
      />


    </>
  )
}

export default MyOrder;
