import React, { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Input } from "../components/ui/input"; // Adjusted path to the Input component

function CreateTrip() {
  const [place, setPlace] = useState(null);

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
      <h2 className='font-bold text-3xl '>Tell us your travel preferences 🏕️🌴</h2>
      <p className='mt-3 text-gray-500 text-xl'>
        Give us a glimpse of your preferences, and our trip planner will craft an exclusive itinerary that reflects your unique style.
      </p>
      <div className='mt-20 flex flex-col gap-10'>
        <div>
          <h2 className='text-xl my-3 font-medium'>What is your destination of choice?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              value: place,
              onChange: (v) => { setPlace(v); console.log(v); }
            }}
          />
        </div>
        <div>
          <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
          <Input placeholder="Ex. 3" type="number" />
        </div>

        <div>
        <h2 className='text-xl my-3 font-medium'>What is Your Budget?</h2>
        </div>
      </div>
    </div>
  );
}

export default CreateTrip;
