import React, { Fragment, useState, useEffect } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { getCategoryName } from '../../utils/category'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
// import 'dayjs/locale/id'
// import * as dayjs from 'dayjs'
import { NumericFormat } from 'react-number-format'

const ExpenseCard = (props) => {
  const [expense, setExpense] = useState({})
  
  useEffect(() => {
    setExpense(props.expense)
  }, [props.expense])

  if (expense.id) {
    return (
      <div className='my-2 p-2 border-b'>
        <div className="flex text-sm font-medium text-gray-400 justify-between">
          <p className=''>{ getCategoryName(expense.category_id) }</p>
          {/* <p className=''>{ dayjs(expense.date).locale('id').format('DD MMMM YYYY') }</p> */}
          <p>{ expense.date }</p>
        </div>
        <p className='text-lg mb-2'>{ expense.description }</p>
        <div className="flex space-between">
          <NumericFormat
            disabled
            value={expense.amount}
            thousandSeparator='.'
            decimalSeparator=','
            prefix='Rp.'
            className={`grow bg-transparent ${expense.isExpense ? 'text-red-500' : 'text-emerald-500'}`}
          />
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
                    <button className='block w-full p-2 text-left' onClick={() => props.handleEditButton(expense)}>
                      Ubah
                    </button>
                  </Menu.Item>
                  <Menu.Item>
                    <button className='block w-full p-2 text-left' onClick={() => props.handleDeleteButton(expense)}>
                      Hapus
                    </button>
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    )
  }
}

export default ExpenseCard