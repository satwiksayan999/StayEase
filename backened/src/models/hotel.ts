import mongoose from "mongoose"
import { BookingType, HotelType } from "../shared/types";

const bookingSchema = new mongoose.Schema<BookingType>({
    firstname:{type:String , required : true} ,
    lastname:{type:String , required : true} ,
    email:{type:String , required : true} ,
    adultcount:{type:Number , required : true} ,
    childcount:{type:Number , required:true} ,
    checkin:{type:Date , required : true} ,
    checkout:{type:Date , required : true} ,
    userId:{type:String , required : true} ,
    totalCost:{type:Number , required : true} ,
    

});

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
    lastupdated : {type:Date , required:true } ,
    bookings: [bookingSchema]
});

const Hotel = mongoose.model<HotelType>("Hotel" , hotelSchema );
export default Hotel;