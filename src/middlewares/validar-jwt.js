import jwt from 'jsonwebtoken'

import usuario from '../users.model.js'

// El next define que es un middleware
export const validarJWT = async(req,res,next)=>{ // req: Peticion al server CRUD. Respones: Lo que nos responde el server
    const token = req.header('x-token')

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }

    try {
        const {uid}= jwt.verify(token,process.env.SECRETPRIVATYKEY) // Verificamos nuestro token, Nuestra firma del .env

        const usuario = await usuario.findById(uid)

        if (!usuario) {
            return res.status(401).json({
                msg: 'El usuario no existe en la DB'
            })
        }

        // Verifica que el usuario este activo
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'El usuario no esta activo'
            })
        }

        //Añadir el user al request
        req.usuario= usuario

        // Indica que despues de finalizar el middleware pueda continuar con las siguientes validaciones
        next()


    } catch (e) {
        console.log(e)
        res.status(401).json({
            msg: 'Token no válido'
        })
    }
}