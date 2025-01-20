

import React, { useState } from "react";
import { Card, Button, Modal, List, Tag, Typography } from "antd";
import AddressSelector from "./AddressSelector";

const { Text } = Typography;

const AddressManagement = () => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: "Home",
      name: "Malik Wiwoho",
      phone: "+44 - 7100 - 2012 - 03",
      address: "HCM",
      isDefault: true,
    },
    {
      id: 2,
      type: "Office",
      name: "Malik Wiwoho",
      phone: "+44 - 7100 - 2012 - 03",
      address: " USA",
      isDefault: false,
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  // Function để thêm địa chỉ mới
  const handleAddAddress = (newAddress) => {
    setAddresses([
      ...addresses,
      {
        id: addresses.length + 1,
        ...newAddress,
      },
    ]);
    setIsModalVisible(false); 
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "end", marginBottom: "20px" }}>
        {/* <h2>Address</h2> */}
        <Button type="primary" onClick={() => setIsModalVisible(true)}>
          Add New Address
        </Button>
      </div>
      <List
        grid={{ gutter: 16, column: 2 }}
        dataSource={addresses}
        renderItem={(item) => (
          <List.Item>
            <Card
              bordered
              style={{
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Text strong>{item.type}</Text>
                {item.isDefault && <Tag color="blue">Default</Tag>}
              </div>
              <p>
                <Text strong>{item.name}</Text>
                <br />
                <Text>{item.phone}</Text>
                <br />
                <Text>{item.address}</Text>
              </p>
              <div style={{ display: "flex", justifyContent: "end", alignItems: "center" }}>
                <div>
                  <Button type="link">Edit</Button>
                  <Button type="link" danger>
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          </List.Item>
        )}
      />
      <Modal
        title="Add New Address"
        open={isModalVisible}
        width={500}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <AddressSelector onSubmit={handleAddAddress} />
      </Modal>
    </div>
  );
};

export default AddressManagement;
