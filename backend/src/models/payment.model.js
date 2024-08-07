import mongoose,{Schema} from "mongoose";

const paymentSchema = new Schema({
    amount:{
        type: Number,
        required: true
    },
    paymentStatus:{
        type: String,
        enum: ["pending","completed"],
        required: true
    },
    pendingBooking:{
        type: Schema.Types.ObjectId,
        ref: "PendingBooking"
    },
    acceptedBooking:{
        type: Schema.Types.ObjectId,
        ref: "AcceptedBooking"
    },
},{
    timestamps: true

})

export const Payment = mongoose.model("Payment", paymentSchema);