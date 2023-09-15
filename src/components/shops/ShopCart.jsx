import React, { useState } from "react";

const ShopCart = ({ shopItems, addToCart, selectedSize, onSizeChange }) => {
  const [count, setCount] = useState(0);
  const [hoveredProduct, setHoveredProduct] = useState(null); // Thêm state để lưu sản phẩm đang được hover

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <>
      {shopItems.map((item, index) => {
        return (
          <div
            className="box"
            key={index}
            onMouseEnter={() => setHoveredProduct(item)} // Xác định sản phẩm được hover khi rê chuột vào
            onMouseLeave={() => setHoveredProduct(null)} // Xóa sản phẩm đang được hover khi rê chuột ra ngoài
          >
            <div className="product mtop">
              <div className="img">
                <span className="discount">{item.discount}% Off</span>
                <img src={item.cover} alt="" />
                <div className="product-like">
                  <label>{count}</label> <br />
                  <i className="fa-regular fa-heart" onClick={increment}></i>
                </div>
              </div>
              <div className="product-details">
                <h3>{item.name}</h3>
                <div className="rate">
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                </div>
                <div className="price">
                  <h4>{item.price} </h4>

                 
                  {item.sizes && (
                    <div className="size-options">
                      <span>Kích thước:</span>
                      {item.sizes.map((size) => (
                        <button
                          key={size.id}
                          className={`size-button ${
                            selectedSize === size.id ? "selected" : ""
                          }`}
                          onClick={() => onSizeChange(size.id)}
                        >
                          {size.name}
                        </button>
                      ))}
                    </div>
                  )}

                  <button onClick={() => addToCart(item, selectedSize)}>
                    <i className="fa fa-plus"></i>
                  </button>
                </div>
              </div>
            </div>
            {hoveredProduct === item && 
              <div className="product-info">
               
                <p>Đánh giá: 4.5/5</p>
                <p>Mô tả: giày da đẹp và thoải mái, phù hợp với các quý ông,"Giày da là sự lựa chọn hoàn hảo cho sự thoải mái và phong cách. Với sự bền bỉ và sự sang trọng của da thật, bạn sẽ luôn tự tin và lịch lãm mỗi ngay</p>
                
              </div>
            }
          </div>
        );
      })}
    </>
  );
};

export default ShopCart;
