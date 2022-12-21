const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Course = require("../models/courseModel");
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
//CREATE Course
const addCourse = asyncHandler(async(req,res) => {
    try {
        const body = req.body
        // res.send({ body })
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
        //     body.certificateIconsUrls = certix   ficatesPath       
        // }
        //  //GET PROFILE PHOTO OBJECT
        // if(previewImageFile){
        //     previewImagePath = previewImageFile.destination.slice(1)+files[i].filename
        //     body.previewImage = previewImagePath
           
        // }
        body.createdBy = req.user._id
        const course = new Course(body)
        const saveCourse = await course.save()  
        res.send({
            message : 'Course saved successfully',
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
//LIST ALL Courses
const getCourse = asyncHandler(async(req,res)=>{
    try {
        const CourseList = await Course.find().populate("batchId").populate("studentId").sort("-_id")
        res.send({
            CourseList,
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

const getStudentCourse = asyncHandler(async(req,res) => { 
    // res.send({ mess : "feadsdvcv" })
    try {
        const CourseList = await Course.find({ studentId : req.body.id }).populate("batchId").populate("studentId").sort("-_id")
        res.send({
            CourseList,
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

const getStudentCourseDetail = asyncHandler(async(req,res) => { 
    // res.send({ mess : req.body })
    try {
        const CourseList = await Course.find({ studentId : req.body.studentId , _id : req.body.courseId }).populate("batchId").populate("studentId").sort("-_id")
        res.send({
            CourseList,
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

//LIST ALL Course with count
// const getCourseListWithCount = asyncHandler(async(req,res)=>{
//     try {
//         const CoursesList = await Course.find().sort("-_id").populate('diseaseId')
//         let updatedCoursesList = []
//         CoursesList.forEach(async (eachCourse)=>{

//            // let count = 0
//             const getTotalCoursesOnDisease = await Course.find({'diseaseId' : eachCourse._id})
//             let CourseObj = {
//                 diseaseName : eachCourse.diseaseId.name,
//                 count : getTotalCoursesOnDisease.length
//             }
//             updatedCoursesList.push(CourseObj)
//         })
//         //For printing in alphabetical order
//         updatedCoursesList.sort(function(a,b){
//             return a.diseaseName.localeCompare(b.diseaseName);
//         })
//         res.send({
//             updatedCoursesList,
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
// //GET Courses based on the disease name
// const getCourseByDiseaseName = asyncHandler(async(req,res)=>{
//     try {
//         const diseaseName = req.query.name
//         const CoursesList = await Course.find().sort("-_id").populate('diseaseId').populate('companyId')
//         let updatedCoursesList = []
//         CoursesList.forEach(eachCourse=>{
//             if(eachCourse.diseaseId.name==diseaseName){
//                 updatedCoursesList.push(eachCourse)
//             }
//         })
//         res.send({
//             CoursesList : updatedCoursesList,
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
// const getCourseByCategory = asyncHandler(async(req,res)=>{
//     try {
//         const category = req.query.category
//         const allCoursesList = await Course.find({category}).populate('diseaseId').populate('companyId')
//         res.send({
//             CoursesList : allCoursesList,
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
// //GET Course BASED ON THE CATEGORY AND SUB CATEGORY MATCHING
// const getCourseByCategoryAndSub = asyncHandler(async(req,res)=>{
//     try {
//         const category = req.query.category
//         const subCategory = req.query.subCategory
//         const allCoursesList = await Course.find({category,subCategory : {$in : [`${subCategory}`]}}).populate('diseaseId').populate('companyId')
//         res.send({
//             CoursesList : allCoursesList,
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
const getCourseById = asyncHandler(async(req,res)=>{
    try {
        const id = req.params.id
        const CourseData = await Course.findById(id)
        if(CourseData){
            res.send({
                CourseData,
                success : true,
                status : 200
            })
        }
        else{
            res.send({
                message : 'The Course you are looking does not exist',
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

//EDIT Course BY ID
const updateCourse = asyncHandler(async(req,res)=>{
    try {
        const id = req.params.id
        const body = req.body
        // res.send({ body })
        const CourseData = await Course.findByIdAndUpdate(id,{$set : body},{new : true})
        if(CourseData){
            res.send({
                CourseData,
                message : 'Course data updated successfully',
                success : true,
                status : 200
            })
        }
       else{
        res.send({
            message : 'The Course you are looking does not exist',
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
//DELETE Course BY ID
const deleteCourse = asyncHandler(async(req,res)=>{
    try {
        const id = req.params.id
        const CourseData = await Course.findByIdAndDelete(id)
        if(CourseData){   
            res.send({
                message : 'Course data deleted successfully',
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
  getCourse,
  getCourseById,
  deleteCourse,
  updateCourse,
  addCourse,
  getStudentCourse,
  getStudentCourseDetail
};
