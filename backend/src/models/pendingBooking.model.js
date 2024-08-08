import mongoose,{Schema} from "mongoose";

const pendingBookingSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    numberOfPeople:{
        type: Number,
        required: true
    },
    remarks:{
        type: String
    },
    ageOfPeople:[{
        type: Number,
        required: true
    }],
    addOns:[{
        type:String
    }],
    vendor:{
        type: Schema.Types.ObjectId,
        ref: "Vendor"
    },
    payment:{
        type: Schema.Types.ObjectId,
        ref: "Payment"
    },
    trip:{
        type: Schema.Types.ObjectId,
        ref: "Trip",
        index: true
    },
    dateTime:{
        type: Date,
        required: true
    },
    experience:{
        type: Schema.Types.ObjectId,
        ref: "AcceptedExperience"
    }

},{
    timestamps: true
})


export const PendingBooking = mongoose.model("PendingBooking", pendingBookingSchema);