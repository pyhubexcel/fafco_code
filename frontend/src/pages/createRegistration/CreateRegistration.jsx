import CustomButton from "../../components/ui/CustomButton";
import {
  Checkbox,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axiosInstance from "../../utils/axios";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const inputDataArray = [
  {
    name: "name",
    label: "Name",
    type: "text",
  },
  {
    name: "address",
    label: "Address",
    type: "text",
  },
  {
    name: "country",
    label: "Country",
    type: "select",
    options: ["USA", "Canada", "Maxico"],
  },
  {
    name: "owner_phone",
    label: "Phone",
    type: "text",
  },
  {
    name: "owner_email",
    label: "Email",
    type: "text",
  },
  // {
  //   name: "Current_dealer",
  //   label: "Current Dealer",
  //   type: "text",
  // },
];

export default function CreateRegistration() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [roles, setRoles] = useState("");
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    name: "",
    address: location.state.delivery_line_1,
    zip_code: location.state.components.zipcode,
    country: "",
    owner_phone: "",
    owner_email: "",
    medallion: false,
    Current_dealer: "",
  });

  const getUserApi = async () => {
    try {
      setLoading(true);
      const token = Cookies.get("token");
      const id = Cookies.get("id");

      const res = await axiosInstance.get(`api/auth/update-profile/${id}/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res?.data) {
        setInputData({
          name: res?.data?.name,
          owner_phone: res?.data?.phone,
          owner_email: res?.data?.email,
          address: location.state.delivery_line_1,
          zip_code: location.state.components.zipcode,
          country: "USA",
          Current_dealer: res.data.name,
          medallion: false,
        });
      }
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const role = Cookies.get("role");
    setRoles(role);
    if (role === "2") {
      getUserApi();
    }
  }, []);

  const registrationApi = async () => {
    const token = Cookies.get("token");
    const id = Cookies.get("id");

    try {
      setLoading(true);
      const payload = {
        name: inputData.name,
        address: inputData.address,
        // current_dealer: id,
        country: inputData.country,
        owner_phone: inputData.owner_phone,
        owner_email: inputData.owner_email,
        medallion: inputData?.medallion,
      };

      const res = await axiosInstance.post(`/api/auth/profiles/`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        toast.success(res.data.message,{autoClose: 2000,});
        navigate("/registrationLookup");
      } else {
        toast.error(res.data.message,{autoClose: 2000,});
      }
    } catch (error) {
      toast.error(error.response.data.message,{autoClose: 2000,});
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registrationApi();
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setInputData((prevInputData) => ({
      ...prevInputData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="flex w-full">
      <div className="bg-white w-full sm:w-[80%] md:w-[60%] lg:w-[40%] m-auto border-1 my-14 border-black px-4 py-7 rounded-xl space-y-5 shadow-2xl">
      <ToastContainer />
        <div className="text-3xl text-center text-blue-500 font-semibold">
          Create Registration
        </div>
        <form className="space-y-5" onSubmit={handleSubmit}>
          {inputDataArray.map((item, i) => (
            <div key={i}>
              {item.type === "text" ? (
                <div className="space-y-1">
                  <TextField
                    type="text"
                    name={item.name}
                    className="w-full"
                    label={item.label}
                    size="small"
                    required
                    value={inputData[item.name]}
                    onChange={!(item.name=="address") && handleChange}
                  />
                </div>
              ) : (
                <FormControl fullWidth size="small">
                  <TextField
                    select
                    name={item.name}
                    label={item.label}
                    value={inputData[item.name]}
                    onChange={handleChange}
                    required
                    InputLabelProps={{
                      shrink: true,
                    }}
                    SelectProps={{
                      MenuProps: {
                        anchorOrigin: {
                          vertical: "bottom",
                          horizontal: "left",
                        },
                        transformOrigin: {
                          vertical: "top",
                          horizontal: "left",
                        },
                        getContentAnchorEl: null,
                      },
                    }}
                    sx={{
                      "& .MuiInputBase-root": {
                        height: "36px",
                      },
                    }}
                  >
                    {item.options.map((option, index) => (
                      <MenuItem key={index} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>
              )}
            </div>
          ))}
          {roles === "1" && (
            <div className="space-y-1">
              <label>Medallion</label>
              <Checkbox
                label="Check input box"
                onChange={handleChange}
                name="medallion"
                checked={inputData.medallion}
              />
            </div>
          )}
          <div className="text-center">
            <CustomButton
              loading={loading}
              buttonName="Create Registration"
              type="submit"
              variant="contained"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
