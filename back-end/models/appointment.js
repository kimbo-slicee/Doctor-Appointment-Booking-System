import mongoose from "mongoose";
const appointmentSchema=new mongoose.Schema({
    userIs:{
        type:String,
        required:false
    },
    docId:{

    },
    slotDate:{

    },
    
    })
const AppointmentModel=mongoose.models.appointment || mongoose.model('appointment',appointmentSchema);