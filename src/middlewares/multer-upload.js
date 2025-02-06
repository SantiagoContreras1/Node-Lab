import multer from "multer";
import {dirname,extname,join} from "path"
import { fileURLToPath } from "url";


const CURRENT_DIR= dirname(fileURLToPath(import.meta.url))
const MINETYPES= ["image/jpeg","image/png","image/jpg"]
const MAX_SIZE = 10000000; // Megabytes

const createMulterConfig = (destinationPath)=>{
    return multer({
        storage: multer.diskStorage({
            destination: (req,file,cb)=>{
                const fullPath= join(CURRENT_DIR,destinationPath)
                req.filePath= fullPath
                cb(null,fullPath)
            },
            filename: (req,file,cb)=>{
                const fileExtension= extname(file.originalname) // Extraer la extension del archivo
                const fileOGname= file.originalname.split(fileExtension)[0]
                cb(null,`${filename}-${Date.now()}${fileExtension}`)
            }
        }),
        fileFilter:(req,file,cb)=>{
            if (MINETYPES.includes(file.mimetype)) cb(null,true)
            else cb(new Error`ONly ${MIMETYPES.join(" ")} minetypes are allowed`)
        },
        limits:{
            fieldSize: MAX_SIZE
        }


    })
}

export const uploadProfilePricture= createMulterConfig("../public/uploads//profile-pictures")
export const uploadPetPictures= createMulterConfig("../public/uploads//pets-pictures")