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
    acceptanceStatus:{
        type: String,
        enum: ["pending","accepted","rejected"],
    },
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
    }

},{
    timestamps: true
})


export const PendingBooking = mongoose.model("PendingBooking", pendingBookingSchema);