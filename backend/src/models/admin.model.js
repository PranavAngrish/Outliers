
import mongoose,{ Schema } from "mongoose";

const adminSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    password:{
        type:String,
        default:'',
        trim:true
    },
    googleSignIn:{
        type: Boolean,
        required: true,
        default: false,
    },
    verified:{
        type:Boolean,
        default:false
    }
})

export const Admin = mongoose.model("Admin",adminSchema);