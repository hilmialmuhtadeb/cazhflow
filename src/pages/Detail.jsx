import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { NumericFormat } from 'react-number-format';
import ExpenseModal from '../components/layouts/ExpenseModal'
import DeleteModal from '../components/layouts/DeleteModal'
import ExpenseTable from '../components/molecules/ExpenseTable'
import { getWindowBySlug } from '../utils/handler/window'
import { getExpenses } from '../utils/handler/expense'
import { addItemToWindows, setActiveWindow, setExpenses } from '../store/slice/windowSlice'
import { setIsMobile } from '../store/slice/generalSlice';
import useWindowDimensions from '../utils/hook/useWindowDimensions';
import ExpenseCard from '../components/molecules/ExpenseCard';

const Detail = () => {
  const { slug } = useParams()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [editExpense, setEditExpense] = useState({})
  const [deleteExpense, setDeleteExpense] = useState({})
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { width } = useWindowDimensions()
  const expenses = useSelector(state => state.window.expenses)
  const windows = useSelector(state => state.window.windows)
  const window = useSelector(state => state.window.activeWindow)
  const user = useSelector(state => state.auth.authUser)
  const isMobile = useSelector(state => state.general.isMobile)

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

  function showExpenses () {
    if (isMobile) {
      return expenses.map(e => (
        <ExpenseCard 
          key={ e.description }
          expense={ e }
          handleEditButton={ handleEditButton }
          handleDeleteButton={ handleDeleteButton }
        />
    ))} else {
      return (
        <ExpenseTable
          expenses={ expenses }
          handleEditButton={ handleEditButton }
          handleDeleteButton={ handleDeleteButton }
        />
      )
    }
  }
  
  useEffect(() => {
    if (!user.username) {
      return navigate('/login')
    }
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
  }, [user])

  useEffect(() => {
    if (width < 768) {
      dispatch(setIsMobile(true))
    } else {
      dispatch(setIsMobile(false))
    }
  }, [width])
  
  if (!!window) {
      return (
      <div className='container'>
        <div className="my-4 sm:my-8">
          <h1 className='font-bold text-2xl my-2'>💰{ window.title }</h1>
          <p className='dark:text-gray-400'>{ window.description }</p>
        </div>
        <div className="my-4 sm:my-8 flex flex-col md:flex-row">
          <div className="rounded-lg border border-2 border-red-500 my-2 md:my-0 p-2 md:p-4">
            <p className='font-medium text-small'>Pengeluaran</p>
            <NumericFormat
              disabled
              value={ window.expenses }
              thousandSeparator='.'
              decimalSeparator=','
              prefix='Rp.'
              className='bg-transparent text-xl md:text-2xl my-2'
            />
          </div>
          <div className="rounded-lg border border-2 border-emerald-500 p-2 md:p-4 my-2 md:my-0 md:mx-4">
            <p className='font-medium text-small'>Pemasukan</p>
            <NumericFormat
              disabled
              value={ window.incomes }
              thousandSeparator='.'
              decimalSeparator=','
              prefix='Rp.'
              className='bg-transparent text-xl md:text-2xl my-2'
            />
          </div>
        </div>
        <div className="mt-8 flex justify-between items-center">
          <h2 className='font-semibold text-xl'>Catatan Arus Kas</h2>
          <button className='rounded-md text-white bg-emerald-500 hover:bg-emerald-600 font-medium text-sm py-2 px-4' onClick={ openModal }>
            + Catatan
          </button>
        </div>
        <div className="py-4">
          { showExpenses() }
        </div>
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