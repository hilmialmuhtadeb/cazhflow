import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setWindows } from '../store/slice/windowSlice'
import WindowModal from '../components/layouts/WindowModal'
import { getAllWindows } from '../utils/handler/window'
import { NumericFormat } from 'react-number-format'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import DeleteModal from '../components/layouts/DeleteModal'

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
  
  function showWindows () {
    if (windows.length > 0) {
      return (
        <div className="py-4 grid grid-cols-2 gap-x-4 gap-y-6">
          { windows.map(w => (
            <div key={w.id} className="shadow relative bg-gray-100 border dark:border-gray-700 dark:bg-gray-700 rounded-md h-64">
              <div className="p-4">
                <h2 className="text-xl font-semibold">{ w.title }</h2>
                <p className='my-2 text-gray-500 dark:text-gray-400 line-clamp-4'>{ w.description }</p>
              </div>
              <div className="p-4 absolute bottom-0 flex items-center w-full">
                <div className="w-1/2">
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <p>Pengeluaran</p>
                        </td>
                        <td className='px-2'>
                          <NumericFormat
                            disabled
                            value={w.expenses}
                            thousandSeparator='.'
                            decimalSeparator=','
                            prefix='Rp.'
                            className='bg-transparent text-red-500 font-bold'
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p>Pemasukan</p>
                        </td>
                        <td className='px-2'>
                          <NumericFormat
                            disabled
                            value={w.incomes}
                            thousandSeparator='.'
                            decimalSeparator=','
                            prefix='Rp.'
                            className='bg-transparent text-emerald-700 dark:text-emerald-500 font-bold'
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className='flex pl-2 justify-end w-1/2'>
                  <Link to={'/cashflow/' + w.slug} className='grow text-center bg-blue-500 hover:bg-blue-600 box-border text-white py-2 px-3 rounded' >
                    <FontAwesomeIcon icon={faArrowRight} />
                  </Link>
                  <div className="py-2 px-3 box-border border border-2 border-yellow-500 text-yellow-500 hover:text-white hover:bg-yellow-500 hover:cursor-pointer rounded mx-2" onClick={() => editButtonHandler(w)} >
                    <FontAwesomeIcon icon={faPen} />
                  </div>
                  <div className="py-2 px-3 box-border border border-2 border-red-500 text-red-500 hover:text-white hover:bg-red-500 hover:cursor-pointer rounded" onClick={() => deleteButtonHandler(w.id)} >
                    <FontAwesomeIcon icon={faTrash} />
                  </div>
                </div>
              </div>
            </div>
          )) }
        </div>
      )
    }
    return (
      <div className='py-12 '>
        <img className='mx-auto mb-6' src="./src/assets/arus-kas.svg" alt="Arus Kas" />
        <p className='text-center font-semibold'>Yah, kamu belum pernah buat catatan arus kas nih. <span className='underline hover:cursor-pointer text-emerald-500 hover:text-emerald-700' onClick={openModal} >Buat di sini</span></p>
      </div>
    )
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
        <WindowModal editWindow={editWindow} setIsWindowModalOpen={setIsWindowModalOpen} isOpen={isWindowModalOpen} />
        <DeleteModal id={idWindowDelete} setIsDeleteModalOpen={setIsDeleteModalOpen} isOpen={isDeleteModalOpen} />
      </div>
      { showWindows() }
    </div>
  )
}

export default Cashflow