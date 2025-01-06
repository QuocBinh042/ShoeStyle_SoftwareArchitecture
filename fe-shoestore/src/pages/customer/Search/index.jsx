import React, { useState } from 'react';
import { Layout } from 'antd';
import Filters from './Filters';
import ProductGrid from './ProductGrid';
import "./Search.scss"
import { Header } from 'antd/es/layout/layout';
import ResultsHeader from './ResultHeader';
const { Sider, Content } = Layout;

const Search = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Nike Air Max', price: 180, discount:20, image: 'https://res.cloudinary.com/dowsceq4o/image/upload/v1735919650/project_ShoeStore/ImageProduct/1/i3p1us11avw3p4ya1g02.png' },
    { id: 2, name: 'Nike Air Max', price: 180, discount:20, image: 'https://res.cloudinary.com/dowsceq4o/image/upload/v1735919650/project_ShoeStore/ImageProduct/1/kxgjis3uuvn3ulvjtluy.png' },
    { id: 3, name: 'Nike Air Max', price: 180, discount:10, image: 'https://res.cloudinary.com/dowsceq4o/image/upload/v1735919650/project_ShoeStore/ImageProduct/1/kxgjis3uuvn3ulvjtluy.png' },
    { id: 4, name: 'Nike Air Max', price: 180, discount:20, image: 'https://res.cloudinary.com/dowsceq4o/image/upload/v1735919650/project_ShoeStore/ImageProduct/1/i3p1us11avw3p4ya1g02.png' },
    { id: 5, name: 'Nike Air Max', price: 180, discount:20, image: 'https://res.cloudinary.com/dowsceq4o/image/upload/v1735919650/project_ShoeStore/ImageProduct/1/i3p1us11avw3p4ya1g02.png' },
    { id: 6, name: 'Adidas UltraBoost', price: 200, discount:30, image: 'https://res.cloudinary.com/dowsceq4o/image/upload/v1735919650/project_ShoeStore/ImageProduct/1/kxgjis3uuvn3ulvjtluy.png' },
    { id: 7, name: 'Nike Air Max', price: 180, discount:30, image: 'https://res.cloudinary.com/dowsceq4o/image/upload/v1735919650/project_ShoeStore/ImageProduct/1/kxgjis3uuvn3ulvjtluy.png' },
    { id: 8, name: 'Nike Air Max', price: 180, discount:30, image: 'https://res.cloudinary.com/dowsceq4o/image/upload/v1735919650/project_ShoeStore/ImageProduct/1/kxgjis3uuvn3ulvjtluy.png' },
    { id: 9, name: 'Nike Air Max', price: 180, discount:20, image: 'https://res.cloudinary.com/dowsceq4o/image/upload/v1735919650/project_ShoeStore/ImageProduct/1/i3p1us11avw3p4ya1g02.png' },
    { id: 10, name: 'Nike Air Max', price: 180, discount:25, image: 'https://res.cloudinary.com/dowsceq4o/image/upload/v1735919650/project_ShoeStore/ImageProduct/1/i3p1us11avw3p4ya1g02.png' },
    { id: 11, name: 'Adidas UltraBoost', price: 200, discount:20, image: 'https://res.cloudinary.com/dowsceq4o/image/upload/v1735919650/project_ShoeStore/ImageProduct/1/kxgjis3uuvn3ulvjtluy.png' },
    { id: 12, name: 'Nike Air Max', price: 180, discount:20, image: 'https://res.cloudinary.com/dowsceq4o/image/upload/v1735919650/project_ShoeStore/ImageProduct/1/kxgjis3uuvn3ulvjtluy.png' },
    { id: 13, name: 'Nike Air Max', price: 180, discount:20, image: 'https://res.cloudinary.com/dowsceq4o/image/upload/v1735919650/project_ShoeStore/ImageProduct/1/kxgjis3uuvn3ulvjtluy.png' },
    { id: 14, name: 'Nike Air Max', price: 180, discount:20, image: 'https://res.cloudinary.com/dowsceq4o/image/upload/v1735919650/project_ShoeStore/ImageProduct/1/i3p1us11avw3p4ya1g02.png' },
    { id: 15, name: 'Nike Air Max', price: 180, discount:20, image: 'https://res.cloudinary.com/dowsceq4o/image/upload/v1735919650/project_ShoeStore/ImageProduct/1/i3p1us11avw3p4ya1g02.png' },
    { id: 16, name: 'Adidas UltraBoost', price: 200, discount:20, image: 'https://res.cloudinary.com/dowsceq4o/image/upload/v1735919650/project_ShoeStore/ImageProduct/1/kxgjis3uuvn3ulvjtluy.png' },
  ]);
  return (
    <Layout>
      <Layout style={{ padding: '20px 100px', }}>
        <Header style={{padding:0}}> <ResultsHeader resultsCount="194" keywword={"qb"}/> </Header>
        <Layout>
          {/* <Sider width={280} style={{ background: 'white', height: 1000, position: 'sticky', top: 0 }}> */}
          <Sider width={280} className='sider'>
            <Filters />
          </Sider>
          <Content style={{ padding: 0}}>
            <ProductGrid products={products} />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Search;
