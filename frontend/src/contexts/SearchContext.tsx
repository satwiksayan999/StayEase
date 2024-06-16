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

    const [destination , setdestination ] = useState<string>("");
    const [checkin , setcheckin] = useState<Date>(new Date());
    const [checkout , setcheckout] = useState<Date>(new Date());
    const [adultcount , setadultcount] = useState<number>(1);
    const [childcount , setchildcount ] = useState<number>(0);
    const [hotelId, sethotelId] = useState<string>("");

    const saveSearchValues = (destination : string , checkin : Date , checkout:Date  , adultcount:number ,childcount: number, hotelId?:string ) => {
        setdestination(destination);
        setcheckin(checkin);
        setcheckout(checkout);
        setadultcount(adultcount);
        setchildcount(childcount);
        if(hotelId){
            sethotelId(hotelId);
        }
    }

     return(
        <SearchContext.Provider value ={{ destination , checkin , checkout , adultcount ,childcount , hotelId , saveSearchValues }} >
            {children}
        </SearchContext.Provider>
     );
}

export const useSearchContext = () =>{
    const context = useContext(SearchContext);
    return context as SearchContext;
}