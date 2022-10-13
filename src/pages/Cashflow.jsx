import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import supabase from '../config/supabase'
import { setWindows } from '../store/slice/windowSlice'
import WindowModal from '../components/layouts/WindowModal'

const Cashflow = () => {
  const authUser = useSelector(state => state.auth.authUser)
  const windows = useSelector(state => state.window.windows)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false)

  function openModal () {
    setIsModalOpen(true)
  }

  function showWindows () {
    if (windows.length > 0) {
      return (
        <div className="py-4 grid grid-cols-2 gap-4">
          { windows.map(w => (
            <Link to={'/cashflow/' + w.slug} key={w.id} >
              <div className="shadow-xl relative bg-gray-200 border dark:border-gray-700 dark:bg-gray-700 rounded-2xl h-64 p-4">
                <h2 className="text-xl font-semibold">{ w.title }</h2>
                <p className='my-2 text-gray-500 dark:text-gray-400 line-clamp-4'>{ w.description }</p>
                <div className="my-2 absolute bottom-0">
                  <table>
                    <tr>
                      <td className='p-2'>
                        <p>Pengeluaran</p>
                        <p>Pemasukan</p>
                      </td>
                      <td className='p-2'>
                        <p className="text-red-500 font-semibold"> Rp. { w.expenses }</p>
                        <p className="text-emerald-700 dark:text-emerald-500 font-semibold"> Rp. { w.incomes }</p>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </Link>
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

  async function getWindows (username) {
    const { data: windows, error } = await supabase
      .from('windows')
      .select()
      .eq('username', username)
      
    dispatch(setWindows(windows))
  }
  
  useEffect(() => {
    const strUser = window.localStorage.getItem('user')
    if (!strUser) {
      return navigate('/welcome')
    }
    const user = JSON.parse(strUser) || {}
    getWindows(user.username)
  }, [])

  useEffect(() => {
    showWindows()
  }, [windows])
  
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
        <WindowModal setIsModalOpen={setIsModalOpen} isOpen={isModalOpen} />
      </div>
      { showWindows() }
    </div>
  )
}

export default Cashflow