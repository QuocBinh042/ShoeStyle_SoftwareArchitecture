import React, { useState, useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { Row, Col, Button, Rate, InputNumber, Image, Tag, Input, Modal } from "antd";
import "./ProductDetail.scss";
import { ShoppingCartOutlined, ShoppingOutlined } from "@ant-design/icons";
import RelatedProducts from "./RelatedProducts";
import Review from "./Review";
import { fetchProductDetailByProductId } from "../../../services/productDetailService";
import { fetchProductById, fetchProductByProductDetailId } from "../../../services/productService";
const ProductDetails = () => {
  const navigate = useNavigate();
  const { productID } = useParams();
  const [product, setProduct] = useState([]);
  const [mainImage, setMainImage] = useState("https://res.cloudinary.com/dowsceq4o/image/upload/v1735919650/project_ShoeStore/ImageProduct/1/kxgjis3uuvn3ulvjtluy.png");
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [availableColors, setAvailableColors] = useState([]);
  const [availableSizes, setAvailableSizes] = useState([]);
  
  useEffect(() => {
    const fetchProduct = async (productID) => {
      try {
        const details = await fetchProductDetailByProductId(productID);
        const product = await fetchProductById(productID);
        if (product && details && details.productDetails.length > 0) {
          setProduct(product);
          setAvailableColors([...new Set(details.productDetails.map(detail => detail.color))]);
          setAvailableSizes([...new Set(details.productDetails.map(detail => detail.size))]);
        } else {
          console.error("Product or details not found");
          setProduct(null); 
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null); 
      }
    };
    
    if (productID) fetchProduct(productID);
  }, [productID]);
  

  const handleBuyNow = () => {
    if (!selectedColor || !selectedSize) {
      Modal.error({ content: "Please select color and size!" });
      return;
    }
    
    const selectedDetail = product?.productDetails?.find(
      detail => detail.size === selectedSize && detail.color === selectedColor
    );
  
    if (!selectedDetail) {
      Modal.error({ content: "Selected size and color combination is not available!" });
      return;
    }
  
    const formattedItem = {
      key: selectedDetail.productDetailID, 
      name: product?.productName || 'Unknown',
      price: product?.price || 0,
      quantity: quantity,
      color: selectedColor,
      size: selectedSize,
      image: product?.imageURL?.[0] || '',
      stockQuantity: selectedDetail.stockQuantity, 
    };
  
    const itemsToCheckout = [formattedItem];
    navigate("/cart/checkout", { state: { selectedItems: itemsToCheckout } });
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
  // const discountedPrice = (product.price - product.price * product.discount / 100);

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
                {product?.imageURL?.map((image, index) => (
                  <Col key={index}>
                    <Image
                      preview={false}
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      onClick={() => changeImage(image)}
                      className={`thumbnail ${mainImage === image ? "active" : ""}`}
                    />
                  </Col>
                )) || <p>No images available</p>}
              </Row>
            </Col>
            <Col span={13} className="product-info">
            <h3>{product?.brand?.name || "Unknown Brand"} / {product?.category?.name || "Unknown Category"}</h3>


              <h1>{product?.productName}</h1>
              <div className="product-pricing">
                <span className="discounted-price">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}</span>
                <span className="original-price">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}</span>
                {product.price > 0 && <Tag color="green">{product?.price}%</Tag>}
              </div>
              <Rate allowHalf defaultValue={product?.rate} disabled></Rate>
              <span> {product?.reviewCount} reviews</span>
              <h3>DESCRIPTION</h3>
              <span>{product?.description}</span>
              <h3>COLOR</h3>
              <Row gutter={10} className="options">
                {availableColors.map((color, index) => (
                  <Col key={index}>
                    <Button
                      className={`box ${selectedColor === color ? "active" : ""}`}
                      onClick={() => handleColorSelect(color)}
                    >
                      <span style={{ display: 'flex', alignItems: "center", gap: "8px", }} >
                        <span style={{ width: "16px", height: "16px", backgroundColor: color.toLowerCase(), borderRadius: "20%", border: "1px solid #ddd" }} />
                        {color}
                      </span>
                    </Button>
                  </Col>
                ))}
              </Row>

              <h3>SIZE</h3>
              <Row gutter={10} className="options">
                {availableSizes.map((size, index) => (
                  <Col key={index}>
                    <Button
                      className={`box ${selectedSize === size ? "active" : ""}`}
                      onClick={() => handleSizeSelect(size)}
                    >
                      {size.replace("SIZE_", "")}
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
              <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}</span>
            </div>
            <Row justify="space-between" className='cart-summary__promo'>
              <Input placeholder="Promocode" className='cart-summary__promo-input' />
              <Button className='cart-summary__promo-apply' type="primary">
                Apply
              </Button>
            </Row>
            <div className="order-total">
              <span>Sub Total</span>
              <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price * quantity)}</span>
            </div>

            <div className="order-actions">
              <Button icon={<ShoppingCartOutlined />} className="btn-buy-now" onClick={handleBuyNow}>Buy Now</Button>
              <Button icon={<ShoppingOutlined />} className="btn-add-to-cart" >Add To Cart </Button>
            </div>
          </div>
        </Col>
      </Row>
      <Review reviews={reviews} />
      <RelatedProducts />
    </div>
  );
};

export default ProductDetails;
