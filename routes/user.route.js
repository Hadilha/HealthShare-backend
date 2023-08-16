const express = require("express");
const { authJwt, verifySignUp } = require("../middleware");

const { userController } = require("../controllers");
const router = express.Router();

router.route("/signin").post(userController.Signin);
router
  .route("/signup")
  .post(verifySignUp.checkDuplicateUsernameOrEmail, userController.SignUp);
router.route("/").get(userController.getAllUsers);
router.route("/patient").get(userController.getAllPatients);
router.route("/doctor").get(userController.getAllDoctors);
router.route("/patient/:id").get(userController.getPatientById);
router.route("/doctor/:id").get(userController.getDoctorById);
router.route("/patient/:id").patch(userController.updatePatientById);
router.route("/doctor/:id").patch(userController.updateDoctorById);

module.exports = router;
