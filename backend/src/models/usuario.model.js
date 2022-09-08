import mongoose from "mongoose";
const { Schema, model } = mongoose;


const userSchema = new mongoose.Schema ({
        nombre:{
            type:String,
            required:true
        },
        correo:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
    },
    {
        timestamps:true,
    }
);

const User = model('usuario', userSchema);

export default User;