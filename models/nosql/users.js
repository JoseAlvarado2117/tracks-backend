const mongoose = require('mongoose');
const { Schema, model } = mongoose;


const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    age: {
      type: Number
    },
    email: {
      type: String,
      unique: true
    },
    password: {
      type: String,
      select: false
    },
    role: {
      type: ["user", "admin"], 
      default: "user"
    }
  },
  {
    timestamps: true,  // TODO: createAt, updateAt
    versionKey: false
  }
);

module.exports = model('User', userSchema);