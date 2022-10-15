import { createSlice } from '@reduxjs/toolkit'

export const windowSlice = createSlice({
  name: 'window',
  initialState: {
    windows: [],
    currentWindow: null,
    activeWindows: [],
    expenses: []
  },
  reducers: {
    setWindows: (state, payload) => {
      const windows = payload.payload
      state.windows = windows
    },
    addItemToWindows: (state, payload) => {
      const window = payload.payload
      state.windows = state.windows.concat(window)
    },
    addEditedItemToWindows: (state, payload) => {
      const window = payload.payload
      state.windows = state.windows.filter(w => w.id !== window.id).concat(window)
    },
    removeDeletedWindow: (state, payload) => {
      const id = payload.payload.id
      state.windows = state.windows.filter(w => w.id !== id)
    },
    // setCurrentWindow: (state, payload) => {
    //   const window = payload.payload
    //   state.currentWindow = window
    // },
    // setActiveWindows: (state, payload) => {
    //   const window = payload.payload
    //   state.activeWindows = state.activeWindows.concat(window)
    // },
    setExpenses: (state, payload) => {
      const expenses = payload.payload
      state.expenses = expenses
    },
    addItemToExpenses: (state, payload) => {
      const expense = payload.payload
      state.expenses = state.expenses.concat(expense)
    }
  },
})

export const {
  setWindows,
  addItemToWindows,
  addEditedItemToWindows,
  removeDeletedWindow,
  setActiveWindows,
  setExpenses,
  addItemToExpenses,
} = windowSlice.actions

export default windowSlice.reducer