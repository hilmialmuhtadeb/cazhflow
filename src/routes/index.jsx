import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import { setAuthUser, setLoggedIn } from '../store/slice/authSlice'

const AppRoute = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    const strUser = window.localStorage.getItem('user') || '{}'
    const user = JSON.parse(strUser) || {}
    console.log(user)
    if (!!user.name) {
      dispatch(setLoggedIn())
      dispatch(setAuthUser(user))
    } 
  }, [])
  
  return (
    <Routes>
      <Route path='/' element={<Home />} />

      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  )
}

export default AppRoute