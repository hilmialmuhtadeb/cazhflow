import React, { useEffect } from 'react'
import { Routes, Route, redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import { setAuthUser, setLoggedIn } from '../store/slice/authSlice'
import Cashflow from '../pages/Cashflow'
import Detail from '../pages/Detail'

const AppRoute = () => {
  const dispatch = useDispatch()
  const isLogin = useSelector(state => state.auth.isLogin)
  
  useEffect(() => {
    const strUser = window.localStorage.getItem('user') || '{}'
    const user = JSON.parse(strUser) || {}
    if (!!user.name) {
      dispatch(setLoggedIn())
      dispatch(setAuthUser(user))
    }
  }, [])
  
  return (
    <Routes>
      <Route path='/' element={<Cashflow />} />
      <Route path='/welcome' element={<Home />} />
      <Route path='/cashflow/:slug' element={<Detail />} />

      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  )
}

export default AppRoute