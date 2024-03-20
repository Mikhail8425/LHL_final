import React from "react";
import EmailForm from "../components/EmailForm";

const ContactUs = () => {
  return (
    <div>
      <h1>Contact Us</h1>
      <p>Have a question or feedback? We'd love to hear from you!</p>
      <EmailForm/>

      <ul>
        <li><a href="https://twitter.com/StockMarketMagnet" target="_blank" rel="noopener noreferrer">Twitter</a></li>
        <li><a href="https://facebook.com/StockMarketMagnet" target="_blank" rel="noopener noreferrer">Facebook</a></li>

      </ul>
    </div>
  );
};

export default ContactUs;
