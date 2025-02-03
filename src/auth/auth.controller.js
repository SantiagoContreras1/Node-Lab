import Usuario from '../users/user.model.js'
import { hash,verify } from "argon2";
import {generarJWT} from '../helpers/generate-jwt.js'

export const login= async(req,res)=>{
    console.log('Luis')
    const {email,password,username} = req.body

    try {

        const lowerEmail = email?email.toLowerCase():null
        const lowerUsername = username?username.toLowerCase():null

        const user = await Usuario.findOne({
            $or: [{email: lowerEmail},{username: lowerUsername}]
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
        console.log('Manuel')
        if (!validPass) {
            return res.status(400).json({
                msg: 'La contraseña es incorrecta'
            })
        }
        
        // *****VALIDACIONES***********



        console.log('FLAG')
        const token = await generarJWT(user.id)
        console.log('Despues')
        res.status(200).json({
            msg: 'Usuario Correcto',
            userDetails:{
                username: user.username,
                token: token,
                profilePicture: user.profilePicture
            }
        })

    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Comuniquese con su admin',
            error: e.message
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
            password: data.password,
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