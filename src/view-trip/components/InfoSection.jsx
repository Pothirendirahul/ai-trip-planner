import React from 'react';
import { IoIosSend } from "react-icons/io";

function InfoSection({ trip }) {
    return (
        <div>
            <img src="/public/PlaceHolder.jpeg" className="h-[340px] w-full object-cover rounded-xl" alt="Placeholder" />

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

                            🥂 Number of Travellers:{trip.userSelection?.traveler}
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
