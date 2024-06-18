import { useQuery } from "react-query";
import * as apiClient from "../api-clients";
import BookingForm from "../forms/BookingForm/BookingForm";
import { useSearchContext } from "../contexts/SearchContext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BookingDetailSummary from "../components/BookingDetailSummary";
import { Elements } from "@stripe/react-stripe-js";
import { useAppContext } from "../contexts/AppContext";


const Booking = () => {

    const {stripePromise} = useAppContext();
    const search = useSearchContext();
    const { hotelId } = useParams();

    const [numberofnight, setnumberofnight] = useState<number>(0);

    useEffect(() => {
        if (search.checkin && search.checkout) {
            const night = Math.abs(search.checkout.getTime() - search.checkin.getTime()) / (1000 * 60 * 60 * 24);
            setnumberofnight(Math.ceil(night));
        }
    }, [search.checkin, search.checkout]);
    // whenever checkin and checkout change in global , numberofnight also change

    const { data: paymentIntentData } = useQuery("createPaymentIntent", () => apiClient.createPaymentIntent(hotelId as string, numberofnight.toString()),
        {
            enabled: !!hotelId && numberofnight > 0
        });

    // it will not run if there is not hotelId
    const { data: hotel } = useQuery("fetchMyHotelsById", () => apiClient.fetchHotelById(hotelId as string), { enabled: !!hotelId })

    const { data: currentUser } = useQuery("fetchCurrentUser", apiClient.fetchCurrentUser);

    console.log(currentUser?.email);


    if (!hotel) {
        return <></>
    }

    return (
        <div className="grid md:grid-cols-[1fr_2fr]">

            <BookingDetailSummary checkin={search.checkin} checkout={search.checkout} adultcount={search.adultcount} childcount={search.childcount} numberofnight={numberofnight} hotel={hotel} />

            {currentUser && paymentIntentData && ( <Elements stripe={stripePromise} options={{clientSecret:paymentIntentData.clientSecret}}> <BookingForm currentUser={currentUser} paymentIntent={paymentIntentData}/> </Elements> )}

        </div>
    )

};

export default Booking;