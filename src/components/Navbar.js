// Navbar.js
import React from 'react';
import './Navbar.css'; 
import logo from '../images/cloudbox.jpg';

const Navbar = () => {
  return (
    <div className="navbar">
      <img src={logo} alt="CloudBox Logo" className="logo" /> 
      <h1 className="app-name">CloudBox</h1>
    </div>
  );
};

export default Navbar;
