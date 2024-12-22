import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  User,
  ShoppingBag,
} from "lucide-react";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      {/* Scrolling Announcement Banner */}
      <div className="scrolling-header">
        <a href="/" className="scrolling-header__link">
          <div className="scrolling-text">
            <div className="scrolling-text__inner">
              {[...Array(7)].map((_, index) => (
                <span key={index}>
                  SALE - UPTO 80% OFF + EXTRA 10% OFF ON PREPAID ORDERS
                </span>
              ))}
            </div>
          </div>
        </a>
      </div>

      <div className="header-grid">
        {/* Search Bar */}
        <div className="search-container">
          <input type="text" placeholder="Search" className="search-input" />
          <Search className="icon-search" />
        </div>

        {/* Main Header Section */}
        <div className="header-main">
          <div className="logo" onClick={()=>navigate("/")}>Mytalorzone</div>
        </div>

        {/* Utility Icons */}
        <div className="icon-container">
          <User
            className="icon"
            onClick={() => navigate("/login")} // Navigate to login page
          />
          <ShoppingBag className="icon" onClick={()=>navigate("/cart")} />
        </div>
      </div>
    </header>
  );
};

export default Header;
