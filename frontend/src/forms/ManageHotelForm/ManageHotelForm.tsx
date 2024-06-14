import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";
import { HotelType } from "../../../../backened/src/shared/types";
import { useEffect } from "react";

export type HotelFormData = {
    name:string ,
    city:string,
    country:string,
    description:string,
    type:string,
    pricepernight:number,
    starrating:number,
    facilities:string[],
    imagefiles:FileList,
    imageUrls :string[] ,
    adultcount:number ,
    childcount:number
};


type Props = {
    hotel?: HotelType
    onSave : (HotelFormData : FormData) =>void;
    isLoading:boolean;
}



const ManageHotelForm = ( {onSave , isLoading , hotel } : Props) => {

    const formMethods = useForm<HotelFormData>();
    const { handleSubmit , reset }= formMethods;

    useEffect(()=>{
        reset(hotel) 
    } , [hotel,reset] )

    const onSubmit = handleSubmit((FormDataJson:HotelFormData)=>{

        //create new FormData object and call our API
        console.log(FormData);
        
        const formData=new FormData();

        if(hotel){
          formData.append("hotelId" , hotel._id);
        }

        formData.append("name" , FormDataJson.name);
        formData.append("city" , FormDataJson.city);
        formData.append("country" , FormDataJson.country);
        formData.append("description" , FormDataJson.description);
        formData.append("type" , FormDataJson.type);
        formData.append("pricepernight" , FormDataJson.pricepernight.toString());
        formData.append("starrating" , FormDataJson.starrating.toString());
        formData.append("adultcount" , FormDataJson.adultcount.toString());
        formData.append("childcount" , FormDataJson.childcount.toString());

        FormDataJson.facilities.forEach((facility,index) => {
            formData.append(`facilities[${index}]` , facility);
        });


      //[image1.jpg  , image2.jpg ,  image3.jpg]
      //imageUrls = [image1.jpg]
        if(FormDataJson.imageUrls){
            FormDataJson.imageUrls.forEach((url ,index) => {
                formData.append(`imageUrls[${index}]` , url );
            });
        };

        Array.from(FormDataJson.imagefiles).forEach((imagefile) =>{
            formData.append(`imagefiles`,imagefile)
        });

        onSave(formData);

    });

    return (
        <FormProvider {...formMethods}>
            <form className="flex flex-col gap-10" onSubmit={onSubmit}>
                <DetailsSection />
                <TypeSection />
                <FacilitiesSection />
                <GuestsSection />
                <ImagesSection />
                <span className="flex justify-end">
                    <button disabled={isLoading} type="submit" className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:bg-gray-500">{ isLoading ? "Saving..." : "Save" }</button>
                </span>
            </form>
        </FormProvider>
       
    )
};

export default ManageHotelForm;