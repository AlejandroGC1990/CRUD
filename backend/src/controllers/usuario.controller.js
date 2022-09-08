import User from "../models/usuario.model.js"

const userCtrl = {}

userCtrl.register=async (req,res)=>{
    try{
        const data = req.body;
        const existUser = await User.findOne({correo:data.correo});
        if (existUser) {
            return res.status(400).json({
                ok:false,
                message: "El correo ya existe"
            })
        }
        const newUser = await User.create(data);
        res.status(201).json({
            ok:true,
            message: "Usuario creado correctamente",
            data: newUser,
        })
    } catch (error) {
        res.status(500).json({
            ok:false,
            message: error.message,
        });
    }
};

export default userCtrl;