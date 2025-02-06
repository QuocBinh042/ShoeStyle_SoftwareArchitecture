import React, { useState } from 'react';
import {
  DesktopOutlined,
  InboxOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import MyOrder from './MyOrder';
import Address from './Address';
import DashBoard from './Dashboard'
const { Content, Sider } = Layout;



function getItem(label, key, icon) {
  return {
    key,
    icon,
    label,
  };
}

const items = [
  getItem('Dashboard', '1', <DesktopOutlined />),
  getItem('My Order', '2', <InboxOutlined />),
  getItem('Address', '3', <UserOutlined />),
  getItem('Logout', '5', <LogoutOutlined />),
];

const Account = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('1'); // State for selected menu item

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Render content based on selected menu item
  const renderContent = () => {
    switch (selectedKey) {
      case '1':
        return <DashBoard />;
      case '2':
        return <MyOrder />;
      case '3':
        return <Address />;
      default:
        return <div>Welcome to the Dashboard</div>;
    }
  };

  return (
    <Layout
      style={{
        minHeight: '120vh',
        padding: '20px 100px',
      }}
    >
      <Sider
        style={{ background: '#f5f5f5' }}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        trigger={null}
      >
        <Menu
          style={{ background: '#f5f5f5' }}
          defaultSelectedKeys={['1']}
          mode="inline"
          items={items}
          onClick={(e) => setSelectedKey(e.key)} // Update selectedKey on menu click
        />
      </Sider>
      <Layout>
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {renderContent()}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Account;
