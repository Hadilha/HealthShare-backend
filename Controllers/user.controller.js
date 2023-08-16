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
const getPatientById = async (req, res) => {
  try {
    const _id = req.params.id;
    const result = await userService.getPatientById(_id);

    if (!result) {
      return res.status(404).json({
        status: 404,
        message: "Patient not found",
      });
    }

    return res.status(200).json({
      Patient: [result],
    });
  } catch (e) {
    console.error("Error fetching patient:", e);
    return res.status(500).json({
      status: 500,
      error: e.message,
      message: "Server error",
    });
  }
};

const getDoctorById = async (req, res) => {
  try {
    const _id = req.params.id;
    const result = await userService.getDoctorById(_id);

    if (!result) {
      return res.status(404).json({
        status: 404,
        message: "Doctor not found",
      });
    }

    return res.status(200).json({
      Doctors: [result],
    });
  } catch (e) {
    console.error("Error fetching doctor:", e);
    return res.status(500).json({
      status: 500,
      error: e.message,
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
const updatePatientById = async (req, res) => {
  try {
    const _id = req.params.id;
    const updatedData = req.body;

    const updatedPatient = await userService.updatePatientById(
      _id,
      updatedData
    );

    if (!updatedPatient) {
      return res.status(404).json({
        status: 404,
        message: "Patient not found",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Patient updated successfully",
      updatedPatient,
    });
  } catch (e) {
    console.error("Error updating patient:", e);
    return res.status(500).json({
      status: 500,
      error: e.message,
      message: "Server error",
    });
  }
};
const updateDoctorById = async (req, res) => {
  try {
    const _id = req.params.id;
    const updatedData = req.body;

    const updatedDoctor = await userService.updateDoctorById(_id, updatedData);

    if (!updatedDoctor) {
      return res.status(404).json({
        status: 404,
        message: "Doctor not found",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Doctor updated successfully",
      updatedDoctor,
    });
  } catch (e) {
    console.error("Error updating doctor:", e);
    return res.status(500).json({
      status: 500,
      error: e.message,
      message: "Server error",
    });
  }
};

module.exports = {
  Signin,
  SignUp,
  getAllUsers,
  getAllPatients,
  getPatientById,
  getAllDoctors,
  getDoctorById,
  updatePatientById,
  updateDoctorById,
};
