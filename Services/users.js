const express = require("express");
const mongoose = require("mongoose");
const User = require("../Models/users"); // Assuming you have a "user" model defined in a separate file.

/**********************users_create***********************/
const users_create = (req, res, next) => {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
  });
  user
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Created user successfully",
        createdUser: {
          _id: result._id,
          name: result.name,
          email: result.email,
          request: {
            type: "POST",
            url: "http://localhost:3000/users/" + result._id,
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

/**********************users_get_all***********************/
const users_get_all = (req, res, next) => {
  User.find()
    .exec()
    .then((users) => {
      res.status(200).json({
        count: users.length,
        users: users.map((user) => {
          return {
            _id: user._id,
            name: user.name,
            email: user.email,
            request: {
              type: "GET",
              url: "http://localhost:3000/users/" + user._id,
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

/**********************users_Get_By_Id***********************/
const users_Get_By_Id = (req, res, next) => {
  const id = req.params.userId;
  User.findById(id)
    .exec()
    .then((user) => {
      console.log("From database", user);
      if (user) {
        res.status(200).json({
          user: user,
          request: {
            type: "GET",
            url: "http://localhost:3000/users",
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

/**********************users_Update***********************/
const users_Update = (req, res, next) => {
  const id = req.params.userId;
  User.updateMany({ _id: id }, { $set: req.body })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "User updated",
        request: {
          type: "Get",
          url: "http://localhost:3000/users/" + id,
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

/**********************users_Delete_By_Id***********************/
const users_Delete_By_Id = (req, res, next) => {
  const id = req.params.userId;
  User.deleteOne({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "User deleted",
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
  users_create,
  users_get_all,
  users_Get_By_Id,
  users_Update,
  users_Delete_By_Id,
};
