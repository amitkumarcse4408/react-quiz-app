import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../assets/logo1.png'
import Navbar from './Navbar'


const Header = () => {
  return (
    <header className="header">
        <NavLink to="/" className='logo'>
            <img src={logo} alt='logo'/>
        </NavLink>
        <Navbar/>
    </header>
  )
}

export default Header
