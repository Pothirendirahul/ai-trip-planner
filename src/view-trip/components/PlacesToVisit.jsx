import React from 'react'
import PlaceCardItem from '../components/PlaceCardItem' 

function PlacesToVisit({ trip }) {
  return (
    <div>
      <h2 className='font-bold text-lg'>Places To Visit</h2>
      {trip.tripData?.itinerary.map((item, index) => (
        <div key={index} className='mt-2'>
          <h3 className='font-medium text-lg'>{item.day}</h3>
          <div className='grid grid-cols-2 gap-5'>
            {item.plan.map((place, placeIndex) => (
              <div key={placeIndex} className='my-3'>
                <h4 className='font-medium text-sm text-orange-700'>{place.time}</h4>
                <PlaceCardItem place={place}/> 
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default PlacesToVisit
