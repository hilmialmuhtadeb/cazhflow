import React, { useEffect, useState } from 'react'
import { Link, useLocation  } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Logo from '../atoms/Logo'


const Navbar = () => {
  const [isLoginPage, setIsLoginPage] = useState(false)
  const location = useLocation()
  const isLogin = useSelector(state => state.auth.isLogin)
  const authUser = useSelector(state => state.auth.authUser) || {}
  
  function changeMode () {
    document.documentElement.classList.toggle('dark')
  }

  useEffect(() => {
    // console.log(isLogin)
    // console.log(authUser)
  }, [isLogin, authUser])

  useEffect(() => {
    const pathname = location.pathname || ''
    if (pathname.includes('login')) {
      return setIsLoginPage(true)
    }
    return setIsLoginPage(false)
  }, [location])

  return (
    <div className='bg-white dark:bg-gray-800 dark:text-gray-100 border-b dark:border-gray-700'>
      <div className='container flex justify-between items-center py-4'>
        <Link to="/" className='text-2xl font-extrabold '>
          <Logo />
        </Link>
        <div className='flex'>
          <button className='mx-6 p-1 border rounded' onClick={changeMode}>
            🌙 | 🔆
          </button>
          { isLoginPage ? ('') : (
            <Link to="/login" className='bg-emerald-500 text-white font-semibold rounded-full px-4 py-1'>
              <button>
                Masuk
              </button>
            </Link>
          )}
          
        </div>
      </div>
    </div>
  )
}

export default Navbar