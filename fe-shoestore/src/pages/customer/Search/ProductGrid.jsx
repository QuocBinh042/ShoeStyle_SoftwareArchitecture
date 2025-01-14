import React from 'react';
import { Card, Row, Col, Pagination, Empty, Tooltip, Badge, Rate } from 'antd';
import { HeartOutlined, ShoppingCartOutlined, ShoppingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const ProductGrid = ({ products }) => {

  const handleActionClick = (e, action) => {
    e.stopPropagation();
    console.log(`${action} clicked for product: ${products.name}`);
  };

  const navigate = useNavigate();
  return (
    <>
      {products.length === 0 ? (
        <Empty />
      ) : (
        <Row gutter={[16, 16]} >
          {products.map((product) => {
            const discountedPrice = (
              product.price - (product.price * (product.discount || 0)) / 100
            ).toFixed(2);
            return (
              <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
                <Badge.Ribbon
                  text={product.discount ? `-${product.discount}%` : ''}
                  color="red"
                  placement="start"
                >
                  <Card
                    cover={<img alt={product.name} src={product.image} />}
                    hoverable
                    actions={[
                      <Tooltip title="Add to Cart" key="add-to-cart">
                        <ShoppingOutlined onClick={(e) => handleActionClick(e, 'Add to Cart')} />
                      </Tooltip>,
                      <Tooltip title="Buy now" key="buy-now">
                        <ShoppingCartOutlined onClick={(e) => handleActionClick(e, 'Buy now')} />
                      </Tooltip>,
                      <Tooltip title="Add to Wishlist" key="add-to-wishlist">
                        <HeartOutlined onClick={(e) => handleActionClick(e, 'Add to Wishlist')} />
                      </Tooltip>,
                    ]}
                    onClick={() => navigate("/product-detail")}
                  >
                    <Rate disabled allowHalf defaultValue={2.5} style={{ marginBottom: 10, }} />
                    <Card.Meta title={product.name} description={
                      <>
                        <span style={{ textDecoration: 'line-through', color: '#888', marginRight: 8 }}>
                          ${product.price}
                        </span>
                        <span style={{ fontWeight: 'bold', color: '#fa541c' }}>
                          ${discountedPrice}
                        </span>
                      </>
                    } />
                  </Card>
                </Badge.Ribbon>
              </Col>
            )

          })}
        </Row>)}
      <Pagination align="center" defaultCurrent={1} total={50} style={{ marginTop: 20, }} />
    </>
  );
};

export default ProductGrid;
