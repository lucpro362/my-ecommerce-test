import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import "./style.css";

const Cart = ({ CartItem, addToCart, decreaseQty, remoteCart, product }) => {
  const history = useHistory();
  const [selectedSize, setSelectedSize] = useState(null);
  const [sizes, setSizes] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    if (product && product.sizes) {
      let sizeOptions = product.sizes.map((size) => ({
        value: size.name,
        label: size.name,
      }));

      setSizes(sizeOptions);
    }
  }, [product]);

  const getTotalDiscount = () => {
    return CartItem.reduce(
      (totalDiscount, item) =>
        totalDiscount + (item.discount / 100) * item.price * item.qty,
      0
    );
  };

  const totalDiscount = getTotalDiscount(); 

  const totalPrice = CartItem.reduce(
    (price, item) => price + item.price * item.qty,
    0
  );

  const handleCheckout = () => {
    const totalToPay = totalPrice - totalDiscount; 
    history.push("/order", { totalToPay }); 
  };

  const removeFromCart = (product) => {
    const updatedCart = CartItem.filter((item) => item.id !== product.id);
    remoteCart(updatedCart);
  };

  const handleSizeChange = (selectedOption) => {
    setSelectedSize(selectedOption);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  return (
    <>
      <section className="cart-items">
        <div className="container d_flex">
          <div className="cart-details">
            {CartItem.length === 0 && (
              <h1 className="no-items product">No Items are added to Cart</h1>
            )}

            {CartItem.map((item, index) => {
              const productQty =
                item.qty * (item.price - (item.discount / 100) * item.price);

              return (
                <div
                  className={`cart-list product d_flex ${
                    selectedProduct && selectedProduct.id === item.id
                      ? "selected"
                      : ""
                  }`}
                  key={item.id}
                  onClick={() => handleProductClick(item)}
                >
                  <div className="order-number">{index + 1}.</div>
                  <div className="img">
                    <img src={item.cover} alt="" />
                  </div>
                  <div className="cart-details">
                    <h3>{item.name}</h3>
                    <h4>
                      {item.price} * {item.qty}
                      <span>{productQty}</span>
                    </h4>
                    {selectedProduct && selectedProduct.id === item.id && (
                      <p className="product-description">{item.description}</p>
                    )}
                    {sizes.length > 0 && (
                      <div className="size-dropdown">
                        <Select
                          value={selectedSize}
                          onChange={handleSizeChange}
                          options={sizes}
                          placeholder="Select Size"
                        />
                      </div>
                    )}
                    <p>Discount: {item.discount}%</p>
                  </div>
                  <div className="cart-items-function">
                    <div className="removeCart">
                      <button
                        className="removeCart"
                        onClick={() => removeFromCart(item)}
                      >
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </div>
                    <div className="cartControl d_flex">
                      <button
                        className="incCart"
                        onClick={() => addToCart(item)}
                      >
                        <i className="fa-solid fa-plus"></i>
                      </button>
                      <button
                        className="desCart"
                        onClick={() => decreaseQty(item)}
                      >
                        <i className="fa-solid fa-minus"></i>
                      </button>
                    </div>
                  </div>
                  <div className="cart-item-price"></div>
                </div>
              );
            })}
          </div>

          <div className="cart-total product">
            <div className="d_flex">
              <h4>Tổng tiền :</h4>
              <h3>{totalPrice}</h3>
            </div>
            <div className="d_flex">
              <h4>Tổng giảm giá :</h4>
              <h3>{totalDiscount}</h3> {/* Hiển thị tổng giảm giá */}
            </div>
            <div className="d_flex">
              <h4>Tổng tiền phải thanh toán :</h4>
              <h3>{totalPrice - totalDiscount}</h3>{" "}
              {/* Hiển thị tổng tiền phải thanh toán */}
            </div>
            <div className="text-center">
              <button
                className="checkout-button red-button"
                onClick={handleCheckout}
              >
                Thanh toán
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
