
const express= require('express')
const {getDoctorController, updateProfileController} = require('../controllers/doctorcontroller');
const authenticate = require('../middlewares/authmiddlewares');
const router= express.Router()

router.post('/getDoctorInfo', authenticate, getDoctorController )
router.post('/updateProfile', authenticate, updateProfileController )

module.exports= router;