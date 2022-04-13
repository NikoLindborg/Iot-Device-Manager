import React from 'react'
import DetailsView from '../views/details/DetailsView'
import {useParams} from 'react-router-dom'

function DeviceDetails() {
  const params = useParams()
  return <DetailsView id={params.deviceId} />
}

export default DeviceDetails
