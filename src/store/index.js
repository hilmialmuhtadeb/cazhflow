import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slice/authSlice'
import windowSlice from './slice/windowSlice'
import generalSlice from './slice/generalSlice'

export default configureStore({
  reducer: {
    auth: authSlice,
    window: windowSlice,
    general: generalSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})