import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getAllWindows } from '../utils/handler/window'
import { setWindows } from '../store/slice/windowSlice'
import WindowModal from '../components/layouts/WindowModal'
import DeleteModal from '../components/layouts/DeleteModal'
import WindowCard from '../components/molecules/WindowCard'

const Cashflow = () => {
  const authUser = useSelector(state => state.auth.authUser)
  const windows = useSelector(state => state.window.windows)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isWindowModalOpen, setIsWindowModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [editWindow, setEditWindow] = useState({})
  const [idWindowDelete, setIdWindowDelete] = useState(0)

  function openModal () {
    setEditWindow({})
    setIsWindowModalOpen(true)
  }
  
  useEffect(() => {
    const strUser = window.localStorage.getItem('user')
    if (!strUser) {
      return navigate('/welcome')
    }
    const user = JSON.parse(strUser) || {}

    if (windows.length < 1) {
      getAllWindows(user.username)
        .then(res => dispatch(setWindows(res)))
    }
  }, [])

  function editButtonHandler (window) {
    setEditWindow(window)
    setIsWindowModalOpen(true)
  }

  function deleteButtonHandler (id) {
    setIdWindowDelete(id)
    setIsDeleteModalOpen(true)
  }

  return (
    <div className='container py-8'>
      <div>
        <h1 className='text-xl font-semibold my-2'>Halo, selamat datang <span className='underline decoration-wavy decoration-emerald-500'>{ authUser.name }</span>!</h1>
        <p className='text-gray-700 dark:text-gray-400'>Apa kabar? Semoga baik, jangan lupa catat arus kasmu yaa! Biar sehat finansial :D</p>
      </div>
      <div className="my-12 bg-blue-100 text-blue-900 dark:bg-gray-700 dark:text-gray-200 rounded-xl p-8">
        <h2 className='font-bold mb-2'>Apa itu Arus Kas?</h2>
        <p>Arus kas atau dalam Bahasa Inggris <i>Cash Flow</i> merupakan catatan keluar masuknya uang Kamu. Arus Kas pribadi penting untuk mengetahui alur masuk dan keluarnya uang. Dari sana, Kita bisa mengambil keputusan finansial dengan bijak.</p>
      </div>
      <div className="flex mb-4 items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2 font-bold">Arus Kas</h1>
          <p className='text-gray-700 dark:text-gray-400'>Semua catatan arus kas punyamu ditampilkan di halaman ini. Kamu bisa melihat, menambah, mengubah, dan menghapusnya.</p>
        </div>
        <div className="rounded-md h-full bg-red-100">
          <button
            type="button"
            onClick={openModal}
            className="rounded-md h-8 bg-emerald-500 px-4 text-sm font-medium text-white dark:text-black hover:bg-emerald-600"
          >
            + Arus Kas
          </button>
        </div>
        <WindowModal
          editWindow={editWindow}
          setIsWindowModalOpen={setIsWindowModalOpen}
          isOpen={isWindowModalOpen}
        />
        <DeleteModal
          id={idWindowDelete}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          isOpen={isDeleteModalOpen}
        />
      </div>
      <div className="py-4 grid grid-cols-2 gap-x-4 gap-y-6">
        { windows.map(window => (
          <WindowCard
            key={ window.id } 
            window={ window }
            editButtonHandler={ editButtonHandler }
            deleteButtonHandler={ deleteButtonHandler }
          />
        )) }
      </div>
      { windows.length < 1 && (
        <div className='py-12 '>
          <img className='mx-auto mb-6' src="./src/assets/arus-kas.svg" alt="Arus Kas" />
          <p className='text-center font-semibold'>Yah, kamu belum pernah buat catatan arus kas nih. <span className='underline hover:cursor-pointer text-emerald-500 hover:text-emerald-700' onClick={ openModal } >Buat di sini</span></p>
        </div>
      ) }
    </div>
  )
}

export default Cashflow