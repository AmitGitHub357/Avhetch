const express = require("express");
const app = express();
const mongoose = require("mongoose");
const batchModel = require("../models/batchModel");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const asyncHandler = require("express-async-handler");
const addBatch = asyncHandler(async (req, res) => {
    try {
        // res.send({ body : req.body })
        const imageFiles = req.files;
        // res.send({ imageFiles }) 
        const imagePath = []
        const body = req.body; 
        if (imageFiles) {
            for (let i = 0; i < imageFiles.length; i++) {
                let imgObj = imageFiles[i].destination + imageFiles[i].originalname
                imagePath.push(imgObj)
            }
            body.materialPDF = imagePath ? imagePath : []
        }
        // body.createdBy = req.user._id
        const batch = new batchModel(body)
        const saveBatch = await batch.save()
        res.send({
            message: 'Batch saved successfully',
            success: true,
            status: 201
        })
    } catch (error) {
        res.send({
            message: 'Something went wrong,please try again',
            success: false,
            error: error.message,
            status: 400
        })
    }
})
//LIST ALL Batchs
const getBatch = asyncHandler(async (req, res) => {
    try {
        const BatchList = await batchModel.find().sort("-_id")
        res.send({
            BatchList,
            success: true,
            status: 200
        })
    } catch (error) {
        res.send({
            message: 'Something went wrong,please try again',
            success: false,
            error: error.message,
            status: 400
        })
    }
})

//LIST ALL Batch with count
// const getBatchListWithCount = asyncHandler(async(req,res)=>{
//     try {
//         const BatchsList = await Batch.find().sort("-_id").populate('diseaseId')
//         let updatedBatchsList = []
//         BatchsList.forEach(async (eachBatch)=>{

//            // let count = 0
//             const getTotalBatchsOnDisease = await Batch.find({'diseaseId' : eachBatch._id})
//             let BatchObj = {
//                 diseaseName : eachBatch.diseaseId.name,
//                 count : getTotalBatchsOnDisease.length
//             }
//             updatedBatchsList.push(BatchObj)
//         })
//         //For printing in alphabetical order
//         updatedBatchsList.sort(function(a,b){
//             return a.diseaseName.localeCompare(b.diseaseName);
//         })
//         res.send({
//             updatedBatchsList,
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
// //GET Batchs based on the disease name
// const getBatchByDiseaseName = asyncHandler(async(req,res)=>{
//     try {
//         const diseaseName = req.query.name
//         const BatchsList = await Batch.find().sort("-_id").populate('diseaseId').populate('companyId')
//         let updatedBatchsList = []
//         BatchsList.forEach(eachBatch=>{
//             if(eachBatch.diseaseId.name==diseaseName){
//                 updatedBatchsList.push(eachBatch)
//             }
//         })
//         res.send({
//             BatchsList : updatedBatchsList,
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
// const getBatchByCategory = asyncHandler(async(req,res)=>{
//     try {
//         const category = req.query.category
//         const allBatchsList = await Batch.find({category}).populate('diseaseId').populate('companyId')
//         res.send({
//             BatchsList : allBatchsList,
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
// //GET Batch BASED ON THE CATEGORY AND SUB CATEGORY MATCHING
// const getBatchByCategoryAndSub = asyncHandler(async(req,res)=>{
//     try {
//         const category = req.query.category
//         const subCategory = req.query.subCategory
//         const allBatchsList = await Batch.find({category,subCategory : {$in : [`${subCategory}`]}}).populate('diseaseId').populate('companyId')
//         res.send({
//             BatchsList : allBatchsList,
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
const getBatchById = asyncHandler(async (req, res) => {
    try {
        const id = req.params.id
        const BatchData = await batchModel.findById(id)
        if (BatchData) {
            res.send({
                BatchData,
                success: true,
                status: 200
            })
        }
        else {
            res.send({
                message: 'The Batch you are looking does not exist',
                success: false,
                status: 404
            })
        }

    } catch (error) {
        res.send({
            message: 'Something went wrong,please try again',
            error: error.message,
            success: false,
            status: 400
        })
    }
})

//EDIT Batch BY ID
const updateBatch = asyncHandler(async (req, res) => { 
    try {
        const id = req.params.id
        const body = req.body
        // res.send({ body })
        const BatchData = await batchModel.findByIdAndUpdate(id, { $set: body }, { new: true })
        if (BatchData) {
            res.send({
                BatchData,
                message: 'Batch data updated successfully',
                success: true,
                status: 200
            })
        }
        else {
            res.send({
                message: 'The Batch you are looking does not exist',
                success: false,
                status: 404
            })
        }
    } catch (error) {
        res.send({
            message: 'Something went wrong,please try again',
            error: error.message,
            success: false,
            status: 400
        })
    }
})
//DELETE Batch BY ID
const deleteBatch = asyncHandler(async (req, res) => {
    try {
        const id = req.params.id
        const BatchData = await batchModel.findOneAndDelete(id)
        if (BatchData) {
            res.send({
                message: 'Batch data deleted successfully',
                success: true,
                status: 200
            })
        }
        else {
            res.send({
                message: 'Not found',
                success: false,
                status: 404
            })
        }

    } catch (error) {
        res.send({
            message: 'Something went wrong,please try again',
            error: error.message,
            success: false,
            status: 400
        })
    }
})

module.exports = {
  getBatch,
  getBatchById,
  deleteBatch,
  updateBatch,
  addBatch
};
