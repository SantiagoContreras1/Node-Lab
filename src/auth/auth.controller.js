import Usuario from '../users/user.model.js'
import { hash,verify } from "argon2";
import {generarJWT} from '../helpers/generate-jwt.js'

export const login= async(req,res)=>{
    const {email,password,username} = req.body

    try {
        const user = await Usuario.findOne({
            $or: [{email},{username}]
        })


        // *****VALIDACIONES***********
        if (!user) {
            return res.status(400).json({
                msg: 'Credenciales incorrectas, el correo no esta registrado'
            })
        }

        if (!user.estado) {
            return res.status(400).json({
                msg: 'El usuario no existe en la DB'
            })
        }
        
        //BCrypt Permite comparar passwords
        const validPass = await verify(user.password,password)
        if (!validPass) {
            return res.status(400).json({
                msg: 'La contraseña es incorrecta'
            })
        }
        
        // *****VALIDACIONES***********



        const token = await generarJWT(user.id)
        return res.status(200).json({
            msg: 'Usuario Correcto',
            userDetails:{
                username: user.username,
                token: token,
                profilePicture: user.profilePicture
            }
        })

    } catch (e) { 

        console.log(e)
        
        return res.status(500).json({
            message: 'Comuniquese con su admin',
            error: e.message, // Devuelve el mensaje de error
            stack: e.stack    // Devuelve el stack trace para más detalles
        })
    }

}

export const register = async(req,res)=>{
    
    try {
        const data = req.body // Accede a la data del body
        let profilePicture = req.file ? req.file.filename :null // Traer la imagen

        const encryptedPassword = await hash(data.password)
        
        const user = await Usuario.create({
            name: data.name,
            surname: data.surname,
            username: data.username,
            email: data.email,
            phone: data.phone,
            password: encryptedPassword,
            rol: data.rol,
            profilePicture
        })

        return res.status(200).json({
            message: "User recibed",
            userDetails:{
                user: user.email
            }
        })


    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message: "User registration failed",
            error: error.message
        })
    }
}