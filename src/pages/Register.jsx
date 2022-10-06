import React, { useState } from 'react'
import supabase from '../config/supabase'

const Register = () => {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  async function handleRegister () {
    const { data, error } = await supabase
    .from('users')
    .insert([{ 
        name,
        username,
        password
      },
    ])
  }
  
  return (
    <>
      <h1>Register</h1>
      <div className="my-3">
        <p>Name</p>
        <input className='border border-gray-400' type="text" onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="my-3">
        <p>Username</p>
        <input className='border border-gray-400' type="text" onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div className="my-3">
        <p>Password</p>
        <input className='border border-gray-400' type="password" onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button className='bg-gray-400 p-3' onClick={handleRegister}>Daftar</button>
    </>
  )
}

export default Register