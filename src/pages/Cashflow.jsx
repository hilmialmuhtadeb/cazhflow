import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getAllWindows } from '../utils/handler/window'
import { setWindows } from '../store/slice/windowSlice'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import WindowModal from '../components/layouts/WindowModal'
import DeleteModal from '../components/layouts/DeleteModal'
import WindowCard from '../components/molecules/WindowCard'
import useWindowDimensions from '../utils/hook/useWindowDimensions'
import { setIsMobile } from '../store/slice/generalSlice'

const Cashflow = () => {
  const authUser = useSelector(state => state.auth.authUser)
  const windows = useSelector(state => state.window.windows)
  const isMobile = useSelector(state => state.general.isMobile)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { width } = useWindowDimensions()
  const [isWindowModalOpen, setIsWindowModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [editWindow, setEditWindow] = useState({})
  const [idWindowDelete, setIdWindowDelete] = useState(0)

  function openModal () {
    setEditWindow({})
    setIsWindowModalOpen(true)
  }

  useEffect(() => {
    if (width < 768) {
      dispatch(setIsMobile(true))
    } else {
      dispatch(setIsMobile(false))
    }
  }, [width])
  
  useEffect(() => {
    const strUser = window.localStorage.getItem('user')
    if (!strUser) {
      return navigate('/login')
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
    <div className='container py-2 md:py-8'>
      <div>
        <h1 className='sm:text-xl font-semibold my-2'>👋 Halo, selamat datang <span className='underline decoration-wavy decoration-emerald-500'>{ authUser.name }</span>!</h1>
        <p className='text-gray-700 dark:text-gray-400'>Apa kabar? Semoga baik, jangan lupa catat arus kasmu yaa! Biar sehat finansial :D</p>
      </div>
      <div className="my-6 md:my-12 bg-blue-100 text-blue-900 dark:bg-gray-700 dark:text-gray-200 rounded-xl p-4 md:p-8">
        <h2 className='font-bold mb-2'>💡 Apa itu Arus Kas?</h2>
        <p className='dark:text-gray-400'>Arus kas atau dalam Bahasa Inggris <i>Cash Flow</i> merupakan catatan keluar masuknya uang Kamu dalam periode waktu tertentu. Arus Kas pribadi penting untuk mengetahui alur masuk dan keluarnya uang yang kamu punya. Dari sana, Kita bisa mengambil keputusan finansial dengan bijak.</p>
      </div>
      <div className="flex justify-between items-center">
        <div className='grow'>
          <h1 className="text-xl sm:text-2xl font-bold">Arus Kas</h1>
        </div>
        <button
          type="button"
          onClick={openModal}
          className="block rounded-md bg-emerald-500 px-4 py-2 ml-2 text-sm font-medium text-white dark:text-black hover:bg-emerald-600"
        >
          { isMobile ? <FontAwesomeIcon icon={faPlus} /> : (
            <>
              <FontAwesomeIcon icon={ faPlus } />  Arus Kas
            </>
          )}
        </button>
        <WindowModal
          editWindow={ editWindow }
          setIsWindowModalOpen={ setIsWindowModalOpen }
          isOpen={ isWindowModalOpen }
        />
        <DeleteModal
          id={ idWindowDelete }
          setIsDeleteModalOpen={ setIsDeleteModalOpen }
          isOpen={ isDeleteModalOpen }
        />
      </div>
      <div className="py-4 grid lg:grid-cols-2 gap-x-4 gap-y-6">
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
        <div className='py-2 md:py-12'>
          <img className='mx-auto mb-6 w-2/3 md:w-1/2' src="./src/assets/arus-kas.svg" alt="Arus Kas" />
          <p className='text-center font-semibold'>Yah, kamu belum pernah buat catatan arus kas nih. <span className='underline hover:cursor-pointer text-emerald-500 hover:text-emerald-700' onClick={ openModal } >Buat di sini</span></p>
        </div>
      ) }
    </div>
  )
}

export default Cashflow