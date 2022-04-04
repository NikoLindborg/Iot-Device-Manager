import React, {useEffect, useState} from 'react'
import './App.css'
import {MqttClient} from 'mqtt'
import {StatusComponent} from './components/StatusComponent/StatusComponent'

function App() {
  return (
    <div className="App">
      <StatusComponent></StatusComponent>
    </div>
  )
}

export default App
