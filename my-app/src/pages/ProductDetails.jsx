import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import './PD.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`http://localhost:5000/product/${id}`);
        if (response.data.success) {
          setProduct(response.data.product);
        } else {
          setError("Failed to fetch product details");
        }
      } catch (err) {
        setError(err.message || "Error fetching product details");
        console.error("Error fetching product details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleAddToCart = () => {
    // Navigate to the "Add to Cart" link
    navigate(`/cart/add/${id}`);
  };


  if (loading) {
    return (
      <div className="product-details-card loading">
        <div className="product-details-image-container">
          <div className="product-details-placeholder-image" />
        </div>
        <div className="product-details-info">
          <div className="product-details-placeholder-text" />
          <div className="product-details-placeholder-text" />
          <div className="product-details-placeholder-text" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-details-card error">
        <p className="product-details-error-message">Error: {error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-details-card error">
        <p className="product-details-error-message">Product not found</p>
      </div>
    );
  }

  return (
    <div>
      <Header></Header>
      <div className="product-details-card">
      <div className="product-details-image-container">
        <img
          src={product.img || "https://via.placeholder.com/150"}
          alt={product.name}
          className="product-details-image"
        />
      </div>
      <div className="product-details-info">
        <h3 className="product-details-name">{product.name}</h3>
        <p className="product-details-price">{product.price || "Price not available"}</p>
        <p className="product-details-stock">
          Stock: {product.inStockValue || "N/A"}
        </p>
        <div className="product-details-buttons">
          <button 
            className="product-details-add-to-cart" 
            onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
    <Footer></Footer>

    </div>
    
  );
};

export default ProductDetails;
