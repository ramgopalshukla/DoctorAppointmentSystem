const doctorModel = require("../models/doctorModel");

const getDoctorController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "doctor data fetch success",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Fething Doctor Details",
    });
  }
};

const updateProfileController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOneAndUpdate(
      {
        userId: req.body.userId,
      },
      req.body
    );

    res.status(201).send({
      success: true,
      message: "Doctor Profile Updated",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Doctor Profile Update issue",
      error,
    });
  }
};

const getDoctorByIdController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ _id:req.body.doctorId });

    res.status(200).send({
      success: true,
      message: "git single doctor",
      data: doctor,
    });
  } catch (error) {
    error,
      res.status(500).send({
        success: false,
        message: "not getting single docto information",
        error,
      });
  }
};

const doctorAppointmentController= async (req, res)=>{
        

  try{


  }

  catch(error){
    error, 
    res.status(500).send({
      success: false,
      message:"not gettting appointmaents in doctor appintment page",
      error,
    })

  }



}

module.exports = {
  getDoctorController,
  updateProfileController,
  getDoctorByIdController,
  doctorAppointmentController
};
