import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { doc, getDoc } from 'firebase/firestore'; // Ensure you import these from firebase/firestore
import { db } from '@/service/firebaseConfig'; // Ensure the correct path to your Firebase configuration
import InfoSection from '../components/InfoSection';

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
    <div>
      Viewtrip: {tripId}
    <InfoSection trip={trip}/>
    </div>
  );
}

export default Viewtrip;
