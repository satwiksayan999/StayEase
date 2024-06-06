import { useMutation, useQueryClient } from "react-query";
import * as apiClient from '../api-clients'
import { useAppContext } from "../contexts/AppContext";


const SignOutButton =()=>{

    const {showToast}=useAppContext();
    const queryClient = useQueryClient();

    const mutation =useMutation(apiClient.signOut , {
        onSuccess: async()=>{
            //showToast
            await queryClient.invalidateQueries("validateToken");  //in app context iserror going to be true means isLoggedIn going to be false
            showToast({message:"Signed Out!" , type:"SUCCESS"});

        },
        onError:(error:Error)=>{
           //show toast 
            showToast({message:error.message , type:"ERROR"});
        },

    });

    const handleClick=()=>{
        mutation.mutate();
    }


   return(
    <button onClick={handleClick} className="text-blue-600 px-3 font-bold bg-white hover:bg-gray-100">Sign Out</button>
   );

};

export default SignOutButton;