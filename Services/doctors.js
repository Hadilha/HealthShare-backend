const express = require("express");
const mongoose = require("mongoose");
const User = require("../Models/users");

/**********************doctors_create***********************/
const doctors_create = (req, res, next) => {
  const doctor = new User({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
    speciality: req.body.speciality,
    contactNumber: req.body.contactNumber,
    address: req.body.address,
    isAvailable: req.body.isAvailable,
    role: "doctors",
  });

  doctor
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Created doctor successfully",
        createdDoctor: {
          _id: result._id,
          name: result.name,
          email: result.email,
          age: result.age,
          speciality: result.speciality,
          contactNumber: result.contactNumber,
          address: result.address,
          isAvailable: result.isAvailable,
          request: {
            type: "POST",
            url: "http://localhost:3000/doctors/" + result._id,
          },
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

/**********************doctors_get_all***********************/
const doctors_get_all = (req, res, next) => {
  User.find({ role: "doctors" })
    .exec()
    .then((doctors) => {
      res.status(200).json({
        count: doctors.length,
        doctors: doctors.map((doctor) => {
          return {
            _id: doctor._id,
            name: doctor.name,
            email: doctor.email,
            age: doctor.age,
            speciality: doctor.speciality,
            contactNumber: doctor.contactNumber,
            address: doctor.address,
            isAvailable: doctor.isAvailable,
            request: {
              type: "GET",
              url: "http://localhost:3000/doctors/" + doctor._id,
            },
          };
        }),
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

/**********************doctors_Get_By_Id***********************/
const doctors_Get_By_Id = (req, res, next) => {
  const id = req.params.doctorId;
  User.findById(id)
    .exec()
    .then((doctor) => {
      console.log("From database", doctor);
      if (doctor && doctor.role === "doctors") {
        res.status(200).json({
          doctor: doctor,
          request: {
            type: "GET",
            url: "http://localhost:3000/doctors",
          },
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

/**********************doctors_Update***********************/
const doctors_Update = (req, res, next) => {
  const id = req.params.doctorId;
  User.updateMany({ _id: id, role: "doctors" }, { $set: req.body })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Doctor updated",
        request: {
          type: "Get",
          url: "http://localhost:3000/doctors/" + id,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

/**********************doctors_Delete_By_Id***********************/
const doctors_Delete_By_Id = (req, res, next) => {
  const id = req.params.doctorId;
  User.deleteOne({ _id: id, role: "doctors" })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Doctor deleted",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

module.exports = {
  doctors_create,
  doctors_get_all,
  doctors_Get_By_Id,
  doctors_Update,
  doctors_Delete_By_Id,
};
