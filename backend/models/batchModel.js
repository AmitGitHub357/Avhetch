const mongoose = require('mongoose')
const { Schema } = mongoose
const BatchSchema = new Schema ({
    batchName : { 
        type : String
    },
    createdBy : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    courseName : {
        type : String
    },
    trainerName :{
        type : String
    },
    materialPDF : {
        type : Array
    },
    link : {
        type : String
    },
    description : {
        type : String
    },
    notes : {
        type : String
    }
},{timestamps : true})
const Batch = mongoose.model('batch',BatchSchema)
module.exports  = Batch 