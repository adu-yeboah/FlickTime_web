import React from 'react'
import './Navbar.scss'
import { IoMdSearch } from "react-icons/io";
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div>
      <div className="navbar">
        <div className="container">
            <div className="navbarWrapper flex-item">

                <div className="logo">
                    <span>f</span>lick<span>t</span>ime
                </div>

                <div className="nav flex-item">
                    <Link to='/'>home</Link>
                    <Link to='/movies'>movies</Link>
                    <Link to='/tv'>tv-shows</Link>
                </div>

                <Link to='/search' className="search">
                <IoMdSearch />
                </Link>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
