import React, { useState } from "react";
import emailjs from '@emailjs/browser';

const EmailForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    //EmailJS 
    const serviceId = 'service_dmqchgw';
    const templateId = 'template_6t5wma1';
    const publicKey = 'VbbEmsg2jvp21wFyq';
    // Create a new instance of EmailJS
    const templateParams = {
      from_name: name,
      from_email: email,
      to_name: 'Stocks App',
      message: message,
    };

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((response) => { 
        console.log('SUCCESS!', response);
        setName('');
        setEmail('');
        setMessage('');
      })
      .catch((error) => {
        console.log('FAILED...', error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className='emailForm'>
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <textarea
        cols="30"
        rows="10"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      >
      </textarea>
      <button type="submit">Send Email</button>
    </form>
  );
};

export default EmailForm;