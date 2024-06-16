import { useSearchContext } from "../contexts/SearchContext";
import * as apiClient from "../api-clients"
import { useQuery } from "react-query";
import { useState } from "react";
import SearchResultCard from "../components/SearchResultCard";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";
import HotelTypesFilter from "../components/HotelTypesFilter";
import FacilitiesFilter from "../components/FacilitiesFilter";
import PriceFilter from "../components/PriceFilter";

const Search = () => {

    const search = useSearchContext();
    console.log(search);

    const [page, setpage] = useState<number>(1);
    const [selectedStars , setselectedStars] = useState<string[]>([]);
    const [selectedHotelTypes , setselectedHotelTypes] = useState<string[]>([]);
    const [selectedFacilities , setselectedFacilities] = useState<string[]>([]);
    const [selectedPrice , setselectedPrice] = useState<number | undefined>();
    const [sortOption , setsortOption] = useState<string>("");

    const searchParams = {
        destination: search.destination,
        checkin: search.checkin.toISOString(),
        checkout: search.checkout.toISOString(),
        adultcount: search.adultcount.toString(),
        childcount: search.childcount.toString(),
        page: page.toString() ,
        stars:selectedStars ,
        types:selectedHotelTypes ,
        facilities:selectedFacilities ,
        maxPrice : selectedPrice?.toString() ,
        sortOption
    }

    const { data: hotelData } = useQuery(["searchHotels", searchParams], () =>
        apiClient.searchHotels(searchParams)
    );

    const handleStarsChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        const starrating =event.target.value;

        setselectedStars((prevStars) => event.target.checked ? [...prevStars , starrating] : prevStars.filter((star) => star !== starrating))
    };

    const handleHotelTypeChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        const hotelType =event.target.value;

        setselectedHotelTypes((prevHotelTypes) => event.target.checked ? [...prevHotelTypes ,hotelType ] : prevHotelTypes.filter((hot) => hot !== hotelType))
    };

    const handleFacilitiesChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        const facility =event.target.value;

        setselectedFacilities((prevFacilities) => event.target.checked ? [...prevFacilities ,facility ] : prevFacilities.filter((fac) => fac !== facility))
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
                <div className="space-y-5">
                    <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
                        Filter By:
                    </h3>

                    <StarRatingFilter selectedStars={selectedStars} onChange={handleStarsChange}/>
                    <HotelTypesFilter selectedHotelTypes={selectedHotelTypes} onChange={handleHotelTypeChange} />
                    <FacilitiesFilter selectedFacilities={selectedFacilities} onChange={handleFacilitiesChange}/>
                    <PriceFilter selectedPrice={selectedPrice} onChange={(value?:number)=> setselectedPrice(value)}/>
                </div>

            </div>

            <div className="flex flex-col gap-5">
                <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">
                        {hotelData?.pagination.total} Hotels found
                        {search.destination ? ` in ${search.destination}` : ""}
                    </span>
                    
                    <select value={sortOption} onChange={(event)=>setsortOption(event.target.value)} className="p-2 border rounded-md">
                        <option value="">Sort by</option>
                        <option value="starrating">Star Rating</option>
                        <option value="pricepernightasc">Price Per Night(low to high)</option>
                        <option value="pricepernightdesc">Price Per Night(high to low)</option>

                    </select>
                </div>

                {hotelData?.data.map((hotel) => (
                    <SearchResultCard hotel={hotel} />
                ))}

                <div>
                    <Pagination page={hotelData?.pagination.page || 1}  pages={hotelData?.pagination.pages || 1} onPageChange={(page) => setpage(page)} />
                </div>
            </div>
        </div>

    )
};

export default Search;