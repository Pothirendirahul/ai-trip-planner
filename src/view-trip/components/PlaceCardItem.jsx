import React from 'react'
import { Link } from 'react-router-dom' // Add this import
import { FaMapLocationDot } from "react-icons/fa6";

function PlaceCardItem({ place }) {
  return (
    <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-sm cursor-text'>
      <img 
        src="/public/PlaceHolder.jpeg" 
        alt="" 
        className='w-[100px] h-[130px] rounded-xl' 
      />
      <div>
        <h2 className='font-bold text-lg'>{place.place_name}</h2>
        <p className='text-xs text-gray-400'>{place.place_details}</p>
        <h2 className='text-xs text-red-500'>⏰ {place.time_to_travel}</h2>
        <Link 
          to={'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(place?.place_name)} 
          target='_blank'
        >
          <button>
            <FaMapLocationDot />
          </button>
        </Link>
      </div>
    </div>
  )
}

export default PlaceCardItem
