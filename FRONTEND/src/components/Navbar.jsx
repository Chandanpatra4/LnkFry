import React, { useState } from 'react'
import { Link } from '@tanstack/react-router'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav className='bg-white  border-b border-black-200'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Left side - Logo/Brand */}
          <div className='flex items-center'>
            <Link to='/' className='text-2xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors'>
              LnkFry
            </Link>
          </div>

          {/* Center - Navigation Links */}
          <div className='hidden md:flex items-center space-x-8'>
            {/* Navigation links removed for now */}
          </div>

          {/* Right side - Login Button */}
          <div className='flex items-center space-x-4'>
            <Link 
              to='/auth' 
              className='bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer'
            >
              Login
            </Link>

            {/* Mobile menu button */}
            <button 
              onClick={toggleMobileMenu}
              className='md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'
            >
              <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                {isMobileMenuOpen ? (
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                ) : (
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className='md:hidden'>
            <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 rounded-lg mt-2'>
              {/* Mobile navigation links removed for now */}
              <div className='pt-2'>
                <Link 
                  to='/auth' 
                  className='bg-indigo-600 hover:bg-indigo-700 text-white block px-3 py-2 text-base font-medium transition-colors rounded-md text-center'
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
