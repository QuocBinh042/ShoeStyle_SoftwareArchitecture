import React from 'react';
import { Card, Row, Col, Pagination, Empty, Tooltip, Badge, Rate } from 'antd';
import { HeartOutlined, ShoppingCartOutlined, ShoppingOutlined } from '@ant-design/icons';

const ProductGrid = ({ products }) => {
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
                      <Tooltip title="Add to Cart">
                        <ShoppingOutlined key="add-to-cart" />
                      </Tooltip>,
                      <Tooltip title="Buy now">
                        <ShoppingCartOutlined key="buy-now" />
                      </Tooltip>,
                      <Tooltip title="Add to Wishlist">
                        <HeartOutlined key="add-to-wishlist" />
                      </Tooltip>,
                    ]}
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
