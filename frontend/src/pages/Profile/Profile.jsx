import { useEffect, useState } from "react";
import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import Cookies from 'js-cookie';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CustomButton from "../../components/ui/CustomButton";

export default function ProfileScreen() {
  const [user, setUser] = useState(null);
  const [address, setAddress] = useState('');

  useEffect(() => {
    const token = Cookies.get('token');
    const userId = Cookies.get('id');
    const userRole = Cookies.get('role');
    const userName = Cookies.get('name');
    const userEmail = Cookies.get('email');
    const userPhone = Cookies.get('phone');

    if (token && userId && userRole && userName) {
      setUser({
        token: token,
        id: userId,
        role: userRole,
        name: userName,
        email: userEmail,
        phone: userPhone,
      });
    }

  }, []);

  if (!user) {
    return null;
  }

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleUpdateAddress = () => {
    console.log('Update Address:', address);
    // Add logic to update the address in the backend
  };

  return (
    <div className="bg-white w-[90%] sm:w-[400px] md:w-[400px] lg:w-[500px] m-auto my-6 px-4 py-3 rounded-xl space-y-3 shadow-2xl">
      <div className="text-blue-500 flex justify-center">
        <AccountCircleIcon sx={{ fontSize: '130px' }} />
      </div>
      <div className="text-3xl text-center text-blue-500 font-semibold">USER PROFILE</div>

      <div className="space-y-5">
        <div className="space-y-1">
          <p className="w-full text-center">Role: {user.role === '1' ? 'Dealer' : 'Homeowner'}</p>
        </div>
        <div className="space-y-1">
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="name">Name</InputLabel>
            <OutlinedInput
              id="name"
              value={user.name}
              disabled
              label="Name"
            />
          </FormControl>
        </div>
      
          <>
            <div className="space-y-1">
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="email">Email</InputLabel>
                <OutlinedInput
                  id="email"
                  value={user.email}
                  disabled
                  label="Email"
                />
              </FormControl>
            </div>

            <div className="space-y-1">
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="phone">Phone</InputLabel>
                <OutlinedInput
                  id="phone"
                  value={user.phone}
                  disabled
                  label="Phone"
                />
              </FormControl>
            </div>


            <div className="space-y-1">
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="address">Change Address</InputLabel>
                <OutlinedInput
                  id="address"
                  value={address}
                  onChange={handleAddressChange}
                  label="Change Address"
                />
              </FormControl>
            </div>
            <div className="text-center">
              <CustomButton
                buttonName='Update Address'
                variant='outlined'
                onClick={handleUpdateAddress}
              />
            </div>
          </>
       
      </div>
    </div>
  );
}
