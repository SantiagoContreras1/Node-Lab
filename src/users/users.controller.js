import { response,request } from "express";
import { hash } from "argon2";
import User from "./user.model.js";

export const getUsers = async (req= request, res=response) => {
    try {
        const {limite =10,desde=0}=req.query
        const query= {estado:true}  //Ver el estado sea true, solo de desactivan users, no se eliminan 

        const [total,users] = await Promise.all([
            User.countDocuments(query),
            User.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ])

        res.status(200).json({
            succes:true,
            total,
            users
        })

    } catch (error) {
        res.status(500).json({
            succes: false,
            msg: "Error al obtener usuarios",
            error
        })
    }
}

export const getUserById = async (req,res) => {
    try {
        const {id}= req.params

        const user = await User.findById(id)

        if (!user) {
            return res.status(404).json({
                succes: false,
                msg: "User not found :c"
            })
        }

        res.status(200).json({
            succes: true,
            user
        })

        
    } catch (error) {
        res.status(500).json({
            succes: false,
            msg: "Error al obtener usuario",
            error
        })
    }
}

export const updateUser = async (req,res = response) => { 
    
    try {
        const {id}= req.params //lo que le ingresamos a la direccion
        const {_id,password,email,...data} = req.body // Excluir campos que no deben ser editados

        if(password){
            data.password = await hash(password) // Encripta la password
        }
        
        const user = await User.findByIdAndUpdate(id,data,{new:true}) // Actualizacion

        res.status(200).json({
            succes: true,
            msg:'Usuario editado exitosamente!',
            user
        })
        
    } catch (error) {
        res.status(500).json({
            succes: false,
            msg: "Error al actualizar usuario",
            error
        })
    }
}

export const updatePass = async (req,res) => {
    console.log('FLAG 2');
    console.log('ID recibido:', req.params.id);
    console.log('Body recibido:', req.body);
    try {
        
        const {id}= req.params // ID del usuario
        const {password} = req.body // Extrae el password

        if(!password){
            return res.status(400).json({
                succes: false,
                msg: "Password is required"
            });
            
        }

        const hashedPassword = await hash(password)
        
        const user = await User.findByIdAndUpdate(
            id,
            {password: hashedPassword},
            {new:true} // Retorna el usuario actualizado
        )

        if (!user) {
            return res.status(404).json({
                succes: false,
                msg: "User not found :C"
            });
        }

        res.status(200).json({
            succes: true,
            msg:'Contraseña editada exitosamente!',
            user
        })
        
        
    } catch (error) {
        console.error("Error en updatePass:", error); // Imprimir el error en consola
        res.status(500).json({
            succes: false,
            msg: "Error al actualizar contraseña",
            error: error.message
        })
    }
}