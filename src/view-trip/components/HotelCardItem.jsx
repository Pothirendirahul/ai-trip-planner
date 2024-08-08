import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function HotelCardItem({ hotel }) {

    const [photoUrl,setPhotoUrl]=useState();

    useEffect(() => {
        if (hotel) {
            GetPlacePhotos();
        }
    }, [hotel]);

    const GetPlacePhotos = async () => {
        const data = {
            textQuery: hotel?.hotel_name
        };

        const result = await GetPlaceDetails(data);
        const photoName = result.data.places[0].photos[3].name;
        console.log(photoName);

        const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', photoName);
        setPhotoUrl(PhotoUrl);
    };
    return (
        <Link
            to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel?.hotel_address)}`}
            target='_blank'
        >
            <div className='border p-4 rounded-xl transition-transform transform hover:scale-110 cursor-pointer'>
                <img src={photoUrl?photoUrl:"/public/PlaceHolder.jpeg"} alt={hotel?.hotel_name} className='rounded-xl h-[180px] w-full object-cover' />
                <div className='my-2'>
                    <h2 className='font-medium'>{hotel?.hotel_name}</h2>
                    <h2 className='text-xs text-gray-400'> 📍{hotel?.hotel_address}</h2>
                    <h2 className='text-xs text-gray-400'> 🌟{hotel?.rating}</h2>
                    <h2 className='text-xs text-gray-500 font-bold'> Price: {hotel?.price}</h2>
                </div>
            </div>
        </Link>
    )
}

export default HotelCardItem;
