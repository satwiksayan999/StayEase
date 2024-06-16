import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { useSearchContext } from "../../contexts/SearchContext";
import { useAppContext } from "../../contexts/AppContext";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
    hotelId: string,
    pricepernight: number
}

type GuestInfoFormData = {
    checkin: Date,
    checkout: Date,
    adultcount: number,
    childcount: number

}

const GuestInfoForm = ({ hotelId, pricepernight }: Props) => {

    const search = useSearchContext();
    const {isLoggedIn} = useAppContext();
    const navigate = useNavigate();
    const location = useLocation();

    const { watch, register, handleSubmit, setValue, formState: { errors } } = useForm<GuestInfoFormData>({ defaultValues: { checkin: search.checkin, checkout: search.checkout, adultcount: search.adultcount, childcount: search.childcount } });

    const checkin = watch("checkin");
    const checkout = watch("checkout");
    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);

    const onSignInClick = (data:GuestInfoFormData) =>{
        search.saveSearchValues("",data.checkin , data.checkout , data.adultcount , data.childcount);
        navigate("/sign-in" , {state:{from:location}});

    };

    const onSubmit= (data:GuestInfoFormData) =>{
        search.saveSearchValues("",data.checkin , data.checkout , data.adultcount , data.childcount);
        navigate(`/hotel/${hotelId}/booking`);

    };

    return (
        <div className="flex flex-col p-4 gap-4 bg-blue-200">

            <h3 className="text-md font-bold">Rs. {pricepernight}</h3>

            <form onSubmit={isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)}>

                <div className="grid grid-cols-1 gap-4 items-center">
                    <div>
                        <DatePicker  selected={checkin} onChange={(date) => setValue("checkin", date as Date)} selectsStart startDate={checkin} endDate={checkout} minDate={minDate} maxDate={maxDate} placeholderText="check-in Date" className="min-w-full p-2 bg-white focus:outline-none" wrapperClassName="min-w-full" />
                    </div>

                    <div>
                        <DatePicker  selected={checkout} onChange={(date) => setValue("checkout", date as Date)} selectsStart startDate={checkin} endDate={checkout} minDate={minDate} maxDate={maxDate} placeholderText="check-out Date" className="min-w-full p-2 bg-white focus:outline-none" wrapperClassName="min-w-full" />
                    </div>

                    <div className="flex bg-white px-2 py-1 gap-2">

                        <label className="flex items-center">
                            Adults:
                            <input className="w-full p-1 focus:outline-none font-bold" type="number" min={1} max={20} {...register("adultcount", { required: "This field is required", min: { value: 1, message: "There must be atleast one adult" }, valueAsNumber: true })}></input>
                        </label>

                        <label className="flex items-center">
                            Children:
                            <input className="w-full p-1 focus:outline-none font-bold" type="number" min={0} max={20} {...register("childcount", { valueAsNumber: true })}></input>
                        </label>
                        {errors.adultcount && (<span className="text-red-500 text-sm font-semibold">{errors.adultcount.message}</span>)}

                    </div>

                    {isLoggedIn ? (<button className="bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-500 text-xl">Book Now</button>) : (<button className="bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-500 text-xl">Sign in to Book</button>)}


                </div>

            </form>
        </div>
    )

};

export default GuestInfoForm;


