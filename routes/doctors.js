const express = require("express");
const { doctorContollers } = require("../Controllers/index");
const router = express.Router();

router.get("/", doctorContollers.doctors_get_all);
router.get("/:doctorId", doctorContollers.doctors_Get_By_Id);
router.post("/", doctorContollers.doctors_create);
router.delete("/:doctorId", doctorContollers.doctors_Delete_By_Id);
router.patch("/:doctorId", doctorContollers.doctors_Update);

module.exports = router;
