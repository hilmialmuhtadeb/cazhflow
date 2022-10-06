import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLogin: false,
  },
  reducers: {
    setLoggedIn: (state) => {
      state.isLogin = true
    },
    setLoggedOut: (state) => {
      state.isLogin = false
    }
  },
})

export const { setLoggedIn, setLoggedOut } = authSlice.actions

export default authSlice.reducer