import CustomButton from "../../components/ui/CustomButton";
import { Checkbox, TextField } from "@mui/material";
import { useState } from "react";
import Cookies from 'js-cookie';
import axiosInstance from "../../utils/axios";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const inputDataArray = [
    {
        name: 'name',
        label: 'Name',
    },
    {
        name: 'address',
        label: 'Address',
    },
    {
        name: 'zip_code',
        label: 'Zip Code',
    },
    {
        name: 'country',
        label: 'Country',
    },
    {
        name: 'owner_phone',
        label: 'Phone',
    },
    {
        name: 'owner_email',
        label: 'Email',
    },
]

export default function CreateRegistration() {
    const [loading, setLoading] = useState(false)
    const location=useLocation()
    // console.log(location.state);
    const [inputData, setInputData] = useState({
        name: '',
        address: location.state.delivery_line_1,
        zip_code: location.state.components.zipcode,
        country: '',
        owner_phone: '',
        owner_email: '',
        medallion: '',
    });

    const registrationApi = async () => {
        const token = Cookies.get('token')
        console.log(token, 'cccccccccccccccccccccccccccc')
        try {
            setLoading(true)
            const payload = {
                name: inputData.name,
                address: inputData.address,
                zip_code: inputData.zip_code,
                country: inputData.country,
                owner_phone: inputData.owner_phone,
                owner_email: inputData.owner_email,
                medallion: inputData.medallion,
            };

            console.log(payload, 'dataaaaaa')

            const res = await axiosInstance.post(`/api/auth/profiles/`, payload, {
                headers: {
                    'Content-Type': "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            console.log("Response:", res);
            if (res.status == 200) {
                toast.success(res.data.message)
                // setUploadState({
                //     uploadInput: null,
                //     commentInput: ''
                // })
            }
        } catch (error) {
            toast.error(error.response.data.address[0])
            console.log("Error:", error);
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("data....", inputData)
        registrationApi();
    }

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setInputData(prevInputData => ({
            ...prevInputData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    return (
        <div className="flex w-full">
            <div className="bg-white w-full sm:w-[80%] md:w-[60%] lg:w-[40%] m-auto border-1 my-14 border-black px-4 py-7 rounded-xl space-y-5 shadow-2xl">
                <div className="text-3xl text-center text-blue-500 font-semibold ">Create Registration</div>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    {inputDataArray.map((item, i) => (
                        <div key={i}>
                            <div className="space-y-1">
                                <TextField
                                    type='text'
                                    name={item.name}
                                    className="w-full"
                                    label={item.label}
                                    size="small"
                                    required
                                    value={inputData[item.name]}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    ))}
                    <div className="space-y-1">
                        <label>Medallion</label>
                        <Checkbox
                            label="Check input box"
                            onChange={handleChange}
                            name='medallion'
                            checked={inputData.medallion}
                        />
                    </div>

                    {/* <div className="space-y-1">
                        <TextField
                            type='text'
                            // onBlur={handleBlur}
                            // onChange={handleChangeStreet}
                            // value={inputData.street}
                            name='name'
                            // id="outlined-size-small"
                            className="w-full"
                            label='Name'
                            size="small"
                            required

                        />
                    </div>
                    <div className="space-y-1">
                        <TextField
                            type='text'
                            // onBlur={handleBlur}
                            // onChange={handleChangeStreet}
                            // value={inputData.street}
                            name='street'
                            // id="outlined-size-small"
                            className="w-full"
                            label='Address'
                            size="small"
                            required

                        />
                    </div>
                    <div className="space-y-1">
                        <TextField
                            type='text'
                            // onBlur={handleBlur}
                            // onChange={handleChange}
                            // value={inputData.city}
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
                            // onChange={handleChange}
                            // value={inputData.state}
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
                            // onChange={handleChange}
                            // value={inputData.zipcode}
                            name='zipcode'
                            // id="outlined-size-small"
                            className="w-full"
                            label='Zip Code'
                            size="small"
                            required
                        />
                    </div> */}
                    <div className="text-center">
                        <CustomButton
                            loading={loading}
                            buttonName='Create User'
                            type="submit"
                            variant='contained'
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}
