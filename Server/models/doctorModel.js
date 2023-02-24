const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    firstName: {
      type: String,
      required: [true, "first name is required"],
    },
    lastname: {
      type: String,
      required: [true, "last name is required"],
    },
    phone: {
      type: String,
      required: [true, "phone no mis required"],
    },

    email: {
      type: Stiing,
      required: [true, "email is required"],
    },
    website: {
      type: String,
    },
    address: {
      type: String,
    },

    specialization: {
      type: String,
      required: [true, "specialization is required"],
    },
    experience: {
      type: String,
      required: [true, "expirince is required"],
    },

    feesPerCunsaltation: {
      type: Number,
      required: [true, "fee is required"],
    },

    timing: {
      type: Object,
      required: [true, "work timing is required"],
    },
  },
  { timestamps: true }
);

const doctorModel = mongoose.model("doctors", doctorSchema);

module.exports = doctorModel;
