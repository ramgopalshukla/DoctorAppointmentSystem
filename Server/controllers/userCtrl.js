const userModel = require("../models/userModel");

const jwt = require("jsonwebtoken");

const doctorModel = require("../models/doctorModel");

const bcrypt = require("bcryptjs");
// login handler

const logiController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(200)
        .send({ message: "usre not found", success: false });
    }

    const ismatch = await bcrypt.compare(req.body.password, user.password);

    if (!ismatch) {
      return res
        .status(200)
        .send({ message: "invalid  email or password", success: false });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).send({ message: "login success", success: true, token });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: `error in logic controll ${error.message}` });
  }
};

//  register handler
const registrationController = async (req, res) => {
  try {
    const existinguser = await userModel.findOne({ email: req.body.email });

    if (existinguser) {
      return res
        .status(200)
        .send({ message: "user alrewady Exist", success: false });
    }

    const password = await req.body.password;
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;

    const newuser = new userModel(req.body);
    await newuser.save();
    res.status(201).send({ message: "registration succesfull", success: true });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ success: false, message: `Register Controller ${err.message}` });
  }
};

const authctrl = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res.staus(200).send({
        message: "user not found",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: `something went wrong  ${err.message}`,
    });
  }
};

const applyDoctorController = async (req, res) => {
  try {
    const newDoctor = await doctorModel({ ...req.body, status: "pending" });

    await newDoctor.save();

    const adminUser = await userModel.findOne({ isAdmin: true });

    const notification = adminUser.notification;

    notification.push({
      type: "apply-doctor-request",
      message: `${newDoctor.firstname} ${newDoctor.lastname} Has Applied For A Doctor Account`,

      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstName + " " + newDoctor.lastName,
        onclickPath: "/admin/doctors",
      },
    });

    await userModel.findByIdAndUpdate(adminUser._id, { notification });
    res.status(201).send({
      success: true,
      message: "Doctor Account Applied SAuccesfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      error,
      message: `something went wrong ${error.message}`,
    });
  }
};

const getAllnotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });

    const seennotification = user.seennotification;
    const notification = user.notification;
    seennotification.push(...notification);
    user.notification = [];
    user.seennotification = notification;
    const updatedUser = await user.save();
    res.status(200).send({
      success: true,
      message: "all notification marked as read ",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: `something went wrong ${error.message}`,
    });
  }
};

const deleteAllController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });

    user.notification = [];

    user.seennotification = [];

    const updateduser = await user.save();

    updateduser.password = undefined;

    res.status(200).send({
      success: true,
      message: "Notification Delete successsfully",
      data: updateduser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "unable to delete all notifications",
      error,
    });
  }
};

// getAllDoctorController


const getAllDoctorController = async (req, res)=>{

  try{
  
    const doctors= await doctorModel.find({})

    res.status(200).send({
      success: true,
      message: "Doctors Lists Fetched Success",
      data: doctors
    })
  } catch(error){
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Fething Doctor"
    })
  }
}

module.exports = {
  logiController,
  registrationController,
  authctrl,
  applyDoctorController,
  getAllnotificationController,
  deleteAllController,
  getAllDoctorController
};
