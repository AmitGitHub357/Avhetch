const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const connectDB = async () => 
{
    conn = await mongoose.connect("mongodb+srv://rahat6713:1819rahat@cluster0.iee0y.mongodb.net/ahvetch?retryWrites=true&w=majority", {
    useNewUrlParser: "true",
    useUnifiedTopology: "true",
  });
  if(conn)
    console.log(`Server connected ${conn.connection.host}`)
  else
    console.log("Server Not Connected")  
};

module.exports = connectDB;
