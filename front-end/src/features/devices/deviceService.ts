import axios from 'axios'

const API_URL = 'http://localhost:3001/api/devices'

/** Returns a list of devices from MongoDB */
const getDevices = async () => {
  try {
    const response = await axios.get(API_URL)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

const deviceService = {
  getDevices,
}

export default deviceService
