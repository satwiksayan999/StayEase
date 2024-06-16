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

export type HotelSearchResponse = {
    data : HotelType[] ,
    pagination :{
        total : number ,
        page : number ,
        pages : number 
    };

};