import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import supabase from '../config/supabase'
import { setLoggedIn } from '../store/slice/authSlice'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  
  async function handleLogin () {
    const { data: users, error } = await supabase
      .from('users')
      .select('password')
      .eq('username', username)

      if (password === 'password') {
        console.log('hii');
        dispatch(setLoggedIn())
      }
  }
  
  return (
    <div>
      <h1>Halaman login</h1>
      <Link to="/register">
        daftar
      </Link>
      <div className="my-3">
        <p>Username</p>
        <input className='border border-gray-400' type="text" onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div className="my-3">
        <p>Password</p>
        <input className='border border-gray-400' type="password" onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button className='bg-gray-400 p-3' onClick={handleLogin}>Masuk</button>
    </div>
  )
}

export default Login