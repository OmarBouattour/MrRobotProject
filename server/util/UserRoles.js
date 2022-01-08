const jwt = require("jsonwebtoken");
const express = require('express')

const User = require('../modules/user');
const router = express.Router()
const mongoose = require('mongoose')

const checkRole = roles => (req, res, next) =>
  !roles.includes(req.User.role)
    ? res.status(401).json("Unauthorized")
    : next();


    module.exports = {checkRole};