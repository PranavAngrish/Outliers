import mongoose , {Schema} from "mongoose";
import { Vendor } from "./vendor.model.js";

const imageSchema = new Schema({
    url: {
        type: String,
        required: true,
    },
    publicId: {
        type: String,
        required: true,
    },
    alt: String,  // Optional field for alternative text
});



const pendingExperienceSchema = new Schema({
    title:{
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        index: true
    },
    vendor:{
        type: Schema.Types.ObjectId,
        ref: "Vendor"
    },
    images:{
        type: [imageSchema],
    },
    description:{
        type: String,
        required: true,
    },
    
    variants:{
        type: [Schema.Types.ObjectId],
        ref: "AcceptedExperience"
    },

    timeSlots:{
        type: [Date],
        required: true
    },
    MaximumCapacity:{
        type: Number,
        required: true
    },
    cancellationPeriod:{
        type: Number,
        required: true
    },
    toBeUpdatedExperience:{
        type: [Schema.Types.ObjectId],
        ref:"UpdatedExperience"
    },
    state:{
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    city:{
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    category:{
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    status:{
        type: String,
        enum: ["pending","accepted"],
        default: "pending"
    },
    startDate:{
        type: Date,
        required: true,
        default: Date.now()
    },
    endDate:{
        type: Date,
        required: true,
        default: Date.now() + 1
    },
    duration:{
        type: Number,
        required: true
    },
    overview:{
        type: String,
        required: true
    },
    itinerary:{
        type: [String],
        required: true
    },
    highlights:{
        type: [String],
        required: true
    },
    inclusions:{
        type: [String],
        required: true
    },
    cancellationPolicy:{
        type: String,
        required: true
    },
    knowBeforeYouGo:{
        type: [String],
        required: true
    },
    faq:{
        type:[{question: String, answer: String}],
    },
    boardingLocationLink:{
        type: String,
        required:true
    },
    basePrice:{
        type: Number,
        required: true
    },
    taxes:{
        type: Number,
        required: true
    },
    fees:{
        type: Number,
        required: true
    }


})

export const PendingExperience = mongoose.model("PendingExperience", pendingExperienceSchema);