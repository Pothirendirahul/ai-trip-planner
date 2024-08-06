import React from 'react'
import PlacesCardItem from '../components/PlaceCardItem' 

function PlacesToVisit({trip}) {
  return (
    <div>
      <h2 className='font-bold text-lg'>Places To Visit</h2>
     
        {trip.tripData?.itinerary.map((item,index) =>(
            <div className='mt-2'>
                <h2 className='font-medium text-lg'>{item.day}</h2>
                <div className='grid grid-cols-2 gap-5'>
                {item.plan.map((place,index)=>(
                    <div className='my-3'>
                        <h2 className='font-medium text-sm text-orange-700'>{place.time}</h2>
                        <PlacesCardItem place={place}/> 
                        
                    </div>
                ))}
                </div>
            </div>
        ))}
      </div>
    
  )
}

export default PlacesToVisit
