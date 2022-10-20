import React, { Fragment, useEffect, useState } from 'react'
import { NumericFormat } from 'react-number-format'
import { Menu, Transition } from '@headlessui/react'
// import 'dayjs/locale/id'
// import * as dayjs from 'dayjs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { getCategoryName } from '../../utils/category'

const ExpenseTable = (props) => {
  const [expenses, setExpenses] = useState([])
  
  useEffect(() => {
    setExpenses(props.expenses)
  }, [props.expenses])
  
  return (
    <div className="py-8">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6" width="30%">Deskripsi</th>
            <th scope="col" className="py-3 px-6" width="15%">Nominal</th>
            <th scope="col" className="py-3 px-6 text-center">Kategori</th>
            <th scope="col" className="py-3 px-6 text-center">Tanggal</th>
            <th scope="col" className="py-3 px-6 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          { expenses.map((exp, i) => (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={i}>
              <th scope="row" className="py-4 px-6 font-medium text-gray-900 dark:text-white">{ exp.description }</th>
              <th className={ `py-4 px-6 font-medium ${exp.isExpense ? 'text-red-500' : 'text-emerald-500'}` } >
                <NumericFormat
                  disabled
                  value={exp.amount}
                  thousandSeparator='.'
                  decimalSeparator=','
                  prefix='Rp.'
                  className='bg-transparent'
                />
              </th>
              <td className="py-4 px-6 text-center">{ getCategoryName(exp.category_id) }</td>
              {/* <td className="py-4 px-6 text-center">{ dayjs(exp.date).locale('id').format('DD MMMM YYYY') }</td> */}
              <td className="py-4 px-6 text-center">{ exp.date }</td>
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
                          <button className='block w-full p-2 text-left' onClick={() => props.handleEditButton(exp)}>
                            Ubah
                          </button>
                        </Menu.Item>
                        <Menu.Item>
                          <button className='block w-full p-2 text-left' onClick={() => props.handleDeleteButton(exp)}>
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
} 

export default ExpenseTable