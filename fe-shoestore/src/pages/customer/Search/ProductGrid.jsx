import React from 'react';
import { Card, Row, Col, Pagination, Empty, Tooltip, Badge, Rate } from 'antd';
import { HeartOutlined, ShoppingCartOutlined, ShoppingOutlined } from '@ant-design/icons';

const ProductGrid = ({ products, totalProducts, currentPage, onPageChange }) => {
  console.log("Current Page:", currentPage);
  console.log("Products:", products);
  console.log("Total Products:", totalProducts);
  return (
    <>
      {products.length === 0 ? (
        <Empty />
      ) : (
        <Row gutter={[16, 16]}>
          {products.map((product) => {
            const discountedPrice = (
              product.price - (product.price * (product.discount || 0)) / 100
            ).toFixed(2);
            return (
              <Col key={product.productID} xs={24} sm={12} md={8} lg={6}>
                <Badge.Ribbon
                  text={product.discount ? `-${product.discount}%` : ''}
                  color="red"
                  placement="start"
                >
                  <Card
                    cover={
                      product.image ? (
                        <img alt={product.productName} src={product.image} />
                      ) : (
                        <div
                          style={{
                            height: "200px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "#f0f0f0",
                            border: "1px dashed #d9d9d9",
                          }}
                        >
                          <span style={{ color: "#999" }}>200x200</span>
                        </div>
                      )
                    }
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
                    <Rate disabled allowHalf defaultValue={2.5} style={{ marginBottom: 10 }} />
                    <Card.Meta
                      title={product.productName}
                      description={
                        <>
                          <span style={{ textDecoration: 'line-through', color: '#888', marginRight: 8 }}>
                            ${product.price}
                          </span>
                          <span style={{ fontWeight: 'bold', color: '#fa541c' }}>
                            ${discountedPrice}
                          </span>
                        </>
                      }
                    />
                  </Card>
                </Badge.Ribbon>
              </Col>
            );
          })}
        </Row>
      )}
      <Pagination
        current={currentPage} // Trang hiện tại
        total={totalProducts} // Tổng số sản phẩm
        pageSize={12} // Số sản phẩm mỗi trang
        onChange={onPageChange} // Hàm xử lý khi đổi trang
        style={{ marginTop: 20, textAlign: "center" }}
      />
    </>
  );
};



export default ProductGrid;
