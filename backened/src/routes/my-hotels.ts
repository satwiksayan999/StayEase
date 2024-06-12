import express,{Request , Response } from "express";
import multer from 'multer';
import cloudinary from "cloudinary";
import Hotel, { HotelType } from "../models/hotel";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";

const router = express.Router();

const storage=multer.memoryStorage();
const upload=multer({
   storage:storage ,
   limits:{
    fileSize: 5*1024*1024 //5MB 
   }
});

// api/my-hotels
router.post("/" , verifyToken , [ 

    body("name").notEmpty().withMessage(" name is required ") ,
    body("city").notEmpty().withMessage(" city is required ") ,
    body("country").notEmpty().withMessage(" country is required ") ,
    body("description").notEmpty().withMessage(" description is required ") ,
    body("type").notEmpty().withMessage(" type is required ") ,
    body("pricepernight").notEmpty().isNumeric().withMessage("pricepernight is required and must be a number") ,
    body("facilities").notEmpty().isArray().withMessage("facilities are required ") ,


],upload.array("imagefiles" , 6) ,async(req:Request , res:Response )=>{

    try{

        const imagefiles = req.files as Express.Multer.File[];
        const newHotel:HotelType = req.body;

        //1.upload the image to cloudinary

        const uploadPromises = imagefiles.map( async(image)=>{
            const b64=Buffer.from(image.buffer).toString("base64");
            let dataURI= "data:" + image.mimetype + ";base64," + b64;
            const res = await cloudinary.v2.uploader.upload(dataURI);
            return res.url;

        });

        // 2. if the upload is successfull add the urls to the newHotel 
        const imageUrls = await Promise.all(uploadPromises);
        newHotel.imageUrls = imageUrls;
        newHotel.lastupdated = new Date();  // initially there is no date 
        newHotel.userId=req.userId;

        //3.save the new hotel to our database
        const hotel= new Hotel(newHotel);
        await hotel.save();

        //4.return a 201 status 
        res.status(201).send(hotel);


    }catch(e){
        console.log("Error creating hotel :" , e );
        res.status(500).json({message: "Something Went Wrong"});

    }

});

export default router;