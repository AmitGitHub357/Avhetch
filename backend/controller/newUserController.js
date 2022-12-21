const express = require("express");
const app = express();
const mongoose = require("mongoose");
const NewUser = require("../models/newUserModel");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const asyncHandler = require("express-async-handler");

// import  multer from 'multer'

// import path from'path'
// const storage = multer.diskStorage({
//     destination: './public/uploads/',
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '.' + Date.now() + path.(file.originalname))
//     }
// })
// const upload = multer({
//     storage: storage
// })

// const {
//     s3Upload,
//     unlinkFile,
//     urlShortner,
//     uploadVideo,
//     compression,
//     uploadPhoto,
//     s3Delete,
//   } = require("../ExternalServices/aws-config");
//   const fs = require('fs')
//CREATE NewUser
const addNewUser = asyncHandler(async(req,res) => {
    try {
        const body = req.body
        let imagesFile = [],previewImageFile = {},certificatesFile = [],certificatesPath = []
        let imagesPath = [],previewImagePath = ''
        // if(Object.keys(req.files).length!=0){
            
        //     if(Object.keys(req.files).includes('images')){
              
        //      imagesFile = req.files.images
        //     }
        //     if(Object.keys(req.files).includes('previewImage')){
        //         previewImageFile = req.files.previewImage
        //     }
        //     if(Object.keys(req.files).includes('certificates')){
        //         certificatesFile = req.files.certificates
        //     }
        // }
        // if(imagesFile.length!=0){
           
        //     for(let i=0;i<imagesFile.length;i++){
        //         let imgObj = imagesFile[i].destination.slice(1)+files[i].filename
        //         imagesPath.push(imgObj)
        //     }
        //     body.images = imagesPath
               
        // }
        // if(certificatesFile.length!=0){
        //     for(let i=0;i<certificatesFile.length;i++){
        //         let certificateObj = certificatesFile[i].destination.slice(1)+files[i].filename
        //         certificatesPath.push(certificateObj)
        //     }
        //     body.certificateIconsUrls = certificatesPath       
        // }
        //  //GET PROFILE PHOTO OBJECT
        // if(previewImageFile){
        //     previewImagePath = previewImageFile.destination.slice(1)+files[i].filename
        //     body.previewImage = previewImagePath
           
        // }
        // body.createdBy = req.user._id
        const newUser = new NewUser(body)
        const saveNewUser = await newUser.save()
        res.send({
            message : 'NewUser saved successfully',
            success : true,
            status : 201
        })
    } catch (error) {
        res.send({
            message : 'Something went wrong,please try again',
            success : false,
            error : error.message,
            status : 400
        })
    }
})
//LIST ALL NewUsers
const getNewUser = asyncHandler(async(req,res)=>{
    try {
        const NewUserList = await NewUser.find().sort("-_id")
        res.send({
            NewUserList,
            success : true,
            status : 200
        })
    } catch (error) {
        res.send({
            message : 'Something went wrong,please try again',
            success : false,
            error : error.message,
            status : 400
        })
    }
})

//LIST ALL NewUser with count
// const getNewUserListWithCount = asyncHandler(async(req,res)=>{
//     try {
//         const NewUsersList = await NewUser.find().sort("-_id").populate('diseaseId')
//         let updatedNewUsersList = []
//         NewUsersList.forEach(async (eachNewUser)=>{

