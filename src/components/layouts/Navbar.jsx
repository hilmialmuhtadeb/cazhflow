import React, { useEffect } from 'react'
import { Link  } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Logo from '../atoms/Logo'
import AccountDropdown from './AccountDropdown'
import useWindowDimensions from '../../utils/hook/useWindowDimensions'
import { setIsMobile } from '../../store/slice/generalSlice'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Navbar = () => {
  const authUser = useSelector(state => state.auth.authUser) || {}
  const isMobile = useSelector(state => state.general.isMobile)
  const dispatch = useDispatch()
  const { width } = useWindowDimensions()
  
  useEffect(() => {
    if (width < 768) {
      dispatch(setIsMobile(true))
    } else {
      dispatch(setIsMobile(false))
    }
  }, [width])
  
  function changeMode () {
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className='bg-white dark:bg-gray-800 dark:text-gray-100 border-b dark:border-gray-700'>
      <div className='container flex justify-between items-center py-4'>
        { isMobile ? (
          <Link to="/" className='text-xl mx-2'>
            <FontAwesomeIcon icon={ faHouse } />
          </Link>
        ) : (
          <Link to="/" className='text-2xl font-extrabold '>
            <Logo />
          </Link>
        )}
        <div className='flex justify-between sm:justify-end w-full'>
          { authUser.username ? (
            <AccountDropdown user={ authUser } />
            ) : (
            <div></div>
          )}
          <button className='sm:mx-6 p-1 border dark:bg-gray-700 dark:border-gray-500 rounded' onClick={ changeMode }>
            🌙 | 🔆
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar