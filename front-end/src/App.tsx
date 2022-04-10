import React, {useEffect} from 'react'
import './App.css'
import useWebSocket from './hooks/ApiHooks'
import BaseView from './views/base/BaseView'
import {useDispatch, useSelector, RootStateOrAny} from 'react-redux'
import {getDevices, reset} from './features/devices/deviceSlice'

const App: React.FC = () => {
  const dispatch = useDispatch()
  const {data} = useWebSocket()

  const {devices, isError, message} = useSelector(
    (state: RootStateOrAny) => state.devices
  )

  useEffect(() => {
    console.log('hei', data)
  }, [data])

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    dispatch(getDevices())

    return () => {
      dispatch(reset())
    }
  }, [isError, message, dispatch])

  console.log('Devices from MongoDB: ', devices)

  return (
    <div className="App">
      <BaseView />
    </div>
  )
}

export default App
