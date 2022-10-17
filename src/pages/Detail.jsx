import React, { Fragment, useRef, useEffect, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ExpenseModal from '../components/layouts/ExpenseModal'
import { addItemToWindows, setActiveWindow, setExpenses } from '../store/slice/windowSlice'
import { NumericFormat } from 'react-number-format';
import { getExpenses, getWindowBySlug } from '../utils/handler/window'
import { getCategoryName } from '../utils/category'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import 'dayjs/locale/id'
import * as dayjs from 'dayjs'
import DeleteModal from '../components/layouts/DeleteModal'

const Detail = () => {
  const { slug } = useParams()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editExpense, setEditExpense] = useState({})
  const dispatch = useDispatch()
  const expenses = useSelector(state => state.window.expenses)
  const windows = useSelector(state => state.window.windows)
  const window = useSelector(state => state.window.activeWindow)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [deleteExpense, setDeleteExpense] = useState({})

  function openModal () {
    setEditExpense({})
    setIsModalOpen(true)
  }

  function handleEditButton (expense) {
    setEditExpense(expense)
    setIsModalOpen(true)
  }

  function handleDeleteButton (expense) {
    setDeleteExpense(expense)
    setIsDeleteModalOpen(true)
  }
  
  useEffect(() => {
    const activeWindow = windows.find(w => w.slug === slug) || null
    if (activeWindow) {
      dispatch(setActiveWindow(activeWindow))
      getExpenses(activeWindow.id)
      .then(res => dispatch(setExpenses(res.data)))
    } else {
      getWindowBySlug(slug)
        .then(({ data, error}) => {
          dispatch(setActiveWindow(data))
          dispatch(addItemToWindows(data))
          getExpenses(data.id)
            .then(res => dispatch(setExpenses(res.data)))
        })
      }
  }, [])
    
  // useEffect(() => {
  //   const window_id = window?.id || 0
  //   getExpenses(window_id)
  //     .then(({ data, err }) => {
  //       dispatch(setExpenses(data))
  //     })
  // }, [window])
    
  function showExpenses () {
    if (expenses.length > 0) {
      return (
        <div className="py-8">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="py-3 px-6" width="30%">
                        Deskripsi
                    </th>
                    <th scope="col" className="py-3 px-6" width="15%">
                        Nominal
                    </th>
                    <th scope="col" className="py-3 px-6 text-center">
                        Kategori
                    </th>
                    <th scope="col" className="py-3 px-6 text-center">
                        Tanggal
                    </th>
                    <th scope="col" className="py-3 px-6 text-center">
                        Aksi
                    </th>
                </tr>
            </thead>
            <tbody>
                { expenses.map((exp, i) => (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={i}>
                      <th scope="row" className="py-4 px-6 font-medium text-gray-900 dark:text-white">
                          { exp.description }
                      </th>
                      <th
                        className={ 
                          `py-4 px-6 font-medium ${exp.isExpense ? 'text-red-500' : 'text-emerald-500'}`
                        }
                      >
                        <NumericFormat
                          disabled
                          value={exp.amount}
                          thousandSeparator='.'
                          decimalSeparator=','
                          prefix='Rp.'
                          className='bg-transparent'
                        />
                      </th>
                      <td className="py-4 px-6 text-center">
                        { getCategoryName(exp.category_id) }
                      </td>
                      <td className="py-4 px-6 text-center">
                        { dayjs(exp.date).locale('id').format('DD MMMM YYYY') }
                      </td>
                      <td className="py-4 px-6 text-center">
                        <Menu as="div" className="relative inline-block">
                          <div>
                            <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30">
                              <FontAwesomeIcon icon={faEllipsisVertical} />
                            </Menu.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute right-0 mt-2 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                              <div className="px-1 py-1">
                                <Menu.Item>
                                  <button className='block w-full p-2 text-left' onClick={() => handleEditButton(exp)}>
                                    Ubah
                                  </button>
                                </Menu.Item>
                                <Menu.Item>
                                  <button className='block w-full p-2 text-left' onClick={() => handleDeleteButton(exp)}>
                                    Hapus
                                  </button>
                                </Menu.Item>
                              </div>
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </td>
                  </tr>
                )) }
            </tbody>
          </table>
        </div>
      )
    } else {
      return (
        <div className='py-12 text-center'>
          <img className='mx-auto' src="../src/assets/expenses.svg" alt="pengeluaran" />
          <p className='font-medium my-4'>Catatan arus kas masih kosong.</p>
        </div>
      )
    }
  }
  
  if (!!window) {
      return (
      <div className='container'>
        <div className="my-8">
          <h1 className='font-bold text-2xl my-2'>💰{ window.title }</h1>
          <p>{ window.description }</p>
        </div>
        <div className="my-8 flex">
          <div className="rounded-xl border border-2 border-red-500 p-4">
            <p className='font-medium'>Pengeluaran</p>
            <NumericFormat
              disabled
              value={window.expenses}
              thousandSeparator='.'
              decimalSeparator=','
              prefix='Rp.'
              className='bg-transparent text-2xl my-2'
            />
          </div>
          <div className="rounded-xl border border-2 border-emerald-500 p-4 mx-4">
            <p className='font-medium'>Pemasukan</p>
            <NumericFormat
              disabled
              value={window.incomes}
              thousandSeparator='.'
              decimalSeparator=','
              prefix='Rp.'
              className='bg-transparent text-2xl my-2'
            />
          </div>
        </div>
        <div className="mt-8 flex justify-between items-center">
          <h2 className='font-semibold text-xl'>Catatan Arus Kas</h2>
          <button
            className='rounded-md text-white bg-emerald-500 hover:bg-emerald-600 font-medium text-sm py-2 px-4'
            onClick={openModal}
          >
            + Catatan
          </button>
        </div>
        { showExpenses() }
        <ExpenseModal
          setIsModalOpen={ setIsModalOpen }
          isOpen={ isModalOpen }
          window={ window }
          editExpense={ editExpense }
        />
        <DeleteModal expense={ deleteExpense } window={ window } setIsDeleteModalOpen={setIsDeleteModalOpen} isOpen={isDeleteModalOpen} />
      </div>
    )
  }
  
  return (
    <p>loading</p>
  )
}

export default Detail