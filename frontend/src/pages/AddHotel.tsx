import { useMutation } from "react-query";
import { useAppContext } from "../contexts/AppContext";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import * as apiClient from '../api-clients'

const AddHotel = () =>{

      const {showToast} = useAppContext();

      const {mutate , isLoading} = useMutation(apiClient.addMyHotel , {
            onSuccess: () =>{
                  showToast({message:"Hotel Saved!" , type:"SUCCESS"});
            } ,

            onError: ()=>{
                  showToast({message:"Error Saving Hotel!" , type:"ERROR"});
            }
      });

      const handleSave = (HotelFormData: FormData) =>{
            mutate(HotelFormData);
      }

      return<ManageHotelForm onSave={handleSave} isLoading={isLoading} /> //disable the save button when reqesting so that user does not make too many requests 
};

export default AddHotel;

