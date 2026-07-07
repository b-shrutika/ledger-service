import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
        <nav className='flex justify-between items-center gap-4 px-8 py-4 mx-auto'>
            <div>
            <Link to="/">Ledger</Link >
            </div>
            <div>
                About 
                contact services
            </div>
            <div>
            <Link to="/login">Login</Link >
            <Link to="/register">Register</Link >
            </div>
        </nav>
  )
}

export default Navbar
