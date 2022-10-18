import { Fragment, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Dialog, Transition } from '@headlessui/react'
import { deleteExpense } from '../../utils/handler/expense'
import { deleteWindow } from '../../utils/handler/window'
import {
  addEditedItemToWindows,
  removeDeletedExpense,
  removeDeletedWindow,
  setActiveWindow
} from '../../store/slice/windowSlice'
import toast from 'react-hot-toast'

const DeleteModal = (props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isDeleteExpense, setIsDeleteExpense] = useState(false)
  const dispatch = useDispatch()

  function getNewAmount (expense) {
    if (expense.isExpense === true) {
      return {
        type: 'expenses',
        expenses: props.window.expenses - expense.amount,
      }
    } else {
      return {
        type: 'incomes',
        incomes: props.window.incomes - expense.amount,
      }
    }
  }

  function getNewWindow (expense) {
    const newAmount = getNewAmount(expense)
    const { type } = newAmount
    return {
      ...props.window,
      [type]: newAmount[type],
    }
  }

  function deleteHandler () {
    if (isDeleteExpense) {
      const newAmount = getNewAmount(props.expense)
      deleteExpense(props.expense, newAmount)
        .then(res => {
          const { data, error } = res
          if (error) {
            toast.error('Gagal menghapus data')
            return
          }
          toast.success('Berhasil menghapus data')
          const newWindow = getNewWindow(props.expense)
          dispatch(removeDeletedExpense(data.id))
          dispatch(addEditedItemToWindows(newWindow))
          dispatch(setActiveWindow(newWindow))
          return closeModal()
        })
      return
    }

    deleteWindow(props.id)
      .then(res => {
        const {data, error} = res
        if (error) {
          toast.error('Koneksi gagal, mohon ulangi beberapa saat lagi.')
          return
        }
        toast.success('Berhasil menghapus jendela arus kas!')
        dispatch(removeDeletedWindow(data))
        return closeModal()
      })
  }

  function closeModal() {
    props.setIsDeleteModalOpen(false)
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  useEffect(() => {
    if (props.isOpen) {
      openModal()
    }
    if (props.expense) {
      setIsDeleteExpense(true)
    }
    return () => {
      setIsDeleteExpense(false)
    }
  }, [props.isOpen, props.exp])


  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Yakin ingin menghapus?
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      { !isDeleteExpense && 'Catatan Arus Kas yang dihapus tidak dapat dipulihkan' }
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 hover:border-red-500"
                      onClick={deleteHandler}
                    >
                      Hapus
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border-2 border-transparent bg-gray-100 px-4 py-2 text-sm font-medium hover:bg-gray-200 mx-2 hover:border-gray-500"
                      onClick={closeModal}
                    >
                      Batal
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default DeleteModal