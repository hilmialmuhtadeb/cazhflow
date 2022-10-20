import { createSlice } from '@reduxjs/toolkit'

export const generalSlice = createSlice({
  name: 'general',
  initialState: {
    isMobile: false,
  },
  reducers: {
    setIsMobile: (state, payload) => {
      state.isMobile = payload.payload
    }
  },
})

export const { setIsMobile } = generalSlice.actions

export default generalSlice.reducer