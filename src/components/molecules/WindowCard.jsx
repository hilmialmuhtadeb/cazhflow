import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { NumericFormat } from 'react-number-format'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen, faArrowRight } from '@fortawesome/free-solid-svg-icons'

const WindowCard = (props) => {
  const [window, setWindow] = useState({})

  useEffect(() => {
    setWindow(props.window)
  }, [props.window])

  return (
    <div className="shadow relative bg-gray-100 border dark:border-gray-700 dark:bg-gray-700 rounded-md h-64">
      <div className="p-4">
        <h2 className="text-xl font-semibold">{ window.title }</h2>
        <p className='my-2 text-gray-500 dark:text-gray-400 line-clamp-3'>{ window.description }</p>
      </div>
      <div className="p-4 absolute bottom-0 w-full">
        <div>
          <table>
            <tbody>
              <tr>
                <td>
                  <p>Pengeluaran</p>
                </td>
                <td className='px-2'>
                  <NumericFormat
                    disabled
                    value={window.expenses}
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
                    value={window.incomes}
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
        <div className="flex justify-between my-2">
          <div className='flex'>
            <div className="text-sm py-2 px-3 box-border border border-2 border-gray-300 dark:border-gray-600 dark:text-gray-300 hover:text-white hover:bg-gray-500 text-gray-500 hover:cursor-pointer rounded" onClick={() => props.editButtonHandler(window)} >
              <FontAwesomeIcon icon={faPen} />
            </div>
            <div className="text-sm py-2 px-3 box-border border border-2 border-gray-300 dark:border-gray-600 dark:text-gray-300 hover:text-white hover:bg-gray-500 text-gray-500 hover:cursor-pointer rounded mx-2" onClick={() => props.deleteButtonHandler(window.id)} >
              <FontAwesomeIcon icon={faTrash} />
            </div>
          </div>
          <div className='w-1/2'>
            <Link to={'/cashflow/' + window.slug} className='block text-center bg-gray-500 hover:bg-gray-600 box-border py-2 text-white rounded' >
              <FontAwesomeIcon icon={faArrowRight} className='w-full' />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WindowCard