import React, {useEffect} from 'react'
import './App.css'
import {useWebSocket, useDevices} from './hooks/ApiHooks'
import BaseView from './views/base/BaseView'

const App: React.FC = () => {
  const {data} = useWebSocket()
  const {devices} = useDevices()

  useEffect(() => {
    console.log('hei', data)
    console.log('devices: ', devices)
  }, [data, devices])

  return (
    <div className="App">
      <BaseView />
    </div>
  )
}

export default App
