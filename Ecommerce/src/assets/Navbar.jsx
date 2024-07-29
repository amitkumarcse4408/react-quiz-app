import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
        <div className='menuIcon'>
            <ul className="navbar-list">
                <li>
                    <NavLink className='an' to={"/"}>Home</NavLink>
                </li>
                <li>
                    <NavLink className='an' to={"/about"}>About</NavLink>
                </li>
                <li>
                    <NavLink className='an' to={"/contact"}>Contact</NavLink>
                </li>
                <li>
                    <NavLink className='an' to={"/services"}>Services</NavLink>
                </li>
            </ul>
        </div>
    </nav>
  )
}
export default Navbar  
