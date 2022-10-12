import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'

export default function MyModal(props) {
  let [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(props.isOpen)
  }, [props])

  function closeModal() {
    props.setIsModalOpen(false)
  }

  function handleKeyUp () {

  }

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
                    className="text-xl font-medium leading-6 text-gray-900"
                  >
                    Buat Catatan Arus Kas
                  </Dialog.Title>
                  <div className="relative my-4">
                    <label className='my-2 block font-medium text-gray-600'>Judul Arus Kas</label>
                    <input type="text" className='w-full border border-gray-300 p-2 rounded-md' placeholder="contoh: Agustus 2022" onKeyUp={handleKeyUp} />
                  </div>
                  <div className="relative my-4">
                    <label className='my-2 block font-medium text-gray-600'>Deskripsi <span className='text-sm font-normal'>(opsional)</span></label>
                    <textarea rows="5" className='w-full border border-gray-300 resize-none p-2 rounded-md'></textarea>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Buat
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
