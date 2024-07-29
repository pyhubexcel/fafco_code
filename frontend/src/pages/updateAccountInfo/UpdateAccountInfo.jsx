import CustomButton from "../../components/ui/CustomButton";
import { Autocomplete, Backdrop, Box, CircularProgress, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import axiosInstance from "../../utils/axios";
import Cookies from 'js-cookie';

const signupElements = [
  {
    name: 'name',
    placeHolder: 'Name',
    type: 'text'
  },
  {
    name: 'phone',
    placeHolder: 'Phone Number',
    type: 'text'
  },
  {
    name: 'email',
    placeHolder: 'Email',
    type: 'email'
  },
]

export default function UpdateAccountInfo() {
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false)
  const [countryCode, setCountryCode] = useState('');
  const [userDetails, setUserDetails] = useState({
    name: '',
    phone: '',
    email: '',
    confirmEmail: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserApi();
  };

  const updateUserApi = async () => {
    try {
      setUpdateLoading(true);
      const token = Cookies.get('token');
      const id = Cookies.get('id');
      const payload = {
        name: userDetails.name,
        phone: ` ${countryCode} ` + userDetails.phone,
      };

      const res = await axiosInstance.patch(`/api/auth/update-profile/${id}/`, payload, {
        headers: {
          'Content-Type': "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      if (res.status === 200) {
        setUpdateLoading(true);
        toast.success(" changes saved",{autoClose: 2000,});

        Cookies.set('name', userDetails.name);
      
      }
    } catch (error) {
      toast.error(error.response.data.address[0],{autoClose: 2000,});
    } finally {
      setUpdateLoading(false);
    }
  };

  const getUserApi = async () => {
    try {
      setLoading(true);
      const token = Cookies.get('token');
      const id = Cookies.get('id');
      const res = await axiosInstance.get(`api/auth/update-profile/${id}/`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      if (res?.data) {
        setUserDetails({
          name: res?.data?.name,
          phone: res?.data?.phone,
          email: res?.data?.email,
          confirmEmail: res?.data?.email
        });
      }
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserApi();
  }, []);

  return (
    <div>
      {loading ?
        <div>
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </div> :
        <div className="w-[90%] sm:w-[400px] md:w-[400px] lg:w-[500px] m-auto bg-white my-6  px-4 py-10 rounded-xl space-y-6 shadow-2xl">
          <ToastContainer />
          <div className="text-3xl text-center text-blue-500 font-semibold">Update Account Info</div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {signupElements.map((item, i) => (
              <div key={i} className="space-y-1">
                <TextField
                  type={item.type}
                  onChange={handleChange}
                  value={userDetails[item.name]}
                  name={item.name}
                  className="w-full"
                  label={item.placeHolder}
                  size="small"
                  required
                  disabled={item.name == "email"}
                />
              </div>
            ))}
            <CustomButton loading={updateLoading} buttonName='Update Details' type="submit" variant='contained' />
          </form>
        </div>
      }
    </div>
  );
}
