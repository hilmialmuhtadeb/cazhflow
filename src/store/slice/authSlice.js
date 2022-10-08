import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLogin: false,
    authUser: {}
  },
  reducers: {
    setLoggedIn: (state) => {
      state.isLogin = true
    },
    setLoggedOut: (state) => {
      state.isLogin = false
    },
    setAuthUser: (state, payload) => {
      const user = payload.payload
      state.authUser = user
    }
  },
})

export const { setLoggedIn, setLoggedOut, setAuthUser } = authSlice.actions

export default authSlice.reducer