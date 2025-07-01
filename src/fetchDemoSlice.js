import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  apiData: null,
}

export const fetchData = createAsyncThunk('data/fetch', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/1')
  return response.json()
})

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
  //
  extraReducers: builder => {
    builder
      .addCase(fetchData.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.apiData = action.payload
      })
      .addCase(fetchData.rejected, state => {
        state.status = 'failed'
      })
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer
