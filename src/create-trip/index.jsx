import React, { useEffect, useState } from "react";
import axios from "axios";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Input } from "../components/ui/input"; // Adjusted path to the Input component
import { AI_PROMPT, SelectBudgetOptions, SelectTravelersList } from "@/constants/options";
import { toast } from "sonner";
import { chatSession } from "@/service/AiModel";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const [place, setPlace] = useState(null);
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false); // State for dark mode
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)
  });

  const OnGenerateTrip = async () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (formData?.noOfDays > 5 || !formData?.location || !formData?.budget || !formData.traveler) {
      toast("Please Fill All Details");
      return;
    }

    setLoading(true);
    try {
      const FINAL_PROMPT = AI_PROMPT
        .replace('{location}', formData?.location?.label)
        .replace('{totalDays}', formData?.noOfDays)
        .replace('{traveler}', formData?.traveler)
        .replace('{budget}', formData?.budget);

      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const tripText = await result?.response?.text();
      console.log(tripText);

      SaveAiTrip(tripText);
    } catch (error) {
      console.error("Error generating trip:", error);
      toast("Error generating trip. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const docId = Date.now().toString(); // Move docId declaration here
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      await setDoc(doc(db, "AITrips", docId), {
        userSelection: formData,
        tripData: JSON.parse(TripData),
        userEmail: user?.email,
        id: docId
      });
    } catch (error) {
      console.error("Error saving trip:", error);
      toast("Error saving trip. Please try again.");
    } finally {
      setLoading(false);
    }
    setLoading(false);
    navigate('/view-trip/'+docId);
  };

  const GetUserProfile = async (tokenInfo) => {
    try {
      const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: 'application/json',
        }
      });
      console.log(response);
      localStorage.setItem('user', JSON.stringify(response?.data));
      setOpenDialog(false);
      OnGenerateTrip();
    } catch (error) {
      console.error("Error fetching user profile:", error);
      toast("Error signing in. Please try again.");
    }
  };

  return (
    <div className={`sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`fixed bottom-4 right-4 p-2 rounded-full ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`}
      >
        {darkMode ? '🌞' : '🌜'}
      </button>

      <h2 className="font-bold text-3xl">Tell us your travel preferences 🏕️🌴</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Give us a glimpse of your preferences, and our trip planner will craft an exclusive itinerary that reflects your unique style.
      </p>
      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium">What is your destination of choice?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              value: place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange('location', v);
              }
            }}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">How many days are you planning your trip?</h2>
          <Input
            placeholder="Ex. 3"
            type="number"
            onChange={(e) => handleInputChange('noOfDays', e.target.value)}
          />
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">What is Your Budget?</h2>
          <div className="grid grid-cols-3 gap-4 mt-5">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange('budget', item.title)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow ${formData?.budget === item.title ? 'shadow-lg border-red-700' : ''}`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-600">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">Who do you plan on traveling with on your next adventure?</h2>
          <div className="grid grid-cols-3 gap-4 mt-5">
            {SelectTravelersList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange('traveler', item.people)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow ${formData?.traveler === item.people ? 'shadow-lg border-red-700' : ''}`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-600">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
        <div className="my-10 justify-end flex">
          <button
            disabled={loading}
            onClick={OnGenerateTrip}
            className="custom-button bg-black text-white hover:bg-gold"
          >
            {loading ?
              <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" /> : 'Generate Trip'}
          </button>
        </div>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                <img src="/logo.svg" alt="Logo" />
                <h2 className="font-bold text-lg mt-7">Sign In Google</h2>
                <p>Sign in to the App with Google Authentication Securely</p>
                <button
                  onClick={login}
                  className="w-full mt-5 flex items-center justify-center bg-black text-white hover:bg-gold"
                >
                  <FcGoogle className="h-7 w-7 mr-2" />
                  Sign In With Google
                </button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default CreateTrip;
