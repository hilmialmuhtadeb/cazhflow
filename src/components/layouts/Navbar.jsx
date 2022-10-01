import React from 'react'
import { Link } from 'react-router-dom'

function changeMode () {
  document.documentElement.classList.toggle('dark')
}

const Navbar = () => {
  return (
    <div className='bg-white dark:bg-gray-800 dark:text-gray-100 border-b'>
      <div className='container flex justify-between items-center py-4'>
        <Link to="/">
          <h1 className='text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500'>Cazhflow</h1>
        </Link>
        <div className='flex'>
          <button className='mx-6 p-1 border rounded' onClick={changeMode}>
            🌙 | 🔆
          </button>
          <Link to="/login" className='bg-emerald-500 text-white font-semibold rounded px-4 py-1'>
            <button>
              Masuk
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar