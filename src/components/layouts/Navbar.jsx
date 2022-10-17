import React, { useEffect } from 'react'
import { Link, useLocation  } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Logo from '../atoms/Logo'
import AccountDropdown from './AccountDropdown'

const Navbar = () => {
  const authUser = useSelector(state => state.auth.authUser) || {}
  
  function changeMode () {
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className='bg-white dark:bg-gray-800 dark:text-gray-100 border-b dark:border-gray-700'>
      <div className='container flex justify-between items-center py-4'>
        <Link to="/" className='text-2xl font-extrabold '>
          <Logo />
        </Link>
        <Link to="/welcome" className='font-medium '>
          About
        </Link>
        <div className='flex'>
          <AccountDropdown user={authUser} />
          <button className='mx-6 p-1 border dark:bg-gray-700 dark:border-gray-500 rounded' onClick={changeMode}>
            🌙 | 🔆
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar