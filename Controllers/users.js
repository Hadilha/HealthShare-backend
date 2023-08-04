const usersServices = require("../Services/users");

module.exports = {
  users_get_all: usersServices.users_get_all,
  users_create: usersServices.users_create,
  users_Get_By_Id: usersServices.users_Get_By_Id,
  users_Delete_By_Id: usersServices.users_Delete_By_Id,
  users_Update: usersServices.users_Update,
};
