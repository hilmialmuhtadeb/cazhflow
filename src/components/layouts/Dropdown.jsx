import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setLoggedOut, setAuthUser } from '../../store/slice/authSlice'

const Dropdown = (props) => {
  const user = props.user
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function handleLogout () {
    dispatch(setAuthUser({}))
    dispatch(setLoggedOut())
    window.localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <div className="text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="w-full justify-center rounded-md px-4 py-2 underline decoration-wavy decoration-emerald-500">
            {user.name}
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
          <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className='group text-red-500 flex w-full items-center rounded-md px-2 py-2 text-sm'
                    onClick={handleLogout}
                  >
                    Keluar
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

export default Dropdown