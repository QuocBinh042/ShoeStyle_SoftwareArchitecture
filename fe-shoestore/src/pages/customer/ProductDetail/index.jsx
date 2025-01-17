import React, { useState } from "react";
import { Row, Col, Button, Rate, InputNumber, Image, Tag, Input } from "antd";
import "./ProductDetail.scss";
import { ShoppingCartOutlined, ShoppingOutlined } from "@ant-design/icons";
import RelatedProducts from "./RelatedProducts";
import Review from "./Review";

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
  const reviews = [
    {
      author: "Renalda Aji",
      date: "19 hours ago",
      rating: 5,
      text: "Very good, I like it!",
      productInfo: "Brand: abc - Size: 44 - Color: Silver",
      additionalText: "Highly recommend!",
    },
  ];
  const discountedPrice = (product.price - product.price * product.discount / 100);

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
        <Col span={18} className="product-image">
          <Row gutter={24}>
            <Col span={10} className="product-image">
              <Image width={"100%"} src={mainImage} alt="Main Product" className="main-image" />
              <Row gutter={10} className="thumbnail-images">
                {product.images.map((image, index) => (
                  <Col key={index}>
                    <Image
                      preview={false}
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      onClick={() => changeImage(image)}
                      className={`thumbnail ${mainImage === image ? "active" : ""}`}
                    />
                  </Col>
                ))}
              </Row>
            </Col>
            <Col span={13} className="product-info">
              <h3>{product.brand} / {product.category}</h3>
              <h1>{product.name}</h1>
              <div className="product-pricing">
                <span className="discounted-price">{discountedPrice} VNĐ</span>
                <span className="original-price">{product.price} VNĐ</span>
                {product.discount > 0 && <Tag color="green">{product.discount}%</Tag>}
              </div>
              <Rate allowHalf defaultValue={product.rate} disabled></Rate>
              <span> {product.reviewCount} reviews</span>
              <h3>DESCRIPTION</h3>
              <span>{product.decription}</span>
              <h3>COLOR</h3>
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
              <h3>SIZE</h3>
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
            </Col>
          </Row>

        </Col>
        <Col span={6}>
          <div className="order-summary">
            <h3>Order Details</h3>
            <div className="order-item">
              <span>Quantity</span>
              <InputNumber min={1} max={10} value={quantity} onChange={handleQuantityChange} />
            </div>
            <div className="order-item">
              <span>Color</span>
              <span>{selectedColor}</span>
            </div>
            <div className="order-item">
              <span>Size</span>
              <span>{selectedSize}</span>
            </div>
            <div className="order-item">
              <span>Price</span>
              <span>{discountedPrice}VNĐ</span>
            </div>
            <Row justify="space-between" className='cart-summary__promo'>
              <Input placeholder="Promocode" className='cart-summary__promo-input' />
              <Button className='cart-summary__promo-apply' type="primary">
                Apply
              </Button>
            </Row>
            <div className="order-total">
              <span>Sub Total</span>
              <span>{(discountedPrice * quantity)}VNĐ</span>
            </div>

            <div className="order-actions">
              <Button icon={<ShoppingCartOutlined />} className="btn-buy-now">Buy Now</Button>
              <Button icon={<ShoppingOutlined />} className="btn-add-to-cart" >Add To Cart </Button>
            </div>
          </div>
        </Col>
      </Row>
      <Review reviews = {reviews}/>
      <RelatedProducts />
    </div>
  );
};

export default ProductDetails;
