import { createSlice } from '@reduxjs/toolkit'

export const windowSlice = createSlice({
  name: 'window',
  initialState: {
    windows: []
  },
  reducers: {
    setWindows: (state, payload) => {
      const windows = payload.payload
      state.windows = windows
    }
  },
})

export const { setWindows } = windowSlice.actions

export default windowSlice.reducer