import { useForm } from "react-hook-form"
import { PaymentIntentResponse, UserType } from "../../../../backened/src/shared/types"
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { useSearchContext } from "../../contexts/SearchContext";
import { useParams } from "react-router-dom";
import * as apiClient from "../../api-clients"
import { useMutation } from "react-query";
import { useAppContext } from "../../contexts/AppContext";


type Props = {
    currentUser: UserType,
    paymentIntent: PaymentIntentResponse
};

export type BookingFormData = {
    firstname: string;
    lastname: string;
    email: string;
    adultcount: number;
    childcount: number;
    checkin: string;
    checkout: string;
    hotelId: string;
    totalCost: number;
    paymentIntentId: string

}

const BookingForm = ({ currentUser, paymentIntent }: Props) => {
    const stripe = useStripe();
    const elements = useElements();
    const search = useSearchContext();
    const { hotelId } = useParams();
    const { showToast } = useAppContext();

    const { mutate: bookRoom , isLoading } = useMutation(apiClient.createRoomBooking, {
        onSuccess: () => {
            showToast({ message: "Booking Saved!", type: "SUCCESS" })
        },

        onError: () => {
            showToast({ message: "Error saving booking", type: "ERROR" })
        } ,
    })

    const { register, handleSubmit } = useForm<BookingFormData>({
        defaultValues: {
            firstname: currentUser.firstname,
            lastname: currentUser.lastname,
            email: currentUser.email,
            adultcount: search.adultcount,
            childcount: search.childcount,
            checkin: search.checkin.toISOString(),
            checkout: search.checkout.toISOString(),
            hotelId: hotelId,
            totalCost: paymentIntent.totalCost,
            paymentIntentId: paymentIntent.paymentIntentId
        }
    });

    const onSubmit = async (formData: BookingFormData) => {

        if (!stripe || !elements) {
            return;
        }
        const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement) as StripeCardElement
            }
        });

        if (result.paymentIntent?.status === "succeeded") {
            //book the room
            bookRoom({ ...formData, paymentIntentId: result.paymentIntent.id });
        }

    };

    return (
        <form className="grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-5" onSubmit={handleSubmit(onSubmit)} >
            <span className="text-3xl font-bold">Confirm Your Details</span>
            <div className="grid grid-cols-2 gap-6">
                <label className="text-gray-700 text-sm font-bold flexx-1">
                    First Name
                    <input className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal" type="text" readOnly disabled {...register("firstname")} />
                </label>

                <label className="text-gray-700 text-sm font-bold flexx-1">
                    Last Name
                    <input className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal" type="text" readOnly disabled {...register("lastname")} />
                </label>

                <label className="text-gray-700 text-sm font-bold flexx-1">
                    Email
                    <input className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal" type="text" readOnly disabled {...register("email")} />
                </label>
            </div>

            <div className="space-y-2">
                <h2 className="text-xl font-semibold">Your Price Summary</h2>
                <div className="bg-blue-200 p-4 rounded-md">
                    <div className="font-semibold text-lg">
                        Total Cost: Rs.{paymentIntent.totalCost.toFixed(2)}
                    </div>
                    <div className="text-xs">Includes Taxes and charges</div>
                </div>
            </div>

            <div className="space-y-2">
                <h3 className="text-xl font-semibold">Payment Details</h3>
                <CardElement id="payment-element" className="border rounded-md text-sm" />
            </div>

            <div className="flex justify-end">
                <button type="submit" className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-md disabled:bg-gray-200" disabled={isLoading}> {isLoading ? "Saving..." : "Confirm Booking" }</button>
            </div>
        </form>
    )

};

export default BookingForm;