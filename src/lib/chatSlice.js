import { createSlice } from '@reduxjs/toolkit'

const chatSlice = createSlice({
  name: 'chats',
  initialState: [],
  reducers: {
    chatAdded(state, action) {
      state.push({
        id: action.payload.id,
        cuurent : true,
      })
    },
  }
})

export const { chatAdded } = chatSlice.actions
export default chatSlice.reducer