import bcryptjs from "bcryptjs";
import Usuario from '../users/user.model.js'
import {generarJWT} from '../helpers/generate-jwt.js'

export const login= async(req,res)=>{
    const {correo,password} = req.body

    try {
        const user = await Usuario.findOne({correo})


        // *****VALIDACIONES***********
        if (!user) {
            return res.status(400).json({
                msg: 'Credenciales incorrectas, el correo no esta registrado'
            })
        }

        if (!user.estado) {
            return req.status(400).json({
                msg: 'El usuario no existe en la DB'
            })
        }

        //BCrypt Permite comparar passwords
        const validPass = bcryptjs.compareSync(password,user.password)

        if (!validPass) {
            return req.status(400).json({
                msg: 'La contraseña es incorrecta'
            })
        }

        // *****VALIDACIONES***********




        const token = await generarJWT(user.id)

        req.status(200).json({
            msg: 'Usuario Correcto',
            usuario,
            token
        })

    } catch (e) {
        console.log(e)
        req.status(500).json({
            msg: 'Comuniquese con su admin'
        })
    }

}

export const register = async(req,res)=>{

    const {nombre,correo,password,rol,phone} = req.body
    console.log(req.body)
    const user = new Usuario({nombre,correo,password,rol,phone})

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync() // Tipo de encrypt
    user.password = bcryptjs.hashSync(password,salt)

    await user.save()

    res.status(200).json({
        user
    })
}