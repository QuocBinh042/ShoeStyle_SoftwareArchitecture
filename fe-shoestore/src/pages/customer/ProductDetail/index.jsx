import React, { useState } from "react";
import { Row, Col, Button,Rate, Tabs, InputNumber, Image } from "antd";
import "./ProductDetail.scss";
import ProductDetailsTabs from "./ProductDetailsTabs";
import { ShoppingCartOutlined, ShoppingOutlined } from "@ant-design/icons";
import RelatedProducts from "./RelatedProducts";

const ProductDetails = () => {
  const [mainImage, setMainImage] = useState("https://res.cloudinary.com/dowsceq4o/image/upload/v1735919650/project_ShoeStore/ImageProduct/1/kxgjis3uuvn3ulvjtluy.png");
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const product = {
    id: 1,
    name: 'Nike Air Max',
    price: 180000,
    discount: 20,
    category: 'Running Shoes',
    brand: 'Nike',
    images: [
      'https://res.cloudinary.com/dowsceq4o/image/upload/v1735919650/project_ShoeStore/ImageProduct/1/i3p1us11avw3p4ya1g02.png',
      'https://res.cloudinary.com/dowsceq4o/image/upload/v1735919650/project_ShoeStore/ImageProduct/1/kxgjis3uuvn3ulvjtluy.png',
      'https://res.cloudinary.com/dowsceq4o/image/upload/v1735919650/project_ShoeStore/ImageProduct/1/kxgjis3uuvn3ulvjtluy.png',
      'https://res.cloudinary.com/dowsceq4o/image/upload/v1735919650/project_ShoeStore/ImageProduct/1/i3p1us11avw3p4ya1g02.png',
    ],
    sizes: [38, 37, 36, 39, 40, 41, 42, 43, 44],
    colors: ['Blue', 'Red', 'Black', 'White'],
    rate: 4.5,
    reviewCount: 2.5,
    decription: "Classic and comfortable, you'll want to wear these AF-1s time after time..."
  };

  
  const changeImage = (image) => {
    setMainImage(image);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };


  const handleQuantityChange = (value) => {
    setQuantity(value);
  };

  return (
    <div className="product-details-container">
      <Row gutter={24} className="product-details">
        <Col span={12} className="product-image">
          <Image width={"100%"} src={mainImage} alt="Main Product" className="main-image" />
          <Row gutter={10} className="thumbnail-images">
            {product.images.map((image, index) => (
              <Col key={index}>
                <Image
                  preview = {false}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  onClick={() => changeImage(image)}
                  className={`thumbnail ${mainImage === image ? "active" : ""}`}
                />
              </Col>
            ))}
          </Row>
        </Col>
        <Col span={12} className="product-info">
          <h3>{product.brand} / {product.category}</h3>
          <h1>{product.name}</h1>
          <Rate allowHalf defaultValue={product.rate} disabled></Rate>
          <span> {product.reviewCount} reviews</span>
          <p className="product-price">{product.price}VND</p>
          <h5>Color Chart</h5>
          <Row gutter={10} className="options">
            {product.colors.map((color) => (
              <Col key={color}>
                <Button
                  className={`box ${selectedColor === color ? "active" : ""}`}
                  onClick={() => handleColorSelect(color)}
                >
                  <span style={{ display: 'flex', alignItems: "center", gap: "8px", }} >
                      <span style={{ width: "16px", height: "16px", backgroundColor: color, borderRadius: "20%", border: "1px solid #ddd" }} />
                      {color}
                    </span>
                </Button>
              </Col>
            ))}
          </Row>
          <h5>Size Chart</h5>
          <Row gutter={10} className="options">
            {product.sizes.map((size) => (
              <Col key={size}>
                <Button
                  className={`box ${selectedSize === size ? "active" : ""}`}
                  onClick={() => handleSizeSelect(size)}
                >
                  {size}
                </Button>
              </Col>
            ))}
          </Row>

          <h5>Item Quantity</h5>
          <div className="quantity-control">
            <InputNumber
              min={1}
              value={quantity}
              onChange={(value) => handleQuantityChange(value)}
            />
          </div>

          <Row gutter={10} className="btn-container">
            <Col span={12}>
              <Button className="btn-buy-now">Buy Now <ShoppingCartOutlined /></Button>
            </Col>
            <Col span={12}>
              <Button className="btn-add-to-cart">Add to Cart <ShoppingOutlined /></Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <ProductDetailsTabs />
      <RelatedProducts/>
    </div>
  );
};

export default ProductDetails;
