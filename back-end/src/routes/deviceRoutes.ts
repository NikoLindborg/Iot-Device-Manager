import express from 'express'
import {
  getDevices,
  setDevice,
  updateDevice,
  deleteDevice,
  getDevice,
} from '../controllers/deviceController'

export const router = express.Router()

router.route('/').get(getDevices).post(setDevice)
router.route('/:id').delete(deleteDevice).put(updateDevice).get(getDevice)
