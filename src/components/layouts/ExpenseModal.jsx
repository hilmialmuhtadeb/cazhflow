import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import supabase from '../../config/supabase'
import { toast } from 'react-hot-toast'
import { NumericFormat } from 'react-number-format';
import { addItemToExpenses } from '../../store/slice/windowSlice';
import { useDispatch } from 'react-redux';

const ExpenseModal = (props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [isExpense, setIsExpense] = useState('')
  const [date, setDate] = useState('')
  const [category, setCategory] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    setIsOpen(props.isOpen)
  }, [props])

  function getNumber(amount) {
    const splitted = amount.split('.')
    splitted.shift()
    return splitted.join('')
  }

  async function handleSubmit() {
    const { window_id } = props || 0

    if (!amount || !description) {
      toast.error('Semua kolom harus diisi yaa :D')
      return
    }
    
    const { data, error } = await supabase
      .from('expenses')
      .insert([{ 
        window_id,
        category_id: category,
        amount: getNumber(amount) || 0,
        description,
        isExpense,
        date
      },
    ])

    if (error) {
      toast.error('Koneksi gagal, mohon ulangi beberapa saat lagi.')
      return
    }
  
    toast.success('Berhasil menambahkan catatan arus kas!')
    dispatch(addItemToExpenses(data))
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
                    Tambah Catatan Arus Kas
                  </Dialog.Title>
                  <div className="my-4">
                    <label className='my-2 block font-medium text-gray-600'>Deskripsi</label>
                    <input 
                      type="text"
                      className='w-full border border-gray-300 p-2 rounded-md'
                      placeholder="contoh: Nasi Goreng"
                      onKeyUp={handleKeyUp}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="my-4">
                    <label className='my-2 block font-medium text-gray-600'>Nominal</label>
                    <NumericFormat
                      className='w-full border border-gray-300 p-2 rounded-md'
                      thousandSeparator="."
                      decimalSeparator=','
                      prefix='Rp.'
                      allowNegative={ false }
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                  <div className="my-4">
                    <label className='my-2 block font-medium text-gray-600'>Tanggal</label>
                    <input 
                      type="date"
                      className='w-full border border-gray-300 p-2 rounded-md'
                      placeholder="contoh: Agustus 2022"
                      onKeyUp={handleKeyUp}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                  <div className="my-4">
                    <label className='my-2 block font-medium text-gray-600'>Kategori</label>
                    <select 
                      className='w-full border border-gray-300 p-2 rounded-md'
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="101">Umum</option>
                      <option value="102">Kebutuhan</option>
                      <option value="103">Keinginan</option>
                      <option value="104">Hobi</option>
                      <option value="105">Makan</option>
                      <option value="106">Jajan</option>
                      <option value="107">Investasi</option>
                      <option value="108">Hiburan</option>
                      <option value="109">Jalan-jalan</option>
                      <option value="201">Gaji</option>
                      <option value="202">Uang Saku</option>
                    </select>
                  </div>
                  <div className="mb-8">
                    <div className="my-2">
                      <input type="radio" name="isExpense" id='expense' value={true} onChange={(e) => setIsExpense(e.target.value)} />
                      <label className='mx-2 font-medium text-gray-600' for='expense'>Pengeluaran</label>
                    </div>
                    <div className="my-2">
                      <input type="radio" name="isExpense" id='income' value={false} onChange={(e) => setIsExpense(e.target.value)} />
                      <label className='mx-2 font-medium text-gray-600' for='income'>Pemasukan</label>
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-900 hover:bg-emerald-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                      onClick={handleSubmit}
                    >
                      Tambah
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

export default ExpenseModal