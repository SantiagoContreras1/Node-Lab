import jwt from "jsonwebtoken";

export const generarJWT = (uid=' ')=>{ // Devuelve una promesa
    return new Promise((resolve,reject)=>{
        const payload = {uid} // Se carga la data del usuario que posee este ID

        // Generar token
        jwt.sign(
            // Pasar la data
            payload, // Envia la data
            process.env.SECRETPRIVATYKEY, //Envia mi firma
            {
                expiresIn: '1h'
            },
            (err,token)=>{ // Callback
                err ? (console.log(err),reject('No se pudo generar el token')) : (resolve(token))
            }
        )
    })

}