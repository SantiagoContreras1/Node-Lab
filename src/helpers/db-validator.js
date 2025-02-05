import Rol from "../rol/rol.model.js";
import Usuario from "../users/user.model.js";



export const isValidRol = async(rol='')=>{
    const existenteRol = await Rol.findOne({rol})

    if (!existenteRol) {
        throw new Error(`El rol ${rol} es inexistente`)
    }
}


export const existentEmail=async(correo='')=>{
    const existenteEmail = await Usuario.findOne({correo})

    if (existenteEmail) {
        throw new Error(`El mail ${correo} ya existe`)
    }
}

export const existentUserById = async (id=" ") => {
    const userExist = await Usuario.findById(id)
    if (!userExist) {
        throw new Error(`El ID ${id} no existe`)
    }
}