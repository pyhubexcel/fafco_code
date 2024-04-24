import { Link, useNavigate } from "react-router-dom";
import CustomButton from "../../components/ui/CustomButton";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { signupSchema } from "../../schema";
import { useFormik } from "formik";
import axiosInstance from "../../utils/axios";
import { Autocomplete, Box, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { useState } from "react";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import toast, { Toaster } from 'react-hot-toast';

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

export default function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [countryCode, setCountryCode] = useState(null);


    const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
        useFormik({
            initialValues: {
                name: "",
                phone: "",
                email: "",
                confirmEmail: "",
                password: "",
                confirmPassword: "",
                role: "",
            },
            validationSchema: signupSchema,
            onSubmit: async (values) => {
                console.log("values===", values);
                setLoading(true);
                const payload = {
                    name: values.name,
                    phone: ` ${countryCode} ` + values.phone,
                    email: values.email,
                    password: values.password,
                    customer_type: values.role
                }
                try {
                    const res = await axiosInstance.post('api/auth/signup/', payload, {
                        headers: {
                            "Content-Type": "application/json",
                        }
                    });
                    console.log("res ===", res.data);
                    if (res.status === 200) {
                        toast.success('Registration Successfully!')
                        navigate('/login');
                    }
                } catch (error) {
                    if (error.response.data.phone) {
                        toast.error(error.response.data.phone[0])
                    }
                    if (error.response.data.email) {

                        toast.error(error.response.data.email[0])
                    }
                    console.log("Error:", error.response.data);
                } finally {
                    setLoading(false)
                }
            },
        });

    const handleChangeCountry = (event, countryCode) => {
        setCountryCode(countryCode?.label)
    };
    // console.log('formik===', errors, touched, handleChange, handleBlur, handleSubmit)
    return (
        <div className="flex w-full p-5 ">
            <div className="w-full sm:w-[80%] md:w-[60%] lg:w-[40%] m-auto bg-white border-1 border-black px-4 py-6 rounded-xl space-y-5 shadow-2xl">
                <div className="text-3xl text-center text-blue-500 font-semibold">SIGNUP HERE</div>
                <form className="space-y-4" onSubmit={handleSubmit}>

                    {signupElements.map((item, i) => (
                        item?.name == "phone" ?
                            <div key={i} className="flex gap-5">
                                <Autocomplete
                                    id="country-select-demo"
                                    sx={{ width: 150 }}
                                    options={countries}
                                    size="small"
                                    onChange={handleChangeCountry}
                                    getOptionLabel={(option) => option.label}
                                    renderOption={(props, option) => (
                                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                            <img
                                                loading="lazy"
                                                width="20"
                                                srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                                src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                                alt=""
                                            />  {option.name}
                                        </Box>
                                    )}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="country"
                                            inputProps={{
                                                ...params.inputProps,
                                                autoComplete: 'new-password',
                                            }}
                                        />
                                    )} />




                                <TextField
                                    type={item.type}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values[item.name]}
                                    name={item.name}
                                    className="w-full"
                                    label={item.placeHolder}
                                    size="small"
                                    required
                                />

                            </div>
                            :
                            <div key={i} className="space-y-1">
                                <TextField
                                    type={item.type}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values[item.name]}
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
                    <div className="space-y-1">
                        <FormControl fullWidth variant="outlined"  >
                            <InputLabel size="small" htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.password}
                                name='password'
                                label="Password"
                                required
                                // id="outlined-adornment-password"
                                size="small"
                                className="w-full"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowPassword((show) => !show)}
                                            // onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        {errors.password && touched.password ? (
                            <div className="text-red-500 text-[12px] italic">{errors.password}</div>
                        ) : null}
                    </div>
                    <div className="space-y-1">
                        <FormControl fullWidth variant="outlined"  >
                            <InputLabel size="small" htmlFor="outlined-adornment-password">confirm Password</InputLabel>
                            <OutlinedInput
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.confirmPassword}
                                name='confirmPassword'
                                required
                                label="confirm Password"
                                // id="outlined-adornment-password"
                                size="small"
                                className="w-full"
                                type={showPassword2 ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowPassword2((show) => !show)}
                                            // onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword2 ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        {errors.confirmPassword && touched.confirmPassword ? (
                            <div className="text-red-500 text-sm italic">{errors.confirmPassword}</div>
                        ) : null}
                    </div>
                    <FormControl>
                        <label>I am a:</label>
                        <RadioGroup
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.role}
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="role"
                        >
                            <FormControlLabel value="1" control={<Radio />} label="Dealer" />
                            <FormControlLabel value="2" control={<Radio />} label="Homeowner" />
                        </RadioGroup>
                    </FormControl>
                    <CustomButton loading={loading} buttonName='Register' type="submit" />
                    <Toaster />
                </form>
                <div className="  text-center">
                    Already have account?<Link to='/' title="Login" className="text-blue-600"> Login</Link>
                </div>
            </div>
        </div>
    )
}
