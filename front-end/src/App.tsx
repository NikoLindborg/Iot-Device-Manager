import React, {useEffect} from 'react'
import './App.css'
import StatusComponent from './components/StatusComponent/StatusComponent'
import ChannelListComponent from './components/ChannelListComponent/ChannelListComponent'
import DeviceListComponent from './components/DeviceListComponent/DeviceListComponent'
import ChannelIcon from './assets/icons/channel_icon.svg'
import StatusRedIcon from './assets/icons/status_red.svg'
import useWebSocket from './hooks/ApiHooks'
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
