import mongoose from "mongoose";

const Schema = mongoose.Schema;
// Define the schema with validation
export const projectSchema = new Schema({
  projectname: {
    type: String,
    required: [true, "Project name is required"],
    minlength: [3, "Project name must be at least 3 characters long"],
    maxlength: [100, "Project name cannot exceed 100 characters"],
  },
  resone: {
    type: String,
    required: [true, "Reason is required"],
    minlength: [3, "Reason must be at least 5 characters long"],
  },
  type: {
    type: String,
    required: true,
    enum: ["Internal", "External", "Vender"], // Enumeration validation
  },
  division: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
    enum: ["High", "Medium", "Low"], // Ensures priority is one of these values
  },
  department: {
    type: String,
    required: true,
  },
  pstartdate: {
    type: Date,
    required: [true, "Project start date is required"],
    validate: {
      validator: function (v) {
        // Start date must be today or later
        return v >= new Date();
      },
      message: "Project start date must be today or later",
    },
  },
  penddate: {
    type: Date,
    required: [true, "Project end date is required"],
    validate: {
      validator: function (v) {
        // End date must be after the start date
        return v > this.pstartdate;
      },
      message: "Project end date must be after the start date",
    },
  },
  Location: {
    type: String,
    required: [true, "Location is required"],
  },
  Status: {
    type: String,
    required: true,
    enum: ["Registerd"], // Specific statuses allowed
  },
});

// Create the model
// export const Project = mongoose.model("Project", projectSchema);

export const userSchema = () =>
  new Schema({
    username: {
      type: String,
      required: [true, "UserName is required"],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is Required"],
      unique: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ], // Regex for basic email validation
    },
    mobileno: {
      type: Number,
      required: [true, "Mobile No is Required"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is Required"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  });
