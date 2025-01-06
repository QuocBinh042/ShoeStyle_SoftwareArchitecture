import React, { useState } from "react";
import shoe from "../../../assets/images/products/shoe3.png";
import { Tabs, Card, Image, Carousel, Badge } from "antd";
const productsData = {
  bestsellers: [
    {
      id: 1,
      image: "../../../assets/images/products/shoe3.png",
      name: "Sneakers De Sport Running",
      category: "Shoes",
      price: "$70.00",
      oldPrice: "$100.00",
      discount: "-30%",
    },
    {
      id: 1,
      image: "../../../assets/images/products/shoe3.png",
      name: "Sneakers De Sport Running",
      category: "Shoes",
      price: "$70.00",
      oldPrice: "$100.00",
      discount: "-30%",
    },
    {
      id: 2,
      image: "../images/product2.jpg",
      name: "Professional Sports Shoes",
      category: "Shoes",
      price: "$80.00",
      oldPrice: "$100.00",
      discount: "-20%",
    },
    {
      id: 2,
      image: "../images/product2.jpg",
      name: "Professional Sports Shoes",
      category: "Shoes",
      price: "$80.00",
      oldPrice: "$100.00",
      discount: "-20%",
    },
    {
      id: 2,
      image: "../images/product2.jpg",
      name: "Professional Sports Shoes",
      category: "Shoes",
      price: "$80.00",
      oldPrice: "$100.00",
      discount: "-20%",
    },
    {
      id: 2,
      image: "../images/product2.jpg",
      name: "Professional Sports Shoes",
      category: "Shoes",
      price: "$80.00",
      oldPrice: "$100.00",
      discount: "-20%",
    },
  ],
  "new-arrivals": [
    {
      id: 3,
      image: "../images/product3.jpg",
      name: "Running Shoes",
      category: "Shoes",
      price: "$60.00",
      oldPrice: "$80.00",
      discount: "-15%",
    },
  ],
  trending: [
    {
      id: 4,
      image: "../images/product4.jpg",
      name: "Trending Shoes",
      category: "Shoes",
      price: "$50.00",
      oldPrice: "$75.00",
      discount: "-33%",
    },
  ],
};

const TabProducts = () => {
  const [activeTab, setActiveTab] = useState("1");

  const tabContent = (tabKey) => {
    const products = productsData[tabKey] || [];
    return (
      <Carousel arrows slidesToShow={4} dots={false} style={{ width: "80%", margin: 'auto' }}>
        {products.map((product) => (
          <div key={product.id} >
            <Card className="tab-products__card"
              cover={
                <Badge.Ribbon text={`${product.discount}`} color="#28a745">
                  <Image src={shoe} alt={product.name} />
                </Badge.Ribbon>
              }
            >
              <Card.Meta
                title={product.name}
                description={
                  <>
                    <p className="tab-products__card-category">{product.category}</p>
                    <p style={{ textAlign: 'center' }}>
                      <span className="tab-products__card-price" >
                        {product.price}{" "}
                      </span>
                      <span className="tab-products__card-price tab-products__card-price--old" >
                        {product.oldPrice}
                      </span>
                    </p>
                    <div style={{ justifyContent: 'space-between', display: 'flex' }}>
                      <button className="tab-products__card__add-to-cart">Cart</button>
                      <button className="tab-products__card__add-to-cart">Wish</button>
                    </div>
                  </>
                }
              />
            </Card>

          </div>
        ))}
      </Carousel>
    );
  };

  return (
    <Tabs
      defaultActiveKey={activeTab}
      onChange={setActiveTab}
      centered
      className="tab-products__menu"
      items={[
        {
          key: "bestsellers",
          label: "Best Sellers",
          children: tabContent("bestsellers"),
        },
        {
          key: "new-arrivals",
          label: "New Arrivals",
          children: tabContent("new-arrivals"),
        },
        {
          key: "trending",
          label: "Trending",
          children: tabContent("trending"),
        },
      ]}
    />
  );
};

export default TabProducts;
