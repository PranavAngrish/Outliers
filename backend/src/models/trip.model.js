import mongoose , {Schema} from "mongoose";

const tripSchema = new Schema({
    experience:{
        type: Schema.Types.ObjectId,
        ref: "AcceptedExperience",
        required: true
    },
    Vendor:{
        type: Schema.Types.ObjectId,
        ref: "Vendor",
        required: true
    },
    bookings:{
        type: Schema.Types.ObjectId,
        ref: "AcceptedBooking"
    },
    payment:{
        type : [Schema.Types.ObjectId],
        ref: "Payment"
    },
    dateTime:{
        type: Date,
        required: true
    },
    statusOfTrip:{
        type: String,
        enum: ["upcoming","completed","cancelled"],
        required: true
    },
    numberOfPeopleOnboard:{
        type: Number,
        required: true
    }
})


export const Trip = mongoose.model("Trip", tripSchema);