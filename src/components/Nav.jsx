import React, { useState } from 'react';
import './Navbar.css'; // We'll create this CSS file next
import Image from '../assets/Q.png';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };
  const handleMenuClick1 = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="menu-logo-container">
      <div className="circle-background" onClick={handleMenuClick1}></div>
      <div className="menu-logo" onClick={handleMenuClick}>
        ☰
      </div>
      
    </div>
    <div className='image-logo'>
        <img src={Image} alt="Quiz" />
      </div>
      {menuOpen && (
        <div className="menu-items">
          <a href="#home" className="menu-item">Home</a>
          <a href="#about" className="menu-item">About</a>
          <a href="#contact" className="menu-item">Contact</a>
          <div className="animation start-home"></div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
