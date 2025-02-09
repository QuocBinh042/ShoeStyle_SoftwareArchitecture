import { NavLink } from 'react-router-dom';
import { 
  HomeOutlined, FileTextOutlined, UserOutlined, 
  LoginOutlined, LogoutOutlined, SearchOutlined, 
  BookOutlined, ShoppingOutlined 
} from '@ant-design/icons';

const isLoggedIn = localStorage.getItem('token');

const menuCustomer = [
  {
    key: '1',
    label: <NavLink to="/" >Home</NavLink>,
    icon: <HomeOutlined />,
  },
  {
    key: '2',
    label: "Pages",
    icon: <FileTextOutlined />,
    children: [
      { key: '2-1', label: <NavLink to="/about">About Us</NavLink> },
      { key: '2-2', label: <NavLink to="/contact">Contact Us</NavLink> },
    ],
  },
  {
    key: '3',
    label: <NavLink to="/blog">Blog</NavLink>,
    icon: <BookOutlined />,
  },
  {
    key: '4',
    label: <NavLink to="/search">Search</NavLink>,
    icon: <SearchOutlined />,
  },
  {
    key: '5',
    label: <NavLink to="/cart">Cart</NavLink>,
    icon: <ShoppingOutlined />,
  },
  {
    key: '6',
    label: "Account",
    icon: <UserOutlined />,
    children: [
      { 
        key: '6-1', 
        label: <NavLink to="/account">My Profile</NavLink>, 
        icon: <UserOutlined /> 
      },
      { key: 'divider', type: 'divider' }, // Thêm đường phân cách
      isLoggedIn
        ? {
            key: '6-2',
            label: <NavLink to="/logout">Logout</NavLink>,
            icon: <LogoutOutlined style={{ color: 'red' }} />,
          }
        : {
            key: '6-3',
            label: <NavLink to="/login">Login</NavLink>,
            icon: <LoginOutlined style={{ color: 'green' }} />,
          },
    ],
  },
];

export default menuCustomer;
