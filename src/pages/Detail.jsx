import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ExpenseModal from '../components/layouts/ExpenseModal'
import { setExpenses } from '../store/slice/windowSlice'
import { NumericFormat } from 'react-number-format';
import { getExpenses, getWindowBySlug } from '../utils/handler/window'

const Detail = () => {
  const { slug } = useParams()
  const [window, setWindow] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const dispatch = useDispatch()
  const expenses = useSelector(state => state.window.expenses)

  function openModal () {
    setIsModalOpen(true)
  }
  
  useEffect(() => {
    getWindowBySlug(slug)
      .then(({ data, error}) => {
        setWindow(data)
      })
  }, [])
    
  useEffect(() => {
    const window_id = window?.id || 0
    getExpenses(window_id)
      .then(({ data, err }) => {
        dispatch(setExpenses(data))
      })
  }, [window])
    
  function showExpenses () {
    if (!!expenses) {
      return (
        <div className="py-8">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="py-3 px-6" width="40%">
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
                          { exp.category_id }
                      </td>
                      <td className="py-4 px-6 text-center">
                          { exp.date }
                      </td>
                      <td className="py-4 px-6 text-center">
                      <button
                        className='rounded-md text-white bg-orange-500 font-medium text-xs py-1 px-2'
                        onClick={openModal}
                      >
                        Ubah
                      </button>
                      </td>
                  </tr>
                )) }
            </tbody>
          </table>
        </div>
      )
    } else {
      return (
        <p>Loading</p>
      )
    }
  }
  
  if (!!window) {
      return (
      <div className='container'>
        <div className="my-8">
          <h1 className='font-bold text-2xl'>💰{ window.title }</h1>
          <p>{ window.description }</p>
        </div>
        <div className="my-8">
          <p>Pengeluaran : <span className='font-medium text-red-500'>{ window.expenses } Rupiah</span></p>
          <p>Pemasukan : <span className='font-medium text-emerald-500'>{ window.incomes } Rupiah</span></p>
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
          window_id={window.id}
        />
      </div>
    )
  }
  
  return (
    <p>loading</p>
  )
}

export default Detail