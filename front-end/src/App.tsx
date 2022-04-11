import React, {useEffect} from 'react'
import './App.css'
import {useWebSocket} from './hooks/ApiHooks'
import BaseView from './views/base/BaseView'

const App: React.FC = () => {
  const {data} = useWebSocket()

  useEffect(() => {
    console.log('hei', data)
  }, [data])

  return (
    <div className="App">
      <BaseView />
    </div>
  )
}

export default App
