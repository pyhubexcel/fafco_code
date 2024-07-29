import { useEffect, useState, useCallback, useContext } from "react";
import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import Cookies from 'js-cookie';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CustomButton from "../../components/ui/CustomButton";
import axiosInstance from "../../utils/axios";
import { ToastContainer, toast } from "react-toastify";
import { MyContext } from "../../context/ContextProvider";

const ProfileScreen = () => {
  const [role, setRole] = useState(null);
  const [inputData, setInputData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
  });
  const { setUpdateName } = useContext(MyContext);

  const fetchUserDetails = useCallback(async () => {
    const token = Cookies.get('token');
    const id = Cookies.get('id');
    try {
      const { data } = await axiosInstance.get(`api/auth/update-profile/${id}/`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      if (data) {
        setInputData({
          name: data.name,
          address: data.address,
          phone: data.phone,
          email: data.email,
        });
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }, []);


  useEffect(() => {
    const userRole = Cookies.get('role');
    setRole(userRole);
    fetchUserDetails();
  }, [ ]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputData((prevInputData) => ({
      ...prevInputData,
      [name]: value
    }));
  };

  const handleUpdateUserDetails = async () => {
    const id = Cookies.get('id');
    const token = Cookies.get('token');
    try {
      const response = await axiosInstance.patch(`/api/auth/update-profile/${id}/`, {
        name: inputData.name,
        phone: inputData.phone
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        }
      });
      if (response.status == 200) {
        Cookies.remove('name')
        Cookies.set('name', inputData.name)
        toast.success('Profile Updated',{autoClose: 2000,})
        setUpdateName(true)
      } 
    } catch (error) {
      toast.error(error.response.data.phone[0],{autoClose: 2000,})
    }
  };

  return (
    <div className="bg-white w-[90%] sm:w-[400px] md:w-[400px] lg:w-[500px] m-auto my-6 px-4 py-3 rounded-xl space-y-3 shadow-2xl">
      <ToastContainer />
      <div className="text-blue-500 flex justify-center">
        <AccountCircleIcon sx={{ fontSize: '130px' }} />
      </div>
      <div className="text-3xl text-center text-blue-500 font-semibold">{inputData.name}</div>
      <div className="space-y-5">
        <div className="space-y-1">
          <p className="w-full text-center font-semibold text-md">Role: {role === '1' ? 'Dealer' : 'Homeowner'}</p>
        </div>
        <div className="space-y-1">
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="name">Name</InputLabel>
            <OutlinedInput
              id="name"
              name="name"
              value={inputData.name}
              label="Name"
              onChange={handleInputChange}
            />
          </FormControl>
        </div>
        <div className="space-y-1">
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="email">Email</InputLabel>
            <OutlinedInput
              id="email"
              name="email"
              value={inputData.email}
              label="Email"
              readOnly
            />
          </FormControl>
        </div>
        <div className="space-y-1">
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="phone">Phone</InputLabel>
            <OutlinedInput
              id="phone"
              name="phone"
              value={inputData.phone}
              label="Phone"
              onChange={handleInputChange}
            />
          </FormControl>
        </div>
        <div className="space-y-1">
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="address">Change Address</InputLabel>
            <OutlinedInput
              id="address"
              name="address"
              value={inputData.address}
              label="Change Address"
              onChange={handleInputChange}
            />
          </FormControl>
        </div>
        <div className="text-center">
          <CustomButton
            buttonName="Update Profile"
            variant="outlined"
            onClick={handleUpdateUserDetails}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
