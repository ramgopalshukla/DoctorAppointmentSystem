 const { logiController,registrationController , authctrl} = require("../controllers/userCtrl");
  const authmiddleware= require('../middlewares/authmiddlewares')

 const express= require('express')

 const router= express.Router();


 router.post('/login', logiController)
 router.post('/register', registrationController)
 router.post('/getUserData', authmiddleware, authctrl)


 module.exports= router



