import CustomButton from "../../components/ui/CustomButton";
import axiosInstance from "../../utils/axios";
import { Box, CircularProgress, TextField } from "@mui/material";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function AddressValidation() {
  const [addressLoader, setAddressLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputData, setInputData] = useState({
    street: "",
    city: "",
    state: "",
    zipcode: "",
  });
  const [showData, setShowData] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [addressData, setAddressData] = useState("");
  const navigate = useNavigate();

  const streetApi = async (props) => {
    setAddressLoader(true);
    try {
      const res = await axiosInstance.get(
        `api/auth/autocomplete/?search_term=${props}`
      );
      setApiData(res.data);
    } catch (error) {
    } finally {
      setAddressLoader(false);
    }
  };

  const addressValidationApi = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const Token = Cookies.get("token");
      const res = await axiosInstance.post(
        `api/auth/validation/`,
        {
          street: inputData.street,
          city: inputData.city,
          state: inputData.state,
          zipcode: inputData.zipcode,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        }
      );

      setLoading(false);
      setAddressData(res);

      if (res.data.success === false) {
        toast.error(res.data.message,{autoClose: 2000,});
        navigate("/");
      } else {
        toast.success(res.data.message,{autoClose: 2000,});
        navigate("/createRegistration", { state: res.data });
      }
    } catch (error) {
      toast.error("Address not Verified!!!",{autoClose: 2000,});
    } finally {
      setLoading(false);
    }
  };

  const handleChangeStreet = (event) => {
    const { name, value } = event.target;
    setInputData({ ...inputData, [name]: value });

    streetApi(value);
    setShowData(true);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputData({ ...inputData, [name]: value });
  };

  const handleOptionClick = (user) => {
    setShowData(false);
    setInputData({
      ...inputData,
      street: user.street_line,
      city: user.city,
      state: user.state,
      zipcode: user.zipcode,
    });
  };

  return (
    <div className="flex w-full">
      {/* <Toaster /> */}
      <ToastContainer />
      <div className="bg-white w-[90%] sm:w-[400px] md:w-[400px] lg:w-[500px] m-auto border-1 my-14 border-black px-4 py-7 rounded-xl space-y-5 shadow-2xl">
        <div className="text-3xl text-center text-blue-500 font-semibold ">
          Enter Registration Address
        </div>
        <form className="space-y-5" onSubmit={addressValidationApi}>
          <div className="space-y-1">
            <TextField
              type="text"
              // onBlur={handleBlur}
              onChange={handleChangeStreet}
              value={inputData.street}
              name="street"
              // id="outlined-size-small"
              className="w-full"
              label="Address"
              size="small"
              required
              InputProps={{
                autoComplete: "off",
              }}
            />
            <div
              className="bg-gray-200 w-full rounded-lg align-items-center "
              style={{ display: showData ? "block" : "none" }}
            >
              {addressLoader ? (
                <div className="flex justify-center align-items-center py-5">
                  <CircularProgress />
                </div>
              ) : (
                apiData.map((user, i) => (
                  <div key={i}>
                    <div
                      className=" flex gap-4 cursor-pointer hover:bg-gray-100 px-2 py-1"
                      onClick={() => handleOptionClick(user)}
                    >
                      <div>{user.street_line}</div>
                      <div>{user.city}</div>
                      <div>{user.state}</div>
                      <div>{user.zipcode}</div>
                    </div>
                    <hr className="bg-white border- border-white" />
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="space-y-1">
            <TextField
              type="text"
              // onBlur={handleBlur}
              onChange={handleChange}
              value={inputData.city}
              name="city"
              // id="outlined-size-small"
              className="w-full"
              label="City"
              size="small"
              required
            />
          </div>
          <div className="space-y-1">
            <TextField
              type="text"
              // onBlur={handleBlur}
              onChange={handleChange}
              value={inputData.state}
              name="state"
              // id="outlined-size-small"
              className="w-full"
              label="State"
              size="small"
              required
            />
          </div>
          <div className="space-y-1">
            <TextField
              type="text"
              // onBlur={handleBlur}
              onChange={handleChange}
              value={inputData.zipcode}
              name="zipcode"
              // id="outlined-size-small"
              className="w-full"
              label="Zip Code"
              size="small"
              required
            />
          </div>
          <div className="text-center">
            {/* <Link to={addressData ? '/viewRegistration' : ''}> */}
            <CustomButton
              loading={loading}
              buttonName="Use This Address"
              type="submit"
              variant="contained"
            />
            {/* </Link> */}
            {/* <Toaster /> */}
          </div>
        </form>
      </div>
    </div>
  );
}
