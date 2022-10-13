import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import supabase from '../../config/supabase'
import { toast } from 'react-hot-toast'
import { addItemToWindows } from '../../store/slice/windowSlice'
import slugify from 'react-slugify';

const WindowModal = (props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const authUser = useSelector(state => state.auth.authUser)
  const dispatch = useDispatch()

  useEffect(() => {
    setIsOpen(props.isOpen)
  }, [props])

  async function handleSubmit() {
    const username = authUser.username
    const slug = slugify(`${title} ${Date.now()}`)
    
    if (!title || !username) {
      toast.error('Judul harus diisi yaa :D')
      return
    }
    
    const { data, error } = await supabase
      .from('windows')
      .insert([{ 
        username,
        slug,
        title,
        description
      },
    ])

    if (error) {
      toast.error('Koneksi gagal, mohon ulangi beberapa saat lagi.')
      return
    }
  
    toast.success('Berhasil membuat jendela arus kas baru!')
    dispatch(addItemToWindows(data))
    props.setIsModalOpen(false)
  }

  function closeModal() {
    props.setIsModalOpen(false)
  }

  function handleKeyUp (e) {
    if (e.key === 'Enter') {
      return handleSubmit()
    }
    return
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
                    Buat Jendela Arus Kas Baru
                  </Dialog.Title>
                  <div className="my-4">
                    <label className='my-2 block font-medium text-gray-600'>Judul Arus Kas</label>
                    <input 
                      type="text"
                      className='w-full border border-gray-300 p-2 rounded-md'
                      placeholder="contoh: Agustus 2022"
                      onKeyUp={handleKeyUp}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="my-4">
                    <label className='my-2 block font-medium text-gray-600'>Deskripsi <span className='text-sm font-normal'>(opsional)</span></label>
                    <textarea 
                      rows="5"
                      className='w-full border border-gray-300 resize-none p-2 rounded-md'
                      onKeyUp={handleKeyUp}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-900 hover:bg-emerald-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                      onClick={handleSubmit}
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

export default WindowModal