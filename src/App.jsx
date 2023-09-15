import React, { useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Header from "./common/header/Header";
import Pages from "./pages/Pages";
import Data from "./components/flashDeals/Data";
import Cart from "./common/Cart/Cart";
import Footer from "./common/footer/Footer";
import Sdata from "./components/shops/Sdata";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Order from "./pages/Order";
import Dashboard from "./pages/Dashboard";

function App() {
  const { productItems } = Data;
  const { shopItems } = Sdata;

  const [CartItem, setCartItem] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null); 

  const addToCart = (product) => {
    
    const updatedCart = [...CartItem];

    const existingItem = updatedCart.find((item) => item.id === product.id);

    if (existingItem) {
     
      existingItem.qty += 1;
    } else {
      updatedCart.push({ ...product, qty: 1 });
    }

    setCartItem(updatedCart);
  };

  const decreaseQty = (product) => {
    const updatedCart = [...CartItem];

    const existingItem = updatedCart.find((item) => item.id === product.id);

    if (existingItem) {
      // Giảm số lượng sản phẩm đi 1
      existingItem.qty -= 1;


      if (existingItem.qty === 0) {
        const index = updatedCart.indexOf(existingItem);
        updatedCart.splice(index, 1);
      }

      setCartItem(updatedCart);
    }
  };

  
  const remoteCart = (updatedCart) => {
    setCartItem(updatedCart);
  };

 
  const users = [
    {
      id: 1,
      username: "admin",
      email: "tranluc@gmail.com",
      password: "Qaz123@@",
      role: "admin",
    },
    {
      id: 2,
      username: "newuser",
      email: "newpass123@gmail.com",
      password: "Qaz123@@",
      role: "customer",
    },
  ];

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    
    localStorage.removeItem("user");
    setUser(null);
  };

  const handleSubmit = (user) => {
    
    console.log("Đăng ký thành công:", user);
  };
  const getTotalToPay = () => {
    return CartItem.reduce((total, item) => total + item.qty * item.price, 0);
  };
  
  return (
    <>
      <Router>
        <Header CartItem={CartItem} user={user} onLogout={handleLogout} />
        <Switch>
          <Route path="/" exact>
            <Pages
              productItems={productItems}
              addToCart={addToCart}
              shopItems={shopItems}
              setSelectedProduct={setSelectedProduct} 
            />
          </Route>
          <Route path="/cart" exact>
            {user ? (
              <Cart
                CartItem={CartItem}
                addToCart={addToCart}
                decreaseQty={decreaseQty}
                remoteCart={remoteCart}
                product={selectedProduct} 
              />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          // Trong thành phần App
          <Route path="/order" exact>
            <Order CartItem={CartItem} cartTotal={getTotalToPay()} />
          </Route>
          <Route path="/dashboard" exact>
            <Dashboard /> 
          </Route>
          <Route path="/login">
            {user ? (
              <Redirect to="/" />
            ) : (
              <Login users={users} onLogin={handleLogin} />
            )}
          </Route>
          <Route path="/register">
            {user ? (
              <Redirect to="/" />
            ) : (
              <Register users={users} onRegister={handleSubmit} />
            )}
          </Route>
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;
