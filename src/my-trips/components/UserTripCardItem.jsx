import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function UserTripCardItem({trip}) {
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
    <Link to={'/view-trip/'+trip?.id}>
    <div className='hover:scale-105 transition-all hover:shadow-md'>
      <img src= {photoUrl?photoUrl:'/public/PlaceHolder.jpeg'}
      className='object-cover rounded-xl h-[220px]' />

      <div>
        <h2 className='fond-bold text-sm'>
            {trip?.userSelection?.location?.label}
        </h2>
        <h2 className='font-light text-pink-600 text-xs'>{trip?.userSelection?.noOfDays}2 Days Trip with {trip?.userSelection?.budget}</h2>
      </div>
    </div>
    </Link>
  )
}

export default UserTripCardItem;
