import {configureStore} from '@reduxjs/toolkit'
import deviceReducer from '../features/devices/deviceSlice'

export const store = configureStore({
  reducer: {
    devices: deviceReducer,
  },
})
