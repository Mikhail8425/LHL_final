import React from "react";
import PhoneIcon from '../components/icon/Phoneicon';
import EmailIcon from '../components/icon/Emailicon';
import FacebookIcon from "../components/icon/Facebookicon";
import TwitterIcon from "../components/icon/Twittericon";
import "../styles/contact.scss";

const ContactUs = () => {
  return (
    <div className="contact-us-container">
        <div>
            <h2>Contact Us</h2>
            <p className="description">Have a question or feedback? We'd love to hear from you! Please feel free to contact us using the form below:</p>
        </div>
      <form className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required className="input-field" />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required className="input-field" />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" rows="4" required className="input-field"></textarea>
        </div>

        <button type="submit" className="submit-button">Send Message</button>
      </form>
      <div className="contact-info">
            <div className="contact-directly">
                <h3>Reach Out Directly</h3>
                <ul>
                    <li><EmailIcon /> <a href="mailto:contact@stockmarketmagnet.com">contact@stockmarketmagnet.com</a></li>
                    <li><PhoneIcon /> +1 (123) 456-7890</li>
                </ul>
            </div>

            <div className="contact-directly">
                <h3>Connect on Social Media</h3>
                <ul className="social-media-links">
                    <li><a href="https://twitter.com/StockMarketMagnet" target="_blank" rel="noopener noreferrer"><TwitterIcon /></a></li>
                    <li><a href="https://facebook.com/StockMarketMagnet" target="_blank" rel="noopener noreferrer"><FacebookIcon /></a></li>
                </ul>
            </div>
      </div>
    </div>
  );
};

export default ContactUs;


