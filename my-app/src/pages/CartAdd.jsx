import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from '../components/Header'
import Footer from '../components/Footer'
import "./CartAdd.css";

const CartAdd = () => {
  const { id } = useParams(); // Get product ID from URL
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://ecommercebackend1-0s99.onrender.com/product/${id}`);
        if (response.data.success) {
          setProduct(response.data.product);
        } else {
          setError("Failed to fetch product details");
        }
      } catch (err) {
        setError(err.message || "Error fetching product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleViewCart = () => {
    navigate("/cart");
  };

  const handleContinueShopping = () => {
    navigate("/");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div>
      <Header></Header>
      <div className="cart-add-container">
      <h2>Product Added to Cart!</h2>
      <div className="cart-add-product">
        <img
          src={product.img || "https://via.placeholder.com/150"}
          alt={product.name}
          className="cart-add-product-image"
        />
        <div className="cart-add-product-details">
          <h3>{product.name}</h3>
          <p>Price: {product.price || "Price not available"}</p>
        </div>
      </div>
      <div className="cart-add-actions">
        <button className="cart-add-view-cart" onClick={handleViewCart}>
          View Cart
        </button>
        <button
          className="cart-add-continue-shopping"
          onClick={handleContinueShopping}
        >
          Continue Shopping
        </button>
      </div>
    </div>
    <Footer></Footer>


    </div>
      );
};

export default CartAdd;
