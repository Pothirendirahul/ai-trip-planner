import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function Hero() {
  return (
    <div
      className="relative flex flex-col items-center justify-center w-full h-screen bg-cover bg-center"
    > 
      {/* Placeholder */}
      <div className="absolute inset-0 bg-gray-300 bg-cover bg-center z-0" style={{ backgroundImage: "url('/placeholder_image.jpg')" }} />

      {/* Main Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/bg_image.jpg')" }}
      />
      

      <div className="relative z-10 flex flex-col items-center">
        <h1 className='font-extrabold text-3xl sm:text-4xl md:text-[50px] text-center text-white mt-10 md:mt-14 mb-6 md:mb-12'>
          <span>Personalized Journeys with AI: Easy and Quick</span>
        </h1>
        <Link to={'/create-trip'}>
          <button className='black-button text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-2 md:py-3'>
            Get Started It's Free!!
          </button>
        </Link>

        
      </div>
    </div>
  );
}

export default Hero;


