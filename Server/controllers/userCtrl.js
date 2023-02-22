const userModel = require("../models/userModel");

const jwt = require("jsonwebtoken");

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
    const user = await userModel.findOne({ _id: req.body.userId });

    if(!user) {
       return res.staus(200).send({
        message: "user not found",
        success: false
       })
    }else{
      res.status(200).send({
        success: true,
        data: {
          name: user.name,
          email: user.email
        }
      })
    }
  } catch (error) {
    console.log(error);

    res
      .status(500)
      .send({
        success: false,
        message: `something went wrong  ${err.message}`,
      });
  }
};

module.exports = {
  logiController,
  registrationController,
  authctrl
};
