import mongoose , {Schema} from "mongoose";
import { Vendor } from "./vendor.model.js";

const acceptedExperienceSchema = new Schema({
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
        type: [String],
    },
    description:{
        type: String,
        required: true,
    },
    termsAndConditions:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    variants:{
        type: [Schema.Types.ObjectId],
        ref: "AcceptedExperience"
    },
    addOns:{
        type: [String]
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
    }
})


export const AcceptedExperience = mongoose.model("AcceptedExperience", acceptedExperienceSchema);