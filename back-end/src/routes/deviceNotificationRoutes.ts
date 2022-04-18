import { deleteDeviceNotification, getDeviceNotifications, setDeviceNotification } from './../controllers/deviceNotificationController';
import express from 'express'


export const router = express.Router()

router.route('/').get(getDeviceNotifications).post(setDeviceNotification)
router.route('/:id').delete(deleteDeviceNotification)
