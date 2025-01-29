import { validationResult } from "express-validator";

export const validarCampos= (req,res,next)=>{ // Ayuda a que no hayan errores en la respuesta
    const errores = validationResult(req)

    if (errores.isEmpty()) {
        return res.status(400).json(errores)
    }


    next()
}