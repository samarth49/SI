import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState(null); // null indicates loading
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      const fetchedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(fetchedCartItems);

      const total = fetchedCartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      setTotalPrice(total);
    }, 2000); // Simulate loading delay
  }, []);

  const handleCheckout = () => {
    alert("Proceeding to checkout...");
    navigate("/checkout");
  };

  const handleContinueShopping = () => {
    navigate("/");
  };

  if (cartItems === null) {
    // Show shimmer effect during loading
    return (
      <div className="cart-container">
        <h2>Loading Your Cart...</h2>
        <div className="shimmer-container">
          <div className="shimmer large"></div>
          <div className="shimmer"></div>
          <div className="shimmer"></div>
          <div className="shimmer"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header></Header>
      <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>In development</p>
        
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <img
                  src={item.img || "https://via.placeholder.com/150"}
                  alt={item.name}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <p>Price: ${item.price.toFixed(2)}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
            <div className="cart-actions">
              <button className="cart-checkout" onClick={handleCheckout}>
                Checkout
              </button>
              <button
                className="cart-continue-shopping"
                onClick={handleContinueShopping}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </>
      )}
    </div>
      <Footer></Footer>
    </div>
    
  );
};

export default Cart;
