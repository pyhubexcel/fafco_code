import CustomButton from "../../components/ui/CustomButton";
import axiosInstance from "../../utils/axios";
import { TextField } from "@mui/material";
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from "react-router-dom";

export default function AddressValidation() {
    const [loading, setLoading] = useState(false);
    const [inputData, setInputData] = useState({
        street: "",
        city: "",
        state: "",
        zipcode: ""
    });
    const [showData, setShowData] = useState(false)
    const [apiData, setApiData] = useState([]);
    const [addressData, setAddressData] = useState('');
    const navigate = useNavigate();


    const streetApi = async (props) => {
        // console.log("inside api function value:",value)
        console.log('props=====', props)
        try {
            const res = await axiosInstance.get(`api/auth/autocomplete/?search_term=${props}`);
            console.log("street res ===", res.data);
            setApiData(res.data);
            console.log('apidata', apiData)
        } catch (error) {
            console.log("Error:", error);
        }
    }


    const addressValidationApi = async (e) => {
        e.preventDefault();
        console.log('inputfileds values:', inputData.street, inputData.state)
        setLoading(true)
        try {
            const res = await axiosInstance.post(`http://116.202.210.102:8074/api/auth/validation/`, {

                street: inputData.street,
                city: inputData.city,
                state: inputData.state,
                zipcode: inputData.zipcode,
            });
            setLoading(false)
            setAddressData(res)
            console.log("address validation res ===", res);
            navigate('/createRegistration',{state:res.data})
            if (res.data.error) {
                toast.error(res.data.error)
            } else {
                toast.success("Address Verified")
            }
        } catch (error) {
            toast.error("Address not Verified!!!")
            console.log("Error:", error);
        } finally {
            setLoading(false)
        }
    }

    const handleChangeStreet = (event) => {
        const { name, value } = event.target;
        // console.log('inside handlechange name and value====',name,value)
        setInputData({ ...inputData, [name]: value });
        console.log('inputData', inputData)
        streetApi(value)
        setShowData(true)
    };
    const handleChange = (event) => {
        const { name, value } = event.target;
        // console.log('inside handlechange name and value====',name,value)
        setInputData({ ...inputData, [name]: value });
        // console.log('apiData', apiData)
    }

    const handleOptionClick = (user) => {
        setShowData(false)
        setInputData({
            ...inputData,
            street: user.street_line,
            city: user.city,
            state: user.state,
            zipcode: user.zipcode
        });
    };

    return (
        <div className="flex w-full">
            <Toaster />
            <div className="bg-white w-[90%] sm:w-[400px] md:w-[400px] lg:w-[500px] m-auto border-1 my-14 border-black px-4 py-7 rounded-xl space-y-5 shadow-2xl">
                <div className="text-3xl text-center text-blue-500 font-semibold ">Address Verification</div>
                <form className="space-y-5" onSubmit={addressValidationApi} >
                    <div className="space-y-1">
                        <TextField
                            type='text'
                            // onBlur={handleBlur}
                            onChange={handleChangeStreet}
                            value={inputData.street}
                            name='street'
                            // id="outlined-size-small"
                            className="w-full"
                            label='Address'
                            size="small"
                            required

                        />
                        <div className="bg-gray-200 w-full max-h-40 overflow-auto rounded-lg " style={{ display: showData ? 'block' : 'none' }} >
                            {apiData.map((user, i) => (
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
                            ))}
                        </div>
                    </div>

                    <div className="space-y-1">
                        <TextField
                            type='text'
                            // onBlur={handleBlur}
                            onChange={handleChange}
                            value={inputData.city}
                            name='city'
                            // id="outlined-size-small"
                            className="w-full"
                            label='City'
                            size="small"
                            required

                        />
                    </div>
                    <div className="space-y-1">
                        <TextField
                            type='text'
                            // onBlur={handleBlur}
                            onChange={handleChange}
                            value={inputData.state}
                            name='state'
                            // id="outlined-size-small"
                            className="w-full"
                            label='State'
                            size="small"
                            required

                        />
                    </div>
                    <div className="space-y-1">
                        <TextField
                            type='text'
                            // onBlur={handleBlur}
                            onChange={handleChange}
                            value={inputData.zipcode}
                            name='zipcode'
                            // id="outlined-size-small"
                            className="w-full"
                            label='Zip Code'
                            size="small"
                            required

                        />
                    </div>
                    <div className="text-center">
                        {/* <Link
                            to={addressData ? '/viewRegistration' : ''}
                        > */}
                            <CustomButton
                                loading={loading}
                                buttonName='View'
                                type="submit"
                                variant='contained'
                            />
                        {/* </Link> */}
                        <Toaster />
                    </div>
                </form>
            </div>
        </div>
    )
}