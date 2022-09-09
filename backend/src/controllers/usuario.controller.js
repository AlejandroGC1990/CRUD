import User from "../models/usuario.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const userCtrl = {}

userCtrl.register=async (req,res)=>{
    try{
        const data = req.body;
        //verificar que el correo no exista
        const existUser = await User.findOne({correo:data.correo});
        if (existUser) {
            return res.status(400).json({
                ok:false,
                message: "El correo ya existe"
            })
        }
        //encriptar contraseña
        data.password = await bcrypt.hash(data.password, 10);
        const newUser = await User.create(data);
        //crear token
        const token = jwt.sign({_id:newUser._id}, "secreta");
        res.status(201).json({
            ok:true,
            message: "Usuario creado correctamente",
            data: {...newUser._doc, token},
          
        })
    } catch (error) {
        res.status(500).json({
            ok:false,
            message: error.message,
        });
    }
};

userCtrl.login = async (req, res) => {
    try {
        const data = req.body
        const existUser = await User.findOne({correo: data.correo});
        if (!existUser) {
            return res.status(400).json({
                ok: false,
                message: error.message,
            })
        }
        ///VOY POR AQUIIIIIIIIIIIIIIIIIIII 
    } catch (error) {
        res.status(500).json({
            ok:false,
            message: error.message,
        });
    }
}

export default userCtrl;