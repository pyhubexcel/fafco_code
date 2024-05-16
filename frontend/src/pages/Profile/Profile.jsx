import { useEffect, useState } from "react";
import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import Cookies from 'js-cookie';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CustomButton from "../../components/ui/CustomButton";
import axiosInstance from "../../utils/axios";

const ProfileScreen = () => {
  const [roles, setRoles] = useState(null);
  const [inputData, setInputData] = useState({
    name: '',
    address: '',
    owner_phone: '',
    owner_email: '',
  });

  const getUserApi = async () => {
    try {
      const token = Cookies.get('token');
      const id = Cookies.get('id');
      const res = await axiosInstance.get(`api/auth/update-profile/${id}/`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      if (res?.data) {
        setInputData({
          name: res?.data?.name,
          address: res?.data?.address,
          owner_phone: res?.data?.phone,
          owner_email: res?.data?.email,
        });
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    const role = Cookies.get('role');
    setRoles(role);
    getUserApi();
  }, []);

  const handleUpdateAddress = () => {
    console.log('Update Address:', inputData.address);
    // Add logic to update the address in the backend
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputData(prevInputData => ({
      ...prevInputData,
      [name]: value
    }));
  };

  return (
    <div className="bg-white w-[90%] sm:w-[400px] md:w-[400px] lg:w-[500px] m-auto my-6 px-4 py-3 rounded-xl space-y-3 shadow-2xl">
      <div className="text-blue-500 flex justify-center">
        <AccountCircleIcon sx={{ fontSize: '130px' }} />
      </div>
      <div className="text-3xl text-center text-blue-500 font-semibold">USER PROFILE</div>

      <div className="space-y-5">
        <div className="space-y-1">
          <p className="w-full text-center">Role: {roles === '1' ? 'Dealer' : 'Homeowner'}</p>
        </div>
        <div className="space-y-1">
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="name">Name</InputLabel>
            <OutlinedInput
              id="name"
              value={inputData.name}
              label="Name"
              onChange={handleChange}
            />
          </FormControl>
        </div>
        <div className="space-y-1">
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="email">Email</InputLabel>
            <OutlinedInput
              id="email"
              value={inputData.owner_email}
              label="Email"
              onChange={handleChange}
            />
          </FormControl>
        </div>
        <div className="space-y-1">
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="phone">Phone</InputLabel>
            <OutlinedInput
              id="phone"
              value={inputData.owner_phone}
              label="Phone"
              onChange={handleChange}
            />
          </FormControl>
        </div>
        <div className="space-y-1">
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="address">Change Address</InputLabel>
            <OutlinedInput
              id="address"
              value={inputData.address}
              label="Change Address"
              onChange={(e) => setInputData({ ...inputData, address: e.target.value })}
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
      </div>
    </div>
  );
};

export default ProfileScreen;
