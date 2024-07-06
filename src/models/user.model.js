import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema= new Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
        },
        fullName:{
            type:String,
            required:true,
            trim:true,
            index:true
        },
        avatar:{
            type:String,
            required:true,
        },
        conerImage:{
            type:String,
        },
        watchHistory:{
            type:Schema.Types.ObjectId,
            ref:"Video"
        },
        password:{
            type:String,
            required:[true, 'Password is required'],
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
        },
        refreshToken:{
            type:String
        }

    },{timestamps:true}
);

//encryptinf the password using bcrypt inside a pre hook provided by momgoose
userSchema.pre("save", async function (next) {
    if(this.isModified("password")){

        this.password= bcrypt.hash(this.password,10)
        next()
    }else{
        return next();
    }
})



userSchema.methods.isPasswordCorrect= async function(password){
   return await bcrypt.compare(password,this.password)
} 

//for creating token we pass paylode, access token secret key,expiry
userSchema.methods.generateAccessToken= function(){
  return jwt.sign(
    {
        _id:this._id,
        email:this.email,
        username:this.username,
        fullName:this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
   )
}

//it contain less info as it keeps on refreshing
userSchema.methods.generateRefreshToken= function(){
    return jwt.sign(
        {
            _id:this._id,
     
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
       )
    
}
    
export const User=mongoose.model("User",userSchema);