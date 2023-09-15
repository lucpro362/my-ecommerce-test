import React, { useState } from "react";
import Catg from "./Catg";
import ShopCart from "./ShopCart";
import "./style.css";

const Shop = ({ addToCart, shopItems }) => {
  
  const [selectedSize, setSelectedSize] = useState(null);

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  return (
    <section className="shop background">
      <div className="container d_flex">
        <Catg />

        <div className="contentWidth">
          <div className="heading d_flex">
            <div className="heading-left row f_flex">
              <h2>Sản phẩm</h2>
            </div>
            <div className="heading-right row">
              <span>Xem tất cả</span>
              <i className="fa-solid fa-caret-right"></i>
            </div>
          </div>
          <div className="product-content grid1">
            <ShopCart
              addToCart={addToCart}
              shopItems={shopItems}
              selectedSize={selectedSize} 
              onSizeChange={handleSizeChange} 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Shop;
