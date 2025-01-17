import React, { useState } from 'react';
import { Button, Card, Modal, Tabs } from 'antd';


const onChange = (key) => {
  console.log(key);
};

function MyOrder() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const items = [
    {
      key: '1',
      label: 'Processing',
      children: 'Processing',
    },
    {
      key: '2',
      label: 'Delivered',
      children: 'Delivered',
    },
    {
      key: '3',
      label: 'Tab 3',
      children: <>
        <Card
          title="Card title"
          extra={<Button onClick={showModal}>View detail</Button>}
        >
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </>,
    },
  ];
  return (
    <>
      <Tabs
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
      />
      <Modal centered title="Order detail" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>

    </>
  )
}

export default MyOrder;
