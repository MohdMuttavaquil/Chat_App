import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    userName: {type: String, required: true, unique:true },
    email: {type: String, required: true},
    password: {type: String, required: true},
    friend: {type: [String], default:[]},
    messages: {type: [Object], default:[]}
})

export const userModle = mongoose.model.users || mongoose.model("users", userSchema)