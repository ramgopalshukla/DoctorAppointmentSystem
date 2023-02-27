
const express= require('express')
const {getDoctorController, updateProfileController, getDoctorByIdController, doctorAppointmentController} = require('../controllers/doctorcontroller');
const authenticate = require('../middlewares/authmiddlewares');
const router= express.Router()

router.post('/getDoctorInfo', authenticate, getDoctorController )
router.post('/updateProfile', authenticate, updateProfileController )

// GET SINGLEDOC INFO

router.post('/getDoctorById', authenticate, getDoctorByIdController)

router.get("/doctor-appointments", authenticate, doctorAppointmentController)

module.exports= router;