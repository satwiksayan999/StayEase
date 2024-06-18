import React, { useContext, useState } from "react";

type SearchContext = {
   destination : string ;
   checkin : Date;
   checkout : Date ;
   adultcount : number ;
   childcount : number ;
   hotelId : string ;
   saveSearchValues:(destination : string , checkin : Date , checkout : Date , adultcount : number , childcount : number ) => void ;
};

const SearchContext = React.createContext<SearchContext | undefined>(undefined) ;

type SearchContextProviderProps = {
    children : React.ReactNode;
}

export const SearchContextProvider = ({children} : SearchContextProviderProps) =>{

    const [destination , setdestination ] = useState<string>(()=>sessionStorage.getItem("destination") || "");
    const [checkin , setcheckin] = useState<Date>(()=> new Date(sessionStorage.getItem("checkin") || new Date().toISOString()));
    const [checkout , setcheckout] = useState<Date>(()=> new Date(sessionStorage.getItem("checkout") || new Date().toISOString()));
    const [adultcount , setadultcount] = useState<number>(()=> parseInt(sessionStorage.getItem("adultcount") || "1"));
    const [childcount , setchildcount ] = useState<number>(()=> parseInt(sessionStorage.getItem("childcount") || "1"));
    const [hotelId, sethotelId] = useState<string>(()=> sessionStorage.getItem("hotelId") || "");

    const saveSearchValues = (destination : string , checkin : Date , checkout:Date  , adultcount:number ,childcount: number, hotelId?:string ) => {
        setdestination(destination);
        setcheckin(checkin);
        setcheckout(checkout);
        setadultcount(adultcount);
        setchildcount(childcount);
        if(hotelId){
            sethotelId(hotelId);
        }

        sessionStorage.setItem("destination" , destination);
        sessionStorage.setItem("checkin" , checkin.toISOString());
        sessionStorage.setItem("checkout" , checkout.toISOString());
        sessionStorage.setItem("adultcount" , adultcount.toString());
        sessionStorage.setItem("childcount" , childcount.toString());

        if(hotelId){
            sessionStorage.setItem("hotelId" , hotelId);
        }
    };

     return(
        <SearchContext.Provider value ={{ destination , checkin , checkout , adultcount ,childcount , hotelId , saveSearchValues }} >
            {children}
        </SearchContext.Provider>
     );

};

export const useSearchContext = () =>{
    const context = useContext(SearchContext);
    return context as SearchContext;
}