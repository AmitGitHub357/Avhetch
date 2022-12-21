const mongoose = require('mongoose')
const { Schema } = mongoose
const newUserSchema = new Schema ({
    name : {
        type : String
    },
    createdBy : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    email : {
        type : String
    },
    password :{
        type : String
    }
},{timestamps : true})
const NewUser = mongoose.model('NewUser',newUserSchema)
module.exports = NewUser