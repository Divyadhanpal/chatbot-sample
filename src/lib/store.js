import { configureStore } from '@reduxjs/toolkit'
import chatSlice from './chatSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {chatSlice}
  })
}