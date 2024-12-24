import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Provide userName"]
    },
    email:{
        type:String,
        required:[true,"Please Provide User Email"],
        minLength:4,
        maxLength:50,
        unique:true,
        match:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    },
    phone:{
        type:String,
        required:[true,"Please Provide User Phone "],
        minLength:5,
        maxLength:20,
        unique:true
    },
    password:{
        type:String,
        required:[true,"Please Provide A Valid User Password"],
        minLength:5,
        maxLength:20,
    },
    address:{
        type:Object,
        default:{
            line1: "",
            line2: ""
        }
    },
    image:{
        type:String,
        required:true,
        default:"https://res.cloudinary.com/dsx0zkwy9/image/upload/v1735060370/qkumdbqdr5jb0k540oau.png"
    },
    gender:{
        type:String,
        enum:["Male","female"],
        default:"Male",
    },
    dob:{
        type:Date,
        default:Date.now()
    },
    role:{
        type:String,
        enum:["User","Admin"],
        default:"user"
},

},{ collection: "users" ,timestamps:true,minimize:false});

userSchema.methods.createJWT=function (){
    return jwt.sign({userID:this._id,email:this.email,role:this.role,name:this.name},
        process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFETIMIE})
};
userSchema.methods.getName=function (){
    return this.name;
}
userSchema.methods.getEmail=function (){
    return this.email
};
userSchema.pre('save',async function (next){
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
    next()
})
userSchema.methods.comparePassword=async function(userPass){
    return await bcrypt.compare(userPass, this.password);
}

const UserModel= mongoose.models.user || mongoose.model('user',userSchema);
export default UserModel
