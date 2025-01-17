import React, { useState } from 'react';
import {
  DesktopOutlined,
  InboxOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import MyOrder from './MyOrder';
const { Content, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('Dashboard', '1', <DesktopOutlined />),
  getItem('My Order', '2', <InboxOutlined />),
  getItem('Account Info', 'sub1', <UserOutlined />, [
    getItem('Edit account', '3'),
    getItem('Edit adress', '4'),
    getItem('Payment method', '5'),
  ]),
  getItem('Logout', '6', <LogoutOutlined />),
];
const Account = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: '120vh',
        padding: '20px 100px',
      }}
    >
      <Sider style={{background:'white',}} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu defaultSelectedKeys={['1']} mode="inline" items={items} />
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
            <MyOrder/>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default Account;