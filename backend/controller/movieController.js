const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Movies = require("../models/movieModel");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const asyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer")

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'amit.metromindz@gmail.com',
    pass: 'mxwbimfknxfrloly'
  }
});

const createMovieList = asyncHandler(async (req, resp) => {
  try {
    const body = req.body
    const files = req.files
    // resp.send({
    //   file: req.files,
    //   // body
    // })
    let imagesFile = []
    // ,certificatesFile = [],certificatesPath = []
    let imagesPath = []
    // ,previewImagePath = ''
    if (Object.keys(req.files).length != 0) {
      if(Object.keys(req.files).includes('previewImage')){
       imagesFile = req.files.previewImage
      }
      // if(Object.keys(req.files).includes('previewImage')){
      //     previewImageFile = req.files.previewImage
      // }
      // if(Object.keys(req.files).includes('certificates')){
      //     certificatesFile = req.files.certificates
      // }
    }
    if (imagesFile.length != 0) {
      
      for (let i = 0; i < imagesFile.length; i++) {
        let imgObj = imagesFile[i].destination.slice(1) + '/' + imagesFile[i].filename
        // files[i].filename
        imagesPath.push(imgObj)
      }
      body.images = imagesPath
    }
    // if(certificatesFile.length!=0){

    //     for(let i=0;i<certificatesFile.length;i++){
    //         let certificateObj = certificatesFile[i].destination.slice(1)+files[i].filename
    //         certificatesPath.push(certificateObj)
    //     }
    //     body.certificateIconsUrls = certificatesPath

    // }
    //GET PROFILE PHOTO OBJECT
    // if(previewImageFile){
    //     previewImagePath = previewImageFile.destination.slice(1)+files[i].filename
    //     body.previewImage = previewImagePath

    // }
    body.createdBy = req.user._id
    const newMovies = new Movies(body)
    const saveMovies = await newMovies.save()
    resp.send({
      message: 'Movies List Created successfully',
      success: true,
      status: 201
    })
  } catch (error) {
    resp.send({
      message: 'Something went wrong,please try again',
      success: false,
      error: error.message,
      status: 400
    })
  }
});

const getByUserId = asyncHandler(async (req, resp) => {
  try {
    const userId = req.params.id;
    const movieList = await Movies.findById(userId)
      .sort("-id")
      .populate("userId");
    // console.log(movieList)
    if (movieList) {
      resp.send({
        status: 200,
        success: "true",
        list: movieList,
      });
    }
  } catch (err) {
    resp.send({
      error: err.message,
    });
  }
});

const addedMoviesList = asyncHandler(async (req, resp) => {
  try {
    const list = await Movies.find()
    console.log(list)
    resp.send({
      data: list,
      success: true,
      status: 201
    })
  } catch (error) {
    resp.send({
      message: 'Something went wrong,please try again',
      success: false,
      error: error.message,
      status: 400
    })
  }
})

const removeById = asyncHandler(async (req, resp) => {
  try {
    const id = req.params.id;
    const movieDeleted = await Movies.findByIdAndDelete(id);
    // const movieDeleted = await Movies.deleteMany({ movieN  ame : "Cartoon Network" })
    if (movieDeleted) {
      resp.send({
        status: 200,
        message: "Movies Deleted Successfully",
        success: true,
      });
    } else {
      resp.send({
        status: 400,
        message: "Movies Not Found",
        success: "false",
      });
    }
  } catch (err) {
    resp.send({
      error: err.message,
    });
  }
})

const getByTitle = asyncHandler(async (req, resp) => {
  try {
    const movieName = req.params.movieName
    const searchList = await Movies.find({ movieName })
    resp.send({
      searchList,
      success: true,
      status: 200,
    });
  } catch (error) {
    resp.send({
      message: "Something went wrong,please try again",
      success: false,
      error: error.message,
      status: 400,
    });
  }
})

const sendEmail = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body

    var mailOptions = {
      from: 'amit.metromindz@gmail.com',
      to: email,
      subject: 'Demo Purpose',
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    //     let email = await transporter.sendMail(sendLink);
    res.json({
      message: `A mail has been sent to ${email}. Please follow the instructions.`,
      success: true,
      status: 200,
    });
  } catch (err) {
    res.send({
      error: error.message,
      status: 400,
      success: false,
    });
  }
})

module.exports = {
  createMovieList,
  addedMoviesList,
  getByUserId
  , removeById,
  getByTitle,
  sendEmail
}