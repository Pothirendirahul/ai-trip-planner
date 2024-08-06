import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { doc, getDoc } from 'firebase/firestore'; // Ensure you import these from firebase/firestore
import { db } from '@/service/firebaseConfig'; // Ensure the correct path to your Firebase configuration
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/footer';

function Viewtrip() {
  const { tripId } = useParams();
  const [trip,setTrip]=useState([]);

  useEffect(() => {
    if (tripId) {
      GetTripData();
    }
  }, [tripId]);

  const GetTripData = async () => {
    try {
      const docRef = doc(db, 'AITrips', tripId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log('Document:', docSnap.data());
        setTrip(docSnap.data());
      } else {
        console.log('No such document');
        toast('No trip found');
      }
    } catch (error) {
      console.error('Error fetching document:', error);
      toast('Error fetching trip data. Please try again.');
    }
  };

  if (!tripId) {
    return <div>Error: tripId is missing</div>;
  }

  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
    <InfoSection trip={trip}/>
    <Hotels trip={trip}/>
    <PlacesToVisit trip={trip}/>
    <Footer trip={trip}/>
    </div>
  );
}

export default Viewtrip;
