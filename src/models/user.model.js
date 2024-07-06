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
        fullname:{
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
    
export const User=mongoose.model("User",userSchema);