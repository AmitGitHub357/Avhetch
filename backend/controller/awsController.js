const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Company = require("../models/companyModel");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const asyncHandler = require("express-async-handler");
const addFile = asyncHandler(async (req, res) => {
    res.send({
      file : req.files 
    })
});

const getFileList = () => {

}

const deleteFile = () => {

}

const downloadFile = () => {

}

module.exports = {
  getFileList,
  deleteFile,
  downloadFile,
  addFile,
};
