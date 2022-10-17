import { createSlice } from '@reduxjs/toolkit'

export const windowSlice = createSlice({
  name: 'window',
  initialState: {
    windows: [],
    currentWindow: null,
    activeWindow: [],
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
    setActiveWindow: (state, payload) => {
      const window = payload.payload
      state.activeWindow = window
    },
    setExpenses: (state, payload) => {
      const expenses = payload.payload
      state.expenses = expenses
    },
    addItemToExpenses: (state, payload) => {
      const expense = payload.payload
      state.expenses = state.expenses.concat(expense)
    },
    addEditedItemToExpenses: (state, payload) => {
      const expense = payload.payload
      state.expenses = state.expenses.filter(e => e.id !== expense.id).concat(expense)
    },
    removeDeletedExpense: (state, payload) => {
      const id = payload.payload
      state.expenses = state.expenses.filter(e => e.id !== id)
    }
  },
})

export const {
  setWindows,
  addItemToWindows,
  addEditedItemToWindows,
  removeDeletedWindow,
  setActiveWindow,
  setExpenses,
  addItemToExpenses,
  addEditedItemToExpenses,
  removeDeletedExpense
} = windowSlice.actions

export default windowSlice.reducer