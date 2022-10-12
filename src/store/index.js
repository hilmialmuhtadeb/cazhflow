import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slice/authSlice'
import windowSlice from './slice/windowSlice'

export default configureStore({
  reducer: {
    auth: authSlice,
    window: windowSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})