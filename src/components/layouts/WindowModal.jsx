import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'
import { addEditedItemToWindows, addItemToWindows } from '../../store/slice/windowSlice'
import slugify from 'react-slugify';
import { addNewWindow, editWindow } from '../../utils/handler/window'
import { handleKeyUp } from '../../utils/shared'

const WindowModal = (props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isEdit, setIsEdit] = useState(false)
  const authUser = useSelector(state => state.auth.authUser)
  const dispatch = useDispatch()
  let window = props.editWindow

  function windowPayloadBuilder() {
    const username = authUser.username
    const payload = {
      username,
      slug: slugify(`${title} ${Date.now()}`),
      title,
      description
    }
    return payload
  }
  
  function handleSubmit() {
    const payload = windowPayloadBuilder()
    
    if (!title) {
      toast.error('Judul harus diisi yaa :D')
      return
    }

    if (window.id) {
      editWindow(payload, window.id)
        .then(res => {
          const {data, error} = res
          if (error) {
            toast.error('Koneksi gagal, mohon ulangi beberapa saat lagi.')
            return
          }
          toast.success('Berhasil mengubah data!')
          dispatch(addEditedItemToWindows(data))
          props.setIsWindowModalOpen(false)
        })
        return
    }
    
    addNewWindow(payload)
      .then(res => {
        const {data, error} = res
        if (error) {
          toast.error('Koneksi gagal, mohon ulangi beberapa saat lagi.')
          return
        }
        toast.success('Berhasil membuat jendela arus kas baru!')
        dispatch(addItemToWindows(data))
        props.setIsWindowModalOpen(false)
      })
  }
  
  function closeModal() {
    props.setIsWindowModalOpen(false)
  }

  useEffect(() => {
    setIsOpen(props.isOpen)
    setTitle(window.title)
    setDescription(window.description)
    if (props.editWindow.id) {
      setIsEdit(true)
    }
    return () => {
      setIsEdit(false)
      setTitle('')
      setDescription('')
    }
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
                    className="text-xl font-medium leading-6 text-gray-900"
                  >
                    { isEdit ? 'Ubah Jendela Arus Kas' : 'Buat Jendela Arus Kas Baru' }
                  </Dialog.Title>
                  <div className="my-4">
                    <label className='my-2 block font-medium text-gray-600'>Judul Arus Kas</label>
                    <input 
                      type="text"
                      className='w-full border border-gray-300 p-2 rounded-md'
                      placeholder="contoh: Agustus 2022"
                      onKeyUp={(e) => handleKeyUp(e, handleSubmit)}
                      onChange={(e) => setTitle(e.target.value)}
                      value={ title }
                    />
                  </div>
                  <div className="my-4">
                    <label className='my-2 block font-medium text-gray-600'>Deskripsi <span className='text-sm font-normal'>(opsional)</span></label>
                    <textarea 
                      rows="5"
                      className='w-full border border-gray-300 resize-none p-2 rounded-md'
                      onKeyUp={(e) => handleKeyUp(e, handleSubmit)}
                      onChange={(e) => setDescription(e.target.value)}
                      value={ description }
                    ></textarea>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-900 hover:bg-emerald-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                      onClick={handleSubmit}
                    >
                      { isEdit ? 'Ubah' : 'Buat' }
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

export default WindowModal