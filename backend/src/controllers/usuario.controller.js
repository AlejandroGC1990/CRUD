import User from "../models/usuario.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import message from "../utils/message.js";

const {overallMessage} = message;

const userCtrl = {}

userCtrl.register=async (req,res)=>{
    try{
        const data = req.body;
        //verificar que el correo no exista
        const answer = await User.findOne({correo:data.correo});
        if (answer) {
            return overallMessage(res, 400, false, "", "El correo ya existe");
        }
        //encriptar contraseña
        data.password = await bcrypt.hash(data.password, 10);
        const newUser = await User.create(data);
        //crear token
        const token = jwt.sign({_id:newUser._id}, "secreta");
        overallMessage(res, 201, true, {...answer._doc, password:null, token}, "Bienvenido");
    } catch (error) {
        overallMessage(res, 500, false, "", error.message);
    }
};

userCtrl.login = async (req, res) => {
    try {
        const data = req.body
        const answer = await User.findOne({correo: data.correo});
        if (!answer) {
            return overallMessage(res, 400, false, "", "El correo no existe");
        }
        const match= await bcrypt.compare(data.password, answer.password); 
        if(match) {
            const token = jwt.sign({_id: newUser._id}, "secreta");
            return overallMessage(res, 201, true, {...answer._doc, password:null, token}, "Bienvenido");
        }
        return overallMessage(res, 400, false, "", "La constraseña es incorrecta");
    } catch (error) {
        overallMessage(res, 500, false, "", error.message);
    }
}

export default userCtrl;