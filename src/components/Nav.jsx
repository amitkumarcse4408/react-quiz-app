import React from 'react'
import logo from '../assets/react.svg'
import '../components/Navbar.css'
// import menu from '../assets/menu.png'
const Navbar = () => {
  return (
    <>
    <nav class="navbar">
      <div class="logo-image">
        <a href="index.html"><img src={logo} alt="logo"/></a>
      </div>
      <div class="navbar-toggle" id="mobile-menu">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </div>
      <div class="navbar-nav" id="nav-links">
        <ul>
          <li>
            Home
          </li>
          <li>
            About Us
          </li>
          <li>
            Social
          </li>
          <li>
            Contact Us
          </li>
        </ul>
      </div>
    </nav>
    </>
  )
}

export default Navbar