//            // let count = 0
//             const getTotalNewUsersOnDisease = await NewUser.find({'diseaseId' : eachNewUser._id})
//             let NewUserObj = {
//                 diseaseName : eachNewUser.diseaseId.name,
//                 count : getTotalNewUsersOnDisease.length
//             }
//             updatedNewUsersList.push(NewUserObj)
//         })
//         //For printing in alphabetical order
//         updatedNewUsersList.sort(function(a,b){
//             return a.diseaseName.localeCompare(b.diseaseName);
//         })
//         res.send({
//             updatedNewUsersList,
//             success : true,
//             status : 200
//         })
//     } catch (error) {
//         res.send({
//             message : 'Something went wrong,please try again',
//             success : false,
//             error : error.message,
//             status : 400
//         })
//     }
// })
// //GET NewUsers based on the disease name
// const getNewUserByDiseaseName = asyncHandler(async(req,res)=>{
//     try {
//         const diseaseName = req.query.name
//         const NewUsersList = await NewUser.find().sort("-_id").populate('diseaseId').populate('companyId')
//         let updatedNewUsersList = []
//         NewUsersList.forEach(eachNewUser=>{
//             if(eachNewUser.diseaseId.name==diseaseName){
//                 updatedNewUsersList.push(eachNewUser)
//             }
//         })
//         res.send({
//             NewUsersList : updatedNewUsersList,
//             success : true,
//             status : 200
//         })
//     } catch (error) {
//         res.send({
//             message : 'Something went wrong,please try again',
//             success : false,
//             error : error.message,
//             status : 400
//         })
//     }
// })
//GET MEDICINE BASED ON CATEGORY
// const getNewUserByCategory = asyncHandler(async(req,res)=>{
//     try {
//         const category = req.query.category
//         const allNewUsersList = await NewUser.find({category}).populate('diseaseId').populate('companyId')
//         res.send({
//             NewUsersList : allNewUsersList,
//             success : true,
//             status : 200
//         })
//     } catch (error) {
//         res.send({
//             message : 'Something went wrong,please try again',
//             success : false,
//             error : error.message,
//             status : 400
//         })
//     }
// })
// //GET NewUser BASED ON THE CATEGORY AND SUB CATEGORY MATCHING
// const getNewUserByCategoryAndSub = asyncHandler(async(req,res)=>{
//     try {
//         const category = req.query.category
//         const subCategory = req.query.subCategory
//         const allNewUsersList = await NewUser.find({category,subCategory : {$in : [`${subCategory}`]}}).populate('diseaseId').populate('companyId')
//         res.send({
//             NewUsersList : allNewUsersList,
//             success : true,
//             status : 200
//         })
//     } catch (error) {
//         res.send({
//             message : 'Something went wrong,please try again',
//             success : false,
//             error : error.message,
//             status : 400
//         })
//     }
// })

//GET Category BY ID
const getNewUserById = asyncHandler(async(req,res)=>{
    try {
        const id = req.params.id
        const NewUserData = await NewUser.findById(id)
        if(NewUserData){
            res.send({
                NewUserData,
                success : true,
                status : 200
            })
        }
        else{
            res.send({
                message : 'The NewUser you are looking does not exist',
                success : false,
                status : 404
            })
        }
        
    } catch (error) {
        res.send({
            message : 'Something went wrong,please try again',
            error : error.message,
            success : false,
            status : 400
        })
    }
})

//EDIT NewUser BY ID
const updateNewUser = asyncHandler(async(req,res)=>{
    try {
        const id = req.params.id
        const body = req.body
        // res.send({ body })
        const NewUserData = await NewUser.findByIdAndUpdate(id,{$set : body},{new : true})
        if(NewUserData){
            res.send({
                NewUserData,
                message : 'NewUser data updated successfully',
                success : true,
                status : 200
            })
        }
       else{
        res.send({
            message : 'The NewUser you are looking does not exist',
            success : false,
            status : 404
        })
       }
    } catch (error) {
        res.send({
            message : 'Something went wrong,please try again',
            error : error.message,
            success : false,
            status : 400
        })
    }
})
//DELETE NewUser BY ID
const deleteNewUser = asyncHandler(async(req,res)=>{
    try {
        const id = req.params.id
        const NewUserData = await NewUser.findByIdAndDelete(id)
        if(NewUserData){   
            res.send({
                message : 'NewUser data deleted successfully',
                success : true,
                status : 200
            })
        }
        else{
            res.send({
                message : 'Not found',
                success : false,
                status : 404
            })
        }
       
    } catch (error) {
        res.send({
            message : 'Something went wrong,please try again',
            error : error.message,
            success : false,
            status : 400
        })
    }
})
module.exports = {
  getNewUser,
  getNewUserById,
  deleteNewUser,
  updateNewUser,
  addNewUser
};
