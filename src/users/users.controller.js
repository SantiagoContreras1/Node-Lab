import { response,request } from "express";
import { hash } from "argon2";
import User from "./user.model.js"

export const getUsers = async (req= request, res=response) => {
    try {
        const {limite =10,desde=0}=req.query
        const query= {estado:true}  //Ver el estado sea true, solo de desactivan users, no se eliminan 

        console.log('FLAG1')
        const [total,users] = await Promise.all([
            User.countDocuments(query),
            User.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ])
        console.log('FLAG2')

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
                msg: "User not found"
            })
        }

        res.status(200).json({
            succes: true,
            user
        })

        
    } catch (error) {
        res.response(500).json({
            succes: false,
            msg: "Error al obtener usuario",
            error
        })
    }
}

export const updateUser = async (res,req = response) => {
    
    try {
        const {id}= req.params //lo que le ingresamos a la direccion
        const {_id,password,email,...data} = req.body

        if(password){
            data.password = await hash(password)
        }
        
        const user = await User.findByIdAndUpdate(id,data,{new:true})

        res.status(200).json({
            succes: true,
            msg:'Usuario editado exitosamente!',
            user
        })
        
    } catch (error) {
        res.response(500).json({
            succes: false,
            msg: "Error al actualizar usuario",
            error
        })
    }
}