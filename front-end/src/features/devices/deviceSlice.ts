import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import deviceService from './deviceService'

interface IinitialState {
  devices: any
  isError: boolean
  isSuccess: boolean
  isLoading: boolean
  message: string
}

const initialState: IinitialState = {
  devices: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const getDevices = createAsyncThunk(
  'devices/getAll',
  async (_, thunkAPI) => {
    try {
      return await deviceService.getDevices()
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const deviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDevices.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getDevices.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.devices = action.payload
      })
      .addCase(getDevices.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload as string
      })
  },
})

export const {reset} = deviceSlice.actions
export default deviceSlice.reducer
