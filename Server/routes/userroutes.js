 const { logiController,registrationController , authctrl, applyDoctorController, getAllnotificationController, deleteAllController, getAllDoctorController} = require("../controllers/userCtrl");
  const authmiddleware= require('../middlewares/authmiddlewares');

 const express= require('express');

 const router= express.Router();


 router.post('/login', logiController);
 router.post('/register', registrationController);
 router.post('/getUserData', authmiddleware, authctrl);

 router.post("/apply-doctor", authmiddleware, applyDoctorController);

router.post("/get-all-notification", authmiddleware, getAllnotificationController);
router.post("/delete-all-notification", authmiddleware, deleteAllController);
router.get("/getAllDoctors", authmiddleware, getAllDoctorController);


// post account statys
 module.exports= router;



