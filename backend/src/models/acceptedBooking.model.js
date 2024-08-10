import mongoose,{Schema} from "mongoose";

const acceptedBookingSchema = new Schema({
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
    cancellationStatus:{
        type:String,
        enum:["false","pending","accepted","rejected"],
        default:"false"
    },
    dateTime:{
        type: Date,
        required: true
    }

},{
    timestamps: true
})

export const AcceptedBooking = mongoose.model("AcceptedBooking", acceptedBookingSchema);