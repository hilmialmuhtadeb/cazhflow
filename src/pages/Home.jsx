import React from 'react'
import { useSelector } from 'react-redux'

const Home = () => {
  const isLogin = useSelector(state => state.auth.isLogin)
  
  return (
    <div className='container'>
      { isLogin ? (
        <h1>anda sudah login</h1>
      ) : (
        <h1>anda belum login</h1>
      )}
    </div>
  )
}

export default Home