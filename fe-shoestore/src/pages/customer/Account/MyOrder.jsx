import React from 'react';
import { Tabs } from 'antd';
import OrderItem from './OrderItem';


const onChange = (key) => {
  console.log(key);
};

function MyOrder() {
  const order = {
    id: "12345",
    name: "ABC",
    phone:"123456789",
    date: "2025-01-16",
    status: "Shipped",
    paymentMethod: "Cash on delivery",
    shippingAddress: "123 Main St, District 1, Ho Chi Minh City",
    quantity: 2,
    total: "360.000 VNĐ",
    details: {
      size: "38",
      color: "Black",
      name: "Nike Air Max",
      price: "180.000 VNĐ",
      image:
        "https://res.cloudinary.com/dowsceq4o/image/upload/v1735919650/project_ShoeStore/ImageProduct/1/i3p1us11avw3p4ya1g02.png",
    },
  };
  
  
  const items = [
    {
      key: '1',
      label: 'All Orders',
      children: 'All Orders',
    },
    {
      key: '2',
      label: 'Processing',
      children: 'Processing',
    },
    {
      key: '3',
      label: 'Shipped',
      children: <>
        <OrderItem order={order} />
      </>,
    },
    {
      key: '4',
      label: 'Delivered',
      children: 'Delivered',
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
