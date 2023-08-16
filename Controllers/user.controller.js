const { userService } = require("../services");

const Signin = async (req, res) => {
  try {
    console.log("req", req);
    const result = await userService.Signin(req.body);
    return res.status(result ? 201 : 400).json({
      status: result ? 200 : 400,
      data: { result },
      message: result ? "User found " : "User not found",
    });
  } catch (e) {
    return res.status(500).json({
      status: 500,
      error: e,
      message: "Server error",
    });
  }
};
const SignUp = async (req, res) => {
  try {
    const result = await userService.SignUp(req.body);
    return res.status(result ? 201 : 400).json({
      status: result ? 200 : 400,
      data: { result },
      message: result ? "User created successfully" : "Cannot create user",
    });
  } catch (e) {
    console.log("error", e);
    return res.status(500).json({
      status: 500,
      error: e,
      message: "Server error",
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const result = await userService.getAllUsers();
    return res.status(200).json({
      count: result.length,
      users: result,
    });
  } catch (e) {
    return res.status(500).json({
      status: 500,
      error: e,
      message: "Server error",
    });
  }
};
const getAllPatients = async (req, res) => {
  try {
    const result = await userService.getAllPatients();
    return res.status(200).json({
      count: result.length,
      Patients: result,
    });
  } catch (e) {
    return res.status(500).json({
      status: 500,
      error: e,
      message: "Server error",
    });
  }
};
const getAllDoctors = async (req, res) => {
  try {
    const result = await userService.getAllDoctors();
    return res.status(200).json({
      count: result.length,
      Doctors: result,
    });
  } catch (e) {
    return res.status(500).json({
      status: 500,
      error: e,
      message: "Server error",
    });
  }
};

module.exports = {
  Signin,
  SignUp,
  getAllUsers,
  getAllPatients,
  getAllDoctors,
};
