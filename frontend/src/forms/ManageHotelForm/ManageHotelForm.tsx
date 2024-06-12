import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";

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
    adultcount:number ,
    childcount:number
};


type Props = {
    onSave : (HotelFormData : FormData) =>void;
    isLoading:boolean;
}



const ManageHotelForm = ( {onSave , isLoading } : Props) =>{

    const formMethods = useForm<HotelFormData>();
    const { handleSubmit }= formMethods;

    const onSubmit = handleSubmit((FormDataJson:HotelFormData)=>{
        //create new FormData object and call our API
        console.log(FormData);
        
        const formData=new FormData();
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