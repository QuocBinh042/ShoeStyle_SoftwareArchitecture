import { NavLink} from 'react-router-dom';
import { HomeOutlined, FileTextOutlined, UserOutlined, ShoppingCartOutlined, SearchOutlined, BookOutlined, HeartOutlined, ShoppingOutlined } from '@ant-design/icons';

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
      {
        key: '2-1',
        label: <a href="/about">About Us</a>,
      },
      {
        key: '2-2',
        label: <a href="/contact">Contact Us</a>,
      },
    ],
  },
  {
    key: '3',
    label: <a href="/blog">Blog</a>,
    icon: <BookOutlined />,
  },
  {
    key: '4',
    label: <NavLink to="search" >Search</NavLink>,
    icon: <SearchOutlined />,
  },
  {
    key: '5',
    label: <NavLink to="cart" >Cart</NavLink>,
    icon: <ShoppingOutlined />,
  },
  {
    key: '6',
    label: <NavLink to="account" >Account</NavLink>,
    icon: <UserOutlined />,
  },
  
]

export default menuCustomer;