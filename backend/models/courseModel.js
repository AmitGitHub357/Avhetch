const mongoose = require('mongoose')
const { Schema } = mongoose

const courseSchema = new Schema ({
    courseName : {
        type : String
    },
    createdBy : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    studentId : {
        type : Schema.Types.ObjectId,
        ref : "NewUser"
    },
    batchId : {
        type : Schema.Types.ObjectId,
        ref : "batch"
    },
    startDate : {
        type : String
    },
    endDate : {
        type : String
    },
    courseDuration : {
        type : String
    },
    paymentDetail : {
        type : String
    }
},{timestamps : true})
const Course = mongoose.model('Course',courseSchema)
module.exports = Course