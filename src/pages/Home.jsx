import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const Home = () => {
  const isLogin = useSelector(state => state.auth.isLogin)
  const authUser = useSelector(state => state.auth.authUser)

  // useEffect(() => {
  //   const payload = authUser.payload || {}
  //   const name = payload.name || ''
  // }, [authUser])
  
  return (
    <div className='container'>
      <div className="text-center my-32">
        <h1 className='fw-bold text-2xl'>
          { isLogin ? (
            <span>Halo {authUser.name}, Selamat Datang!</span>
          ) : (
            <span>anda belum login</span>
          )}
        </h1>
      </div>
    </div>
  )
}

export default Home