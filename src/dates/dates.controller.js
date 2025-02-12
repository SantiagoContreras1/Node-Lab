import { response,request } from "express";
import DateModel from "./date.model.js"
import User from "../users/user.model.js";
import mongoose from "mongoose";

// POST
export const addDate = async (req,res) => {
    try {

        const data = req.body // Este
        const user = await User.findOne({email: data.email})

        if(!user){
            return res.status(404).json({
                success: false,
                message: 'Propietario no encontrado'
            })
        }

        const date = new DateModel({
            date: new Date(data.date), // Se escribe aqui este
            description: data.description,
            email: data.email
        })

        await date.save()

        res.status(200).json({
            success: true,
            message: 'Fecha agregada correctamente',
            data: date
        })
    } catch (error) {
        console.error("Error en addDate:", error);
        res.status(500).json({
            success:false,
            message: "Failed to add date",
            error: error.message || error
        })
    }
}



// LISTAR
export const getDates = async (req=request,res=response) => {
    try {
        const {limite=10,desde=0} = req.query
        const query = {}

        const [total,dates] = await Promise.all([
            DateModel.countDocuments(query),
            DateModel.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ])

        res.status(200).json({
            success:true,
            total,
            dates
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message: "Error listando las dates",
            error: error.message
        })
    }
}

// GET BY ID
export const searchDate = async (req,res) => {

    const {id} = req.params
    try {
        const date = await DateModel.findById(id)

        if (!date) {
            res.status(404).json({
                success:false,
                message: "Date no encontrada"
            })
        }

        res.status(200).json({
            success: true,
            date
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message: "Error buscando la date",
            error: error.message
        })
    }
}

export const deleteDate = async (req,res) => {

    const {id} = req.params
    
    try {
        console.log("FLAG ONEEE")
        // Validar si el id es un ObjectId válido de MongoDB
        if(!mongoose.Types.ObjectId.isValid(id)){ // --> Verifica si el id es válido antes de buscar.
            console.log("FLAG TWO")
            return res.status(400).json({
                success: false,
                message: 'Id no válido'
            })
        }
        
        const deleteDate = await DateModel.findByIdAndUpdate(id, {$set:{status:false}},{new:true})

        if(!deleteDate){
            return res.status(404).json({
                succes: false,
                message: 'Date no encontrada'
            })
        }
        
        res.status(200).json({
            success: true,
            message: "Date eliminada"
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message: "Error eliminando la date",
            error: error.message
        })
    }
}

export const updateDate = async (req,res) => {
    try {
        const {id} = req.body
        const {...data} = req.body

        const date = await DateModel.findByIdAndUpdate(id,data,{new:true})

        res.status(200).json({
            success: true,
            message: "Date actualizada",
            data: date
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error actualizando la date",
            error: error.message
        })
    }
}