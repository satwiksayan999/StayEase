import mongoose from "mongoose"

export type HotelType = {
    _id:string ,
    userId:string ,
    name : string ,
    city:string ,
    country:string ,
    description:string ,
    type:string ,
    adultcount:number ,
    childcount:number ,
    facilities:string[] ,
    pricepernight:number ,
    starrating:number ,
    imageUrls:string[] ,
    lastupdated:Date ,
};

const hotelSchema = new mongoose.Schema<HotelType>({
    userId: {type:String , required:true } ,
    name: {type:String , required:true } ,
    city : {type:String , required:true } ,
    country : {type:String , required:true },
    description : {type:String , required:true } ,
    type : {type:String , required:true } ,
    adultcount : {type:Number , required:true } ,
    childcount : {type:Number , required:true } ,
    facilities : [{type:String , required:true }] ,
    pricepernight : {type:Number , required:true } ,
    starrating :  {type:Number , required:true , min:1 , max:5 } ,
    imageUrls: [{type:String , required:true }] ,
    lastupdated : {type:Date , required:true }

});

const Hotel = mongoose.model<HotelType>("Hotel" , hotelSchema );
export default Hotel;