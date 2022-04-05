import React from 'react'
import './App.css'
import StatusComponent from './components/StatusComponent/StatusComponent'
import ChannelListComponent from './components/ChannelListComponent/ChannelListComponent'
import DeviceListComponent from './components/DeviceListComponent/DeviceListComponent'
import ChannelIcon from './assets/icons/channel_icon.svg'
import StatusRedIcon from './assets/icons/status_red.svg'

function App() {
  return (
    <div className="App">
      <StatusComponent></StatusComponent>
      <ChannelListComponent
        componentItems={{
          icon: ChannelIcon,
          label: 'Temperature',
        }}
      ></ChannelListComponent>
      <DeviceListComponent
        componentItems={{
          icon: StatusRedIcon,
          label: 'Raspberry Pi',
          info: 'Device is offline',
        }}
      ></DeviceListComponent>
    </div>
  )
}

export default App
