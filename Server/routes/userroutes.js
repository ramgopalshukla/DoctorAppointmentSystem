 const { logiController,registrationController , authctrl, applyDoctorController, getAllnotificationController} = require("../controllers/userCtrl");
  const authmiddleware= require('../middlewares/authmiddlewares')

 const express= require('express')

 const router= express.Router();


 router.post('/login', logiController)
 router.post('/register', registrationController)
 router.post('/getUserData', authmiddleware, authctrl)

 router.post("/apply-doctor", authmiddleware, applyDoctorController)

router.post("/get-all-notofication", authmiddleware, getAllnotificationController)
 module.exports= router



