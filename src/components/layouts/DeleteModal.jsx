import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { removeDeletedWindow } from '../../store/slice/windowSlice'
import { deleteWindow } from '../../utils/handler/window'

const DeleteModal = (props) => {
  const [isOpen, setIsOpen] = useState(true)
  const [windowId, setWindowId] = useState(0)
  const dispatch = useDispatch()

  function handleDelete (id) {
    deleteWindow(id)
      .then(res => {
        const { data, error } = res
        if (error) {
          toast.error('Gagal menghapus jendela arus kas')
        }
        toast.success('Berhasil menghapus jendela arus kas')
        dispatch(removeDeletedWindow(id))
        props.setIsDeleteModalOpen(false)
      })

  }

  function closeModal() {
    props.setIsDeleteModalOpen(false)
  }

  useEffect(() => {
    setIsOpen(props.isOpen)
    setWindowId(props.deleteWindow)
  }, [props])

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
                    Yakin ingin menghapus Jendela Arus Kas?
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Jendela Arus Kas yang sudah dihapus tidak dapat dipulihkan. Sebagai gantinya anda dapat membuat ulang Jendela Arus Kas jika sudah terhapus.
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={() => handleDelete(windowId)}
                    >
                      Hapus
                    </button>
                    <button
                      type="button"
                      className="mx-2 inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium hover:bg-gray-100"
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