import React, { useEffect, useState } from 'react'
import './App.css'
import { MqttClient } from 'mqtt'
import StatusComponent from './components/StatusComponent/StatusComponent'
import ChannelListComponent from './components/ChannelListComponent/ChannelListComponent'
import DeviceListComponent from './components/DeviceListComponent/DeviceListComponent'

const iconPath = process.env.PUBLIC_URL + '/icons/'

function App() {
  return (
    <div className="App">
      <StatusComponent></StatusComponent>
      <ChannelListComponent
        componentItems={{
          icon: `${iconPath}channel_icon.svg`,
          label: 'Temperature',
        }}
      ></ChannelListComponent>
      <DeviceListComponent
        componentItems={{
          icon: `${iconPath}status_red.svg`,
          label: 'Raspberry Pi',
          info: 'Device is offline',
        }}
      ></DeviceListComponent>
    </div>
  )
}

export default App
