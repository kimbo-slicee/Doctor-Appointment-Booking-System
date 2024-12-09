import mongoose from "mongoose";
const appointmentSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:[true,"You Must Provide a User Id"]
    },
    docId:{
        type:String,
        required:[true,"You Must Provide a Doctor ID"]
    },
    slotDate:{
        type:String,
        required:[true,"You Must Provide a Slot Date"]
    },
    slotTime:{
        type:String,
        required:[true,"You Must Provide a Slot Time"]
    },
    userData:{
        type:Object,
        required:[true,"User Data is Missing"]
    },
    docData:{
        type:Object,
        required:[true,"Doctor Data is Missing"]
    },
    amount:{
        type:Number,
        required:[true,"Appointment Amount is Missing"]
    },
    data:{
    type:Number,
    required:[true,"Appointment Date is Missing"]

    },
    cancelled:{
        type:Boolean,
        default:false
    },
    payment:{
        type:Boolean,
        default:false
    },
    isCompleted:{
        type:Boolean,
        default:false
    }
    },{ timestamps: true,collection: 'appointment'})
const AppointmentModel=mongoose.models.appointment || mongoose.model('appointment',appointmentSchema);
export default AppointmentModel;