//creating the form

import { useForm } from "react-hook-form";
import * as apiClient from "../api-clients"
import { useMutation, useQueryClient } from "react-query";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

export type RegisterFormData = {
    firstname : string ,
    lastname : string ,
    email : string ,
    password : string ,
    confirmpassword : string 
}

const Register=()=>{
 
    const queryClient = useQueryClient();
    const navigate=useNavigate(); //

    const {showToast}  = useAppContext(); // for using toast

    const{register,watch,handleSubmit,formState:{errors}}= useForm<RegisterFormData>();

    const mutation=useMutation(apiClient.register , {
        onSuccess: async()=>{
            console.log("registration successfull");
            showToast({ message:"Registration Successfull" , type:"SUCCESS"})
            await queryClient.invalidateQueries("validateToken");
            navigate("/");
        } ,

        onError :(error:Error) =>{
            console.log(error.message);
            showToast({ message:error.message , type:"ERROR"})
        }
        
    })



    const onSubmit=handleSubmit((data)=>{
       // console.log(data);
        mutation.mutate(data);
    })

    return(
        <form className="flex flex-col gap-5" onSubmit={onSubmit} >
            <h2 className="text-3xl font-bold ">Create an Account</h2>
            <div className="flex flex-col md:flex-row gap-5">

                <label className="text-gray-700 text-sm font-bold flex-1">
                    firstname
                    <input className="border rounded w-full py-1 px-2 font-normal" {...register("firstname" ,{required:"This field is required"})}></input>
                    {errors.firstname && (
                        <span className="text-red-500">{errors.firstname.message}</span>
                    )}
                </label>

                <label className="text-gray-700 text-sm font-bold flex-1">
                    lastname
                    <input className="border rounded w-full py-1 px-2 font-normal" {...register("lastname" ,{required:"This field is required"})}></input>
                    {errors.lastname && (
                        <span className="text-red-500">{errors.lastname.message}</span>
                    )}
                </label>

            </div>

                <label className="text-gray-700 text-sm font-bold flex-1">
                    email 
                    <input type="email" className="border rounded w-full py-1 px-2 font-normal" {...register("email" ,{required:"This field is required"})}></input>
                    {errors.email && (
                        <span className="text-red-500">{errors.email.message}</span>
                    )}
                </label>


                <label className="text-gray-700 text-sm font-bold flex-1">
                    password 
                    <input type="password" className="border rounded w-full py-1 px-2 font-normal" {...register("password" ,{required:"This field is required" , minLength:{ value:6 , message:"password must be atleast 6 char long "}})}></input>
                    {errors.password && (
                        <span className="text-red-500">{errors.password.message}</span>
                    )}
                </label>


                <label className="text-gray-700 text-sm font-bold flex-1">
                    confirm password 
                    <input type="password" className="border rounded w-full py-1 px-2 font-normal" {...register("confirmpassword" , {validate:(val) =>{ 
                           if(!val)
                            {
                                return "This field is required";
                            }
                            else if(watch("password")!==val){
                                return "your password do not match ";
                            }
                    }})}></input>
                    {errors.confirmpassword && (
                        <span className="text-red-500">{errors.confirmpassword.message}</span>
                    )}
                </label>
         
         <span>
            <button type="submit" className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl">Create Account</button>
         </span>

        </form>
    );
}

export default Register;