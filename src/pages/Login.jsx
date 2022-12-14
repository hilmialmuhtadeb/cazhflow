import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getUser } from '../utils/handler/auth'
import { handleKeyUp } from '../utils/shared'
import { INPUT_CLASS, LABEL_CLASS } from '../utils/form'
import { setLoggedIn, setAuthUser } from '../store/slice/authSlice'
import Logo from '../components/atoms/Logo'
import toast from 'react-hot-toast'
import bcrypt from 'bcryptjs'

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
  
  function handleLogin () {
    if (!username || !password) {
      toast.error('Semua kolom harus diisi yaa')
      return
    }
    
    getUser(username)
      .then(user => {
        if (!user) {
          toast.error('Username tidak ditemukan')
          return
        }
        
        const { 
          password: userPassword = ''
        } = user
    
        if (bcrypt.compareSync(password, userPassword)) {
          dispatch(setLoggedIn())
          dispatch(setAuthUser(user))
    
          const storedUser = JSON.stringify(user)
          window.localStorage.setItem('user', storedUser)
          return navigate('/')
        }

        toast.error('Password tidak sesuai. Coba periksa lagi ya')
      })
  }
  
  return (
    <div className='container'>
      <div className="text-center w-72 mx-auto my-24">
        <h1 className="text-3xl mb-12 font-bold">
          Masuk ke <Logo/>
        </h1>
        <div className="relative my-4">
          <input type="text" className={INPUT_CLASS} placeholder=" " onKeyUp={(e) => handleKeyUp(e, handleLogin)} onChange={(e) => setUsername(e.target.value)} />
          <label className={LABEL_CLASS}>Username</label>
        </div>
        <div className="relative my-4">
          <input type="password" className={INPUT_CLASS} placeholder=" " onKeyUp={(e) => handleKeyUp(e, handleLogin)} onChange={(e) => setPassword(e.target.value)} />
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