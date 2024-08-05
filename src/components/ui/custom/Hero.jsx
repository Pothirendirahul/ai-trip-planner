import React from 'react';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className='flex flex-col items-center mx-56 gap-9 '>
      <h1 className='font-extrabold text-[50px] text-center mt-14'>
       <span className='text-[#f56551]'>Personalized Journeys with AI: Easy and Quick</span></h1>
       <Link to={'/create-trip'}>
       <button className='black-button'>Get Started It's Free!!</button>
       </Link>
    </div>
    
  );
}

export default Hero;
