import { FormEvent, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import { useNavigate } from "react-router-dom";


const SearchBar = () => {
    const search = useSearchContext();
    const navigate = useNavigate();

    const [destination, setdestination] = useState<string>(search.destination);
    const [checkin, setcheckin] = useState<Date>(search.checkin);
    const [checkout, setcheckout] = useState<Date>(search.checkout);
    const [adultcount, setadultcount] = useState<number>(search.adultcount);
    const [childcount, setchildcount] = useState<number>(search.childcount);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()  //prevent post request

        search.saveSearchValues(destination, checkin, checkout, adultcount, childcount);
        navigate("/search");
    };

    const minDate=new Date();
    const maxDate=new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);

    return (
        <form onSubmit={handleSubmit} className="-mt-8 p-3 bg-orange-300 rounded shadow-md grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 items-center gap-4">
            <div className="flex flex-row flex-1 items-center bg-white p-2">
                <MdTravelExplore size={25} className="mr-2" />
                <input placeholder="where are you going?" className="text-md w-full focus:outline-none" value={destination} onChange={(event) => { setdestination(event.target.value) }} />
            </div>

            <div className="flex bg-white px-2 py-1 gap-2">

                <label className="flex items-center">
                    Adults:
                    <input className="w-full p-1 focus:outline-none font-bold" type="number" min={1} max={20} value={adultcount} onChange={(event) => { setadultcount(parseInt(event.target.value)) }}></input>
                </label>

                <label className="flex items-center">
                    Children:
                    <input className="w-full p-1 focus:outline-none font-bold" type="number" min={0} max={20} value={childcount} onChange={(event) => { setchildcount(parseInt(event.target.value)) }}></input>
                </label>

            </div>

            <div>
                <DatePicker selected={checkin} onChange={(date) => setcheckin(date as Date)} selectsStart startDate={checkin} endDate={checkout} minDate={minDate} maxDate={maxDate} placeholderText="check-in Date" className="min-w-full p-2 bg-white focus:outline-none" wrapperClassName="min-w-full"/>
            </div>

            <div>
                <DatePicker selected={checkout} onChange={(date) => setcheckout(date as Date)} selectsStart startDate={checkin} endDate={checkout} minDate={minDate} maxDate={maxDate} placeholderText="check-out Date" className="min-w-full p-2 bg-white focus:outline-none" wrapperClassName="min-w-full"/>
            </div>

            <div className="flex gap-1">
                <button className="w-2/3 bg-blue-600 text-white h-full p-2 font-bold text=xl hover:bg-blue-500">
                    Search
                </button>

                <button className="w-1/3 bg-red-600 text-white h-full p-2 font-bold text=xl hover:bg-red-500">
                   Clear
                </button>

            </div>
        </form>
    )

};

export default SearchBar;