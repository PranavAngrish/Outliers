import mongoose,{Schema} from "mongoose";

const vendorSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    phoneNumber:{
        type:Number,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    city:{
        type:String,
        required:true,
        lowercase:true,
        trim:true
    },
    state:{
        type:String,
        required:true,
        lowercase:true,
        trim:true
    },
    panCardNumber:{
        type: Number,
        required:true,
        trim: true
    },
    pancardImage:{
        type:String,
        required:true
    },
    gstNumber:{
        type:Number,
        required:true,
        trim: true
    },
    cancelledCheckImage:{
        type:String,
        required:true
    },
    ifseCode:{
        type:String,
        required:true,
        trim: true
    },
    accountNumber:{
        type:Number,
        required:true,
        trim: true
    },
    branchName:{
        type:String,
        required:true,
        trim: true
    },
    verificationStatus:{
        type:String,
        enum:["pending","accepted","rejected"],
        default:"pending",
        index:true
    },
    pendingExperiences:[{
        type: Schema.Types.ObjectId,
        ref: "PendingExperience"
    }],
    acceptedExperiences:[{
        type: Schema.Types.ObjectId,
        ref: "AcceptedExperience"
    }]
})

export const Vendor = mongoose.model("Vendor", vendorSchema);