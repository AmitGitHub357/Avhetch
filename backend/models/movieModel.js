const mongoose = require('mongoose')
const { Schema } = mongoose

// const movieSchema = new Schema({
//     movieListName: {
//         type: String
//     },
//     createdBy: {
//         type: Schema.Types.ObjectId,
//         ref: 'User'
//     },
//     imdbID: {
//         type: String
//     }
// }, { timestamps: true })

// const Movies = mongoose.model('movieModel', movieSchema)
// module.exports = Movies
const movieSchema = new Schema(
    {
        movieName: {
            type: String,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        year : {
            type : Number,  
        },
        country : {
            type : String
        },
        language : {
            type : String
        },
        description: {
            type: String,
        },
        images: {
            type: Array,
        },
        ratings : {
            type : String,
        }
        // companyId: {
        //     type: Schema.Types.ObjectId,
        //     ref: "Company",
        // },
        //   projectStatus: {
        //     enum: ["Completed", "Ongoing", "Upcoming"],
        //     type: String,
        //     default: "Upcoming",
        //   },
    },
    { timestamps: true }
);
const Movies = mongoose.model("movies", movieSchema);
module.exports = Movies;
