import React from 'react';
import { Button, Input } from 'antd';
const CartSummary = () => {
  return (
    <div className='cart-summary'>
      <h3 className='cart-summary__title'>Delivery</h3>
      <div className='cart-summary__delivery-options'>
        <Button className='cart-summary__delivery-btn' type="primary">
          Free
        </Button>
        <Button className='cart-summary__delivery-btn'>Express: $9.99</Button>
      </div>
      <p className='cart-summary__delivery-date'>Delivery date: June 24, 2022</p>
      <div className='cart-summary__promo'>
        <Input placeholder="Promocode" className='cart-summary__promo-input' />
        <Button className='cart-summary__promo-apply' type="primary">
          Apply
        </Button>
      </div>
      <p className='cart-summary__promo-discount'>20% off discount</p>
      <div className='cart-summary__totals'>
        <p className='cart-summary__subtotal'>
          Subtotal <span>$80.96</span>
        </p>
        <p className='cart-summary__discount'>
          Discount (20%) <span>-$16.19</span>
        </p>
        <p className='cart-summary__delivery'>
          Delivery <span>$0.00</span>
        </p>
        <p className='cart-summary__tax'>
          Tax <span>$14.00</span>
        </p>
        <h4 className='cart-summary__total'>
          Total <span>$78.76</span>
        </h4>
      </div>
      <Button className='cart-summary__checkout' type="primary" block>
        Proceed to checkout
      </Button>
      <Button className='cart-summary__continue' block>
        Continue shopping
      </Button>
    </div>
  );
};

export default CartSummary;
