import mongoose , {Schema} from "mongoose";

const userSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    city:{
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    state:{
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    age:{
        type: Number,
        required: true,
        trim: true
    },
    phoneNumber:{
        type: Number,
        required: true,
        unique: true,
        trim: true
    },
    emailId:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    acceptedBookings:[{
        type: Schema.Types.ObjectId,
        ref: "AcceptedBooking"
    }],
    pendingBookings:[{
        type: Schema.Types.ObjectId,
        ref: "PendingBooking"
    }],
    refreshToken:{
        type:String
    },
    occupation: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        minlength: 2,
        maxlength: 100
    }
},{
    timestamps: true
})

export const User = mongoose.model("User", userSchema);