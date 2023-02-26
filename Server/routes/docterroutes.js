
const express= require('express')
const {getDoctorController, updateProfileController, getDoctorByIdController} = require('../controllers/doctorcontroller');
const authenticate = require('../middlewares/authmiddlewares');
const router= express.Router()

router.post('/getDoctorInfo', authenticate, getDoctorController )
router.post('/updateProfile', authenticate, updateProfileController )

// GET SINGLEDOC INFO

router.post('/getDoctorById', authenticate, getDoctorByIdController)

module.exports= router;