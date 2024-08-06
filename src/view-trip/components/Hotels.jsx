import React from 'react'
import { Link } from 'react-router-dom'

function Hotels({ trip }) {
    return (
        <div>
            <h2 className='font-bold text-xl mt-5'>Hotel Recommendation</h2>
            <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
                {trip?.tripData?.hotel_options?.map((hotel, index) => (
                    <Link to={'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(hotel?.hotel_address)} target='_blank'>

                    <div
                        key={index}
                        className='border p-4 rounded-xl transition-transform transform hover:scale-110 cursor-pointer'
                    >
                        <img src="/PlaceHolder.jpeg" alt={hotel?.hotel_name} className='rounded-xl w-full' />
                        <div className='my-2'>
                            <h2 className='font-medium'>{hotel?.hotel_name}</h2>
                            <h2 className='text-xs text-gray-400'> 📍{hotel?.hotel_address}</h2>
                            <h2 className='text-xs text-gray-400'> 🌟{hotel?.rating}</h2>
                            <h2 className='text-xs text-gray-500 font-bold'> Price: {hotel?.price}</h2>
                        </div>
                    </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Hotels
