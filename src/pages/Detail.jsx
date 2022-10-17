import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { NumericFormat } from 'react-number-format';
import ExpenseModal from '../components/layouts/ExpenseModal'
import DeleteModal from '../components/layouts/DeleteModal'
import ExpenseTable from '../components/molecules/ExpenseTable'
import { getWindowBySlug } from '../utils/handler/window'
import { getExpenses } from '../utils/handler/expense'
import { addItemToWindows, setActiveWindow, setExpenses } from '../store/slice/windowSlice'

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
              value={ window.expenses }
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
              value={ window.incomes }
              thousandSeparator='.'
              decimalSeparator=','
              prefix='Rp.'
              className='bg-transparent text-2xl my-2'
            />
          </div>
        </div>
        <div className="mt-8 flex justify-between items-center">
          <h2 className='font-semibold text-xl'>Catatan Arus Kas</h2>
          <button className='rounded-md text-white bg-emerald-500 hover:bg-emerald-600 font-medium text-sm py-2 px-4' onClick={ openModal }>
            + Catatan
          </button>
        </div>
        <ExpenseTable
          expenses={ expenses }
          handleEditButton={ handleEditButton }
          handleDeleteButton={ handleDeleteButton }
        />
        <ExpenseModal
          setIsModalOpen={ setIsModalOpen }
          isOpen={ isModalOpen }
          window={ window }
          editExpense={ editExpense }
        />
        <DeleteModal
          setIsDeleteModalOpen={ setIsDeleteModalOpen }
          isOpen={ isDeleteModalOpen }
          expense={ deleteExpense }
          window={ window }
        />
      </div>
    )
  }
  
  return (
    <p>loading</p>
  )
}

export default Detail