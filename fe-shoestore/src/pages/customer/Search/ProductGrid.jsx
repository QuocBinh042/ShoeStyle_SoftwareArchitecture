import React from 'react';
import { Card, Row, Col, Pagination, Empty, Tooltip, Badge, Rate } from 'antd';
import { HeartOutlined, ShoppingCartOutlined, ShoppingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';


const ProductGrid = ({ products, totalProducts, currentPage, onPageChange }) => {

  const handleActionClick = (e, action) => {
    e.stopPropagation();
    console.log(`${action} clicked for product: ${products.name}`);
  };

  const navigate = useNavigate();
  const handleAddCart = (productID) => {
    console.log("Id "+productID)
    navigate(`/product-detail/${productID}`); 
  };
  return (
    <>
      {products.length === 0 ? (
        <Empty />
      ) : (
        <Row gutter={[16, 16]}>
          {products.map((product) => {
            const discountedPrice = Math.round(
              product.price - (product.price * (product.discount || 0)) / 100
            );
            const formattedPrice = product.price.toLocaleString('vi-VN'); 
            const formattedDiscountedPrice = discountedPrice.toLocaleString('vi-VN'); 
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
                    // actions={[
                    //   <Tooltip title="Add to Cart" key="add-to-cart">
                    //     <ShoppingOutlined onClick={(e) => handleActionClick(e, 'Add to Cart')} />
                    //   </Tooltip>,
                    //   <Tooltip title="Buy now" key="buy-now">
                    //     <ShoppingCartOutlined onClick={(e) => handleActionClick(e, 'Buy now')} />
                    //   </Tooltip>,
                    //   <Tooltip title="Add to Wishlist" key="add-to-wishlist">
                    //     <HeartOutlined onClick={(e) => handleActionClick(e, 'Add to Wishlist')} />
                    //   </Tooltip>,
                    // ]}
                    
                    onClick={() => handleAddCart(product.productID)}
                  >

                    <Rate disabled allowHalf defaultValue={2.5} style={{ marginBottom: 10 }} />
                    <Card.Meta
                      title={product.productName}
                      description={
                        <>
                          <span style={{ textDecoration: 'line-through', color: '#888', marginRight: 8 }}>
                            {formattedPrice}₫
                          </span>
                          <span style={{ fontWeight: 'bold', color: '#fa541c' }}>
                            {formattedDiscountedPrice}₫
                          </span>
                        </>
                      }
                    />

                  </Card >
                </Badge.Ribbon >
              </Col >
            );
          })}
        </Row >
      )}
      <Pagination
        current={currentPage}
        total={totalProducts}
        pageSize={12}
        onChange={onPageChange}
        style={{ marginTop: 20, textAlign: "center" }}
      />
    </>
  );
};

export default ProductGrid;
