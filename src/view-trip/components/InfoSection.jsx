import { GetPlaceDetails } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';
import { IoIosSend } from "react-icons/io";

const PHOTO_REF_URL = `https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}`;


function InfoSection({ trip }) {

    const [photoUrl,setPhotoUrl]=useState();

    useEffect(() => {
        if (trip) {
            GetPlacePhotos();
        }
    }, [trip]);

    const GetPlacePhotos = async () => {
        const data = {
            textQuery: trip?.userSelection?.location?.label
        };

        const result = await GetPlaceDetails(data);
        const photoName = result.data.places[0].photos[3].name;
        console.log(photoName);

        const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', photoName);
        setPhotoUrl(PhotoUrl);
    };

    return (
        <div>
            <img src={photoUrl?photoUrl:"/public/PlaceHolder.jpeg"} className="h-[340px] w-full object-cover rounded-xl" alt="Placeholder" />

            <div className='flex justify-between items-center'>
                <div className='my-5 flex flex-col gap-2'>
                    <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
                    <div className='flex gap-5'>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>
                            📅 {trip.userSelection?.noOfDays} Day
                        </h2>

                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>
                            💰{trip.userSelection?.budget} Budget
                        </h2>

                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>
                            🥂Travellers: {trip.userSelection?.traveler}
                        </h2>
                    </div>
                </div>
                <button className="bg-blue-500 text-white p-4 rounded-full hover:bg-black transition-all duration-300 ease-in-out transform hover:scale-110">
                    <IoIosSend className="w-6 h-4" />
                </button>
            </div>
        </div>
    );
}

export default InfoSection;
