import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";
import { HotelSearchResponse, HotelType, PaymentIntentResponse, UserType } from "../../backened/src/shared/types"
import { BookingFormData } from "./forms/BookingForm/BookingForm";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const fetchCurrentUser = async (): Promise<UserType> => {
    const response = await fetch(`${API_BASE_URL}/api/users/me`, { credentials: "include" });

    if (!response.ok) {
        throw new Error("Error fetching User");
    }

    return response.json();

};

export const register = async (FormData: RegisterFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: 'POST',
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(FormData)
    });

    const responseBody = await response.json();


    if (!response.ok) {
        throw new Error(responseBody.message)
    }

};

export const signIn = async (FormData: SignInFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(FormData)
    });

    const body = await response.json();
    if (!response.ok) {
        throw new Error(body.message);
    }

    return body;

};

export const validateToken = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error("Token Invalid");
    }

    return response.json;
};


export const signOut = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/log-out`, {
        credentials: "include",
        method: "POST",
    });

    if (!response.ok) {
        throw new Error("Error during sign out");
    }

};

export const addMyHotel = async (hotelFormData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
        method: "POST",
        credentials: "include",
        body: hotelFormData
    });

    if (!response.ok) {
        throw new Error("Failed to add hotel");
    }

    return response.json();
};

export const fetchMyHotels = async (): Promise<HotelType[]> => {

    const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error("Error fetching hotels");
    }

    return response.json();

};

export const fetchMyHotelsById = async (hotelId: string): Promise<HotelType> => {

    const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error("Error fetching hotel");
    }

    return response.json();

};

export const updateMyHotelById = async (hotelFormData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelFormData.get("hotelId")}`, { method: "PUT", body: hotelFormData, credentials: "include" });

    if (!response.ok) {
        throw new Error("Failed to update hotel");
    }

    return response.json();

};

export type SearchParams = {
    destination?: string,
    checkin?: string,
    checkout?: string,
    adultcount?: string,
    childcount?: string,
    page?: string,
    facilities?: string[],
    types?: string[],
    stars?: string[],
    maxPrice?: string,
    sortOption?: string,

};

export const searchHotels = async (searchParams: SearchParams): Promise<HotelSearchResponse> => {

    const queryParams = new URLSearchParams();
    queryParams.append("destination", searchParams.destination || "");
    queryParams.append("checkin", searchParams.checkin || "");
    queryParams.append("checkout", searchParams.checkout || "");
    queryParams.append("adultcount", searchParams.adultcount || "");
    queryParams.append("childcount", searchParams.childcount || "");
    queryParams.append("page", searchParams.page || "");
    queryParams.append("maxPrice", searchParams.maxPrice || "");
    queryParams.append("sortOption", searchParams.sortOption || "");

    searchParams.facilities?.forEach(facility => {
        queryParams.append("facilities", facility)
    });

    searchParams.types?.forEach(type => {
        queryParams.append("types", type)
    });

    searchParams.stars?.forEach(star => {
        queryParams.append("stars", star)
    });

    const response = await fetch(`${API_BASE_URL}/api/hotels/search?${queryParams}`);

    if (!response.ok) {
        throw new Error("Error fetching hotels")
    }

    return response.json();
};

export const fetchHotels = async(): Promise<HotelType[]> => {

    const response = await fetch(`${API_BASE_URL}/api/hotels`);

    if(!response.ok){
        throw new Error("Error fetching hotels")
    }
    
    return response.json();

};

export const fetchHotelById = async (hotelId: string): Promise<HotelType> => {

    const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`);

    if (!response.ok) {
        throw new Error("Error fetching hotels");
    };

    return response.json();

};

export const createPaymentIntent = async (hotelId: string, numberofnight: string): Promise<PaymentIntentResponse> => {

    const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}/bookings/payment-intent`, { credentials: "include", method: "POST", body: JSON.stringify({ numberofnight }), headers: { "Content-type": "application/json" } });

    if (!response.ok) {
        throw new Error("Error fetching payment intent");
    }

    return response.json();

};

export const createRoomBooking = async (formData: BookingFormData) => {

    const response = await fetch(`${API_BASE_URL}/api/hotels/${formData.hotelId}/bookings`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(formData)
    })

    if (!response.ok) {
        throw new Error("Error booking hotel");
    }


};

export const fetchMyBookings = async():Promise<HotelType[]> => {

    const response = await fetch(`${API_BASE_URL}/api/my-bookings` , {credentials:"include"});

    if(!response.ok){
        throw new Error("Unable to fetch bookings");
    }

    return response.json();
};


