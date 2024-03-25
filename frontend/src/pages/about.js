import React from "react";
import FacebookIcon from "../components/icon/Facebookicon";
import TwitterIcon from "../components/icon/Twittericon";
import AboutUsImage from "../assets/about-us.jpeg"
import "../styles/aboutus.scss";

const About = () => {
  return (
    <div>
      <div className="about-wrapper">
        <div className="about-us-image">
          <img src={AboutUsImage} alt ="About Stock Market Magnet"/>
        </div>
        <div className="about-us-info">
          <h2>About Stock Market Magnet</h2>
          <p>Welcome to Stock Market Magnet, your go-to app for all things stocks! Whether you're a seasoned investor or just getting started, Stock Market Magnet has you covered with comprehensive information on stocks, financials, pricing, and more.</p>
          <h3>Key Features</h3>
            <p>&rarr; Access detailed information about stocks</p>
            <p>&rarr; View financial data and pricing trends</p>
            <p>&rarr; Create and manage your personalized watchlist</p>
          <h3>Our Mission</h3>
          <p>At Stock Market Magnet, our mission is to empower investors by providing them with the tools and insights they need to make informed decisions in the dynamic world of stock trading.</p>
        </div>
      </div>
      <div className="about-socials">
        <h3>Follow Us</h3>
        <div className="about-socials-icon">
            <p><a href="https://twitter.com/StockMarketMagnet" target="_blank" rel="noopener noreferrer"><FacebookIcon /></a></p>
            <p><a href="https://facebook.com/StockMarketMagnet" target="_blank" rel="noopener noreferrer"><TwitterIcon /></a></p>
          </div>
        </div>
    </div>
  );
};

export default About;
