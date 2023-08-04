const express = require("express");
const { usersContollers } = require("../Controllers/index");
const router = express.Router();
router.get("/", usersContollers.users_get_all);
router.get("/:usersId", usersContollers.users_Get_By_Id);
router.post("/", usersContollers.users_create);
router.delete("/:usersId", usersContollers.users_Delete_By_Id);
router.patch("/:usersId", usersContollers.users_Update);
module.exports = router;
