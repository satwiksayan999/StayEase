import { HotelType } from "../../../backened/src/shared/types"

type Props = {
    checkin: Date,
    checkout: Date,
    adultcount: number,
    childcount: number,
    numberofnight: number,
    hotel: HotelType
}

const BookingDetailSummary = ({ checkin, checkout, adultcount, childcount, numberofnight, hotel }: Props) => {

    return (

        <div className="grid gap-4 rounded-lg border border-slate-300 p-5 h-fit">
            <h2 className="text-xl font-bold">Your Booking Details</h2>

            <div className="border-b py-2">
                Location:
                <div className="font-bold">{`${hotel.name}, ${hotel.city}, ${hotel.country}`}</div>
            </div>

            <div className="flex justify-between">
                <div>
                    Check-in
                    <div className="font-bold">{checkin.toDateString()}</div>
                </div>

                <div>
                    Check-out
                    <div className="font-bold">{checkout.toDateString()}</div>
                </div>

            </div>

            <div className="border-t border-b py-2">
                Total length of stay:
                <div className="font-bold">{numberofnight} nights</div>
            </div>

            <div>
                Guests{" "}
                <div className="font-bold">{adultcount} adults & {childcount} children</div>
            </div>

        </div>

    )
};

export default BookingDetailSummary;