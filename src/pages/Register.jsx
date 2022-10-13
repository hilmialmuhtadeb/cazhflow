import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LABEL_CLASS, INPUT_CLASS } from '../utils/form'
import { registerUser } from '../utils/handler/auth'
import { handleKeyUp } from '../utils/shared'

const Register = () => {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  function handleSubmit() {
    const payload = {
      name,
      username,
      password
    }
    registerUser(payload)
    navigate('/login')
  }

  useEffect(() => {
    const isLogin = window.localStorage.getItem('user')
    if (isLogin) {
      navigate('/')
    }
  }, [])
  
  return (
    <div className='container'>
      <div className="text-center w-72 mx-auto my-24">
        <h1 className="text-3xl mb-4 font-bold">
          Buat Akun Sekarang
        </h1>
        <p className='text-center mb-8'>
          <Link to="/login" className='underline decoration-solid text-sky-500'>masuk</Link>
        </p>
        <div className="relative my-4">
          <input type="text" className={INPUT_CLASS} placeholder=" " onKeyUp={(e) => handleKeyUp(e, handleSubmit)} onChange={(e) => setName(e.target.value)} />
          <label className={LABEL_CLASS}>Nama</label>
        </div>
        <div className="relative my-4">
          <input type="text" className={INPUT_CLASS} placeholder=" " onKeyUp={(e) => handleKeyUp(e, handleSubmit)} onChange={(e) => setUsername(e.target.value)} />
          <label className={LABEL_CLASS}>Username</label>
        </div>
        <div className="relative my-4">
          <input type="password" className={INPUT_CLASS} placeholder=" " onKeyUp={(e) => handleKeyUp(e, handleSubmit)} onChange={(e) => setPassword(e.target.value)} />
          <label className={LABEL_CLASS}>Password</label>
        </div>
        <div className="my-8">
          <button className='bg-emerald-500 text-white rounded-full font-bold w-full py-4' onClick={handleSubmit}>Daftar</button>
        </div>
      </div>
    </div>
  )
}

export default Register