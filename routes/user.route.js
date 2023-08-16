const express = require("express");
const { authJwt, verifySignUp } = require("../middleware");

const { userController } = require("../controllers");
const router = express.Router();

router.route("/signin").post(userController.Signin);
router
  .route("/signup")
  .post(verifySignUp.checkDuplicateUsernameOrEmail, userController.SignUp);
router.route("/").get(userController.getAllUsers);
router.route("/patients").get(userController.getAllPatients);
router.route("/doctors").get(userController.getAllDoctors);

module.exports = router;
