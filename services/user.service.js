const config = require("../config/auth.config");
const { User } = require("../models");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

const SignUp = async (body) => {
  try {
    let result;

    switch (body.role) {
      case "doctor":
        result = await User.discriminators.doctor.create(body);
        break;
      case "patient":
        result = await User.discriminators.patient.create(body);
        break;
      default:
        throw new Error("Invalid role");
    }

    return { user: result };
  } catch (error) {
    throw error;
  }
};
const Signin = async (req) => {
  try {
    const user = await User.findOne({
      username: req.username,
    });

    if (!user) {
      return {
        status: 404,

        message: "User not found.",
      };
    }

    if (req.password !== user.password) {
      return {
        status: 401,
        message: "Invalid Password!",
      };
    }

    const token = jwt.sign({ id: user._id }, config.secret, {
      algorithm: "HS256",
      expiresIn: 86400,
    });

    return {
      status: 200,
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        token: token,
      },
      message: "User found",
    };
  } catch (error) {
    throw error;
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw error;
  }
};

const getAllPatients = async () => {
  try {
    const patients = await User.discriminators.patient.find();

    return patients;
  } catch (error) {
    throw error;
  }
};
const getAllDoctors = async () => {
  try {
    const doctors = await User.discriminators.doctor.find();

    return doctors;
  } catch (error) {
    throw error;
  }
};
const getPatientById = async (_id) => {
  try {
    const patient = await User.discriminators.patient.findById(_id);
    return patient;
  } catch (error) {
    throw error;
  }
};
const getDoctorById = async (_id) => {
  try {
    const doctor = await User.discriminators.doctor.findById(_id);
    return doctor;
  } catch (error) {
    throw error;
  }
};
const updatePatientById = async (_id, data) => {
  try {
    const updatedPatient = await User.discriminators.patient.findByIdAndUpdate(
      _id,
      data,
      { new: true }
    );

    return updatedPatient;
  } catch (error) {
    throw error;
  }
};
const updateDoctorById = async (_id, data) => {
  try {
    const updatedDoctor = await User.discriminators.doctor.findByIdAndUpdate(
      _id,
      data,
      { new: true }
    );

    return updatedDoctor;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  Signin,
  SignUp,
  getAllUsers,
  getAllPatients,
  getAllDoctors,
  getPatientById,
  getDoctorById,
  updatePatientById,
  updateDoctorById,
};
