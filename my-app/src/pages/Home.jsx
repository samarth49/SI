import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import SimpleImageSlider from "react-simple-image-slider";
import { Link } from 'react-router-dom'; // Import Link

import Header from '../components/Header';
import Footer from '../components/Footer';
import './Home.css';

const Home = () => {
    const sliderImages = [
        { url: "https://www.thecornerbooth.com.au/cdn/shop/collections/IMG_6693-228584.jpg?v=1710652021", title: "Kids Clothing" },
        { url: "https://images.squarespace-cdn.com/content/v1/601ff8bc5d52e74622996a33/1620646646572-GWDJMTGKVNXD8CXHYN8L/Flatlay-shirt-shoes-businesswear", title: "Men's Clothing" },
        { url: "https://cdn.shopify.com/s/files/1/0597/5592/1540/files/6-different-styles_1024x1024.jpg?v=1687584397", title: "Women's Clothing" },
        { url: "https://www.starleaf.com/p/moz7rc.jpg", title: "Sportswear" },
        { url: "https://img.freepik.com/free-photo/top-view-accessoires-travel-with-women-clothing-concept-white-mobilephone-watch-bag-hat-map-camera-necklace-trousers-sunglasses-white-wood-table_1921-106.jpg", title: "Accessories" },
        { url: "https://www.satyamkraft.in/cdn/shop/files/71Gvx0LWrNL._SL1500_1127x700.jpg?v=1712390466", title: "Gift-Boxes" },
        { url: "https://images.squarespace-cdn.com/content/v1/5876279bbebafb82a7c81c00/f4e17d6a-81db-4a04-9bda-63c86c517778/IMG_3105.jpg", title: "Books" },
        { url: "https://5.imimg.com/data5/SELLER/Default/2022/8/XN/NF/SB/157564005/beauty-personal-care.jpg", title: "Beauty & Personal Care" },
        { url: "https://www.agsdevices.com/wp-content/uploads/2024/05/electronic_components_hero_image.jpg", title: "Electronics" },
      ];
    const defaultCategories = [
        "Kids Clothing", "Women's Wear", "Kids' Wear", "Men's Wear", "Wedding", 
        "Women Traditional", "Kids Western", "Girls' Frock", "Stationery", 
        "Gift Boxes", "Books", "Electronics", "Candy", "Men's Clothing", 
        "Accessories", "Footwear", "Sportswear", "Home & Kitchen", 
        "Beauty & Personal Care"
    ];

    const [categories, setCategories] = useState(defaultCategories);
    const [products, setProducts] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const categoryRefs = useRef({}); // To manage category sections dynamically

    const fetchProducts = async (category) => {
        try {
            const response = await axios.post("https://ecommercebackend1-0s99.onrender.com/product/category", { category });
            if (response.data.success) {
                return response.data.products;
            } else {
                throw new Error(`Failed to fetch products for category: ${category}`);
            }
        } catch (err) {
            console.error(err.message);
            setError(`Could not fetch products for ${category}.`);
            return [];
        }
    };

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            setError("");
            const categoryProducts = {};
            for (const category of categories) {
                categoryProducts[category] = await fetchProducts(category);
            }
            setProducts(categoryProducts);
            setLoading(false);
        };
        loadProducts();
    }, [categories]);

    const handleNavClick = (category) => {
        categoryRefs.current[category]?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div>
            <Header />

            {/* Category Navigation */}
            <nav className="category-nav">
                {categories.map((category) => (
                    <button key={category} onClick={() => handleNavClick(category)}>
                        {category}
                    </button>
                ))}
            </nav>

            {/* Hero Section */}
            <div className="hero-section">
                <SimpleImageSlider
                    width="100%"
                    height="100%"
                    images={sliderImages}
                    showNavs={true}
                    showBullets={true}
                    autoPlay={true}
                    autoPlayDelay={3.0}
                />
            </div>

            {/* Products Section */}
            <div className="products-section">
                {loading ? (
                    <p>Loading products...</p>
                ) : error ? (
                    <p className="error-message">{error}</p>
                ) : (
                    categories.map((category) => (
                        <div
                            key={category}
                            ref={(el) => (categoryRefs.current[category] = el)}
                            className="category-section"
                        >
                            <h2>{category}</h2>
                            <div className="product-cards">
                                {products[category]?.length ? (
                                    products[category].map((product) => (
                                        <Link 
                                            to={`/product/${product._id}`} // Link to product details page
                                            className="product-card" 
                                            key={product._id}
                                        >
                                            <img
                                                src={product.img || "https://via.placeholder.com/150"}
                                                alt={product.name}
                                                className="product-image"
                                                onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
                                            />
                                            <h3 className="product-name">{product.name}</h3>
                                            <p className="product-price">{product.price || "Price not available"}</p>
                                            <p className="product-stock">Stock: {product.inStockValue || "N/A"}</p>
                                            <Link to={`/product/${product._id}`}>View Details</Link>

                                        </Link>
                                    ))
                                ) : (
                                    <p>No products available in this category.</p>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
            <Footer></Footer>
        </div>
    );
        
};

export default Home;
