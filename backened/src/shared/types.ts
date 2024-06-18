export type UserType = {
    _id:string ;
    email:string ;
    password:string ;
    firstname:string ;
    lastname :string ;
};

export type HotelType = {
    _id:string ;
    userId:string ;
    name : string ;
    city:string ;
    country:string ;
    description:string ;
    type:string ;
    adultcount:number ;
    childcount:number ;
    facilities:string[] ;
    pricepernight:number ;
    starrating:number ;
    imageUrls:string[] ;
    lastupdated:Date ;
    bookings : BookingType[];
};

export type BookingType = {
    _id: string;
    userId: string;
    firstname: string;
    lastname: string;
    email: string;
    adultcount: number;
    childcount: number;
    checkin: Date;
    checkout: Date;
    totalCost: number;
  };

export type HotelSearchResponse = {
    data : HotelType[] ,
    pagination :{
        total : number ,
        page : number ,
        pages : number 
    };

};

export type PaymentIntentResponse = {
    paymentIntentId:string ;
    clientSecret : string ;
    totalCost : number;

};