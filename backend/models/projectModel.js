const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProjectSchema = new Schema(
  {
    name: {
      type: String,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    description: {
      type: String,
    },
    images: {
      type: Array,
    },
    companyId: {
      type: Schema.Types.ObjectId,
      ref: "Company",
    },
    projectStatus: {
      enum: ["Completed", "Ongoing", "Upcoming"],
      type: String,
      default: "Upcoming",
    },
  },
  { timestamps: true }
);
const Project = mongoose.model("project", ProjectSchema);
module.exports = Project;
