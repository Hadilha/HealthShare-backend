const doctorsServices = require("../Services/doctors");

module.exports = {
  doctors_get_all: doctorsServices.doctors_get_all,
  doctors_create: doctorsServices.doctors_create,
  doctors_Get_By_Id: doctorsServices.doctors_Get_By_Id,
  doctors_Delete_By_Id: doctorsServices.doctors_Delete_By_Id,
  doctors_Update: doctorsServices.doctors_Update,
};
