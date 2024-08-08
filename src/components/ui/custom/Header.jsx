import React, { useEffect, useState } from 'react';
import { Button } from '../button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useNavigation } from 'react-router-dom';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";


function Header() {

  const user = JSON.parse(localStorage.getItem('user'));
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    console.log(user)
  }, [])

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)
  });

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
      window.location.reload;
      OnGenerateTrip();
    } catch (error) {
      console.error("Error fetching user profile:", error);
      toast("Error signing in. Please try again.");
    }
  };


  return (
    <div className='p-3 shadow-sm flex justify-between items-center px-5'>
      <img src='/logo.svg' alt='Logo' className='h-10 w-20' />
      <div>
        {user ?
          <div className='flex items-center gap-3'>

            <a href='/create-trip'>
            <Button variant="outline" className='rounded-full'>+ Create Trip</Button>
            </a>

            <a href='/my-trips'>
            <Button variant="outline" className='rounded-full'>My Trips</Button>
            </a>
            <Popover>
              <PopoverTrigger>
                <img src={user?.picture} className='h-[35px] w-[35px] rounded-full' />
              </PopoverTrigger>
              <PopoverContent>
                <h2 className='cursor-pointer' onClick={()=>{
                  googleLogout();
                  localStorage.clear();
                  window.location.reload();
                }}>Log Out</h2>
              </PopoverContent>
            </Popover>
          </div>
          :
          <Button onClick={()=>setOpenDialog(true)}>Sign In</Button>
        }

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
                  className="w-full mt-5 flex items-center justify-center bg-black text-white hover:bg-gold">
                  <FcGoogle className="h-7 w-7 mr-2" />
                  Sign In With Google
                </button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
    </div>
  );
}

export default Header;
