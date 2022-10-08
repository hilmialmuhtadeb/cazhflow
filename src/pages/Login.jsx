import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../components/atoms/Logo'
import supabase from '../config/supabase'
import { setLoggedIn, setAuthUser } from '../store/slice/authSlice'
import { INPUT_CLASS, LABEL_CLASS } from '../utils/form'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const isLogin = window.localStorage.getItem('user')
    if (isLogin) {
      navigate('/')
    }
  }, [])
  
  async function handleLogin () {
    const { data: user, error } = await supabase
      .from('users')
      .select()
      .eq('username', username)
      .limit(1)
      .single()

      const { 
        password: userPassword = ''
      } = user

      if (userPassword === password) {
        dispatch(setLoggedIn())
        dispatch(setAuthUser(user))

        const storedUser = JSON.stringify(user)
        window.localStorage.setItem('user', storedUser)
        navigate('/')
      }
  }

  function handleKeyUp (e) {
    if (e.key === 'Enter') {
      return handleLogin()
    }
    return
  }
  
  return (
    <div className='container'>
      <div className="text-center w-72 mx-auto my-24">
        <h1 className="text-3xl mb-12 font-bold">
          Masuk ke <Logo/>
        </h1>
        <div className="relative my-4">
          <input type="text" className={INPUT_CLASS} placeholder=" " onKeyUp={handleKeyUp} onChange={(e) => setUsername(e.target.value)} />
          <label className={LABEL_CLASS}>Username</label>
        </div>
        <div className="relative my-4">
          <input type="password" className={INPUT_CLASS} placeholder=" " onKeyUp={handleKeyUp} onChange={(e) => setPassword(e.target.value)} />
          <label className={LABEL_CLASS}>Password</label>
        </div>
        <div className="my-8">
          <button className='bg-emerald-500 text-white rounded-full font-bold w-full py-4' onClick={handleLogin}>Masuk</button>
        </div>
        <p className='text-left'>
          Belum punya akun? <Link to="/register" className='underline decoration-solid text-sky-500'>daftar</Link>
        </p>
      </div>
    </div>
  )
}

export default Login