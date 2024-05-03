import CustomButton from "../../components/ui/CustomButton";
import { useFormik } from "formik";
import { Autocomplete, Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import axiosInstance from "../../utils/axios";
import cookie from 'react-cookies'


const signupElements = [
    {
        name: 'name',
        placeHolder: 'Name',
        type: 'text'
    },
    {
        name: 'phone',
        placeHolder: 'Phone Number',
        type: 'number'
    },
    {
        name: 'email',
        placeHolder: 'Email',
        type: 'email'
    },
    {
        name: 'confirmEmail',
        placeHolder: 'Confirm Email',
        type: 'email'
    }
]

const countries = [
    {
        code: 'CA',
        label: '+1',
        name: "United States",
        phone: '11111'
    },
    {
        code: 'IN',
        label: '+91',
        name: "India",
        phone: '0000'
    },
    {
        code: 'AU',
        label: '+61',
        name: "Australia",
        phone: '222'
    },
]

export default function UpdateAccountInfo() {
    const [loading, setLoading] = useState(false)
    const [countryCode, setCountryCode] = useState(null);
    const [userDetails, setUserDetails] = useState({
        name: '',
        phone: '',
        email: '',
        confirmEmail: ''
    });

    const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
        useFormik({
            initialValues: userDetails,

            onSubmit: async (values) => {
                console.log(userDetails, 'valuessssss===userDetails')

                const token = cookie.load('token')
                try {
                    setLoading(true)
                    const payload = {
                        name: values.name,
                        phone: ` ${countryCode} ` + values.phone,
                    }

                    console.log(payload, 'dataaaaaa')

                    const res = await axiosInstance.post(`/api/auth/update-profile/2/`, payload, {
                        headers: {
                            'Content-Type': "application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    });
                    if (res.status == 200) {
                        toast.success(res?.data?.message, " create successfully")
                    }
                } catch (error) {
                    toast.error(error.response.data.address[0])
                    console.log("Error:", error);
                } finally {
                    setLoading(false)
                }
            },
        });

    const lookupApi = async () => {
        try {
            setLoading(true)
            const token = cookie.load('token');
            const id = cookie.load('id');
            const res = await axiosInstance.get(`api/auth/update-profile/${id}/`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            if(res?.data){
                setUserDetails({
                    name: res?.data?.name,
                    phone: res?.data?.phone,
                    email: res?.data?.email,
                    confirmEmail:res?.data?.email
                })
            }


        } catch (error) {
            console.log("Error:", error);
        } finally {
            setLoading(false)
        }
    }


    const handleChangeCountry = (event, countryCode) => {
        setCountryCode(countryCode?.label)
    };

    useEffect(() => {
        lookupApi();
    }, [])


    return (
        <div>
            {loading ? <div>Loading</div> : <div className="w-[90%] sm:w-[400px] md:w-[400px] lg:w-[500px] m-auto bg-white my-6  px-4 py-10 rounded-xl space-y-6 shadow-2xl">
                <div className="text-3xl text-center text-blue-500 font-semibold">Update Account Info</div>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    {signupElements.map((item, i) => (
                        item?.name == "phone" ?
                            <div key={i}>
                                <div className="flex gap-2">
                                    <Autocomplete
                                        id="country-select-demo"
                                        sx={{ width: 150 }}
                                        options={countries}
                                        size="small"
                                        
                                        onChange={handleChangeCountry}
                                        getOptionLabel={(option) => option.label}
                                        renderOption={(props, option) => (
                                            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                                {option.name}
                                            </Box>
                                        )}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Country"
                                                inputProps={{
                                                    ...params.inputProps,
                                                    autoComplete: 'new-password',
                                                }}
                                                required
                                            />
                                        )} />

                                    <TextField
                                        type={item.type}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={userDetails?.phone}
                                        name={item.name}
                                        className="w-full"
                                        label={item.placeHolder}
                                        size="small"
                                        required
                                    />
                                </div>
                                {errors[item.name] && touched[item.name] ? (
                                    <div className="text-red-500 text-[12px] italic ml-32">{errors[item.name]}</div>
                                ) : null}
                            </div>
                            :
                            <div key={i} className="space-y-1">
                                <TextField
                                    type={item.type}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={userDetails[item.name]}
                                    name={item.name}
                                    className="w-full"
                                    label={item.placeHolder}
                                    size="small"
                                    required
                                />
                                {errors[item.name] && touched[item.name] ? (
                                    <div className="text-red-500 text-[12px] italic">{errors[item.name]}</div>
                                ) : null}
                            </div>))}
                    <CustomButton loading={loading} buttonName='Update Details' type="submit" onClick={handleSubmit} variant='contained' />
                </form>
            </div>}
        </div>
    )
}
