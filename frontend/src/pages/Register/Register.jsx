import { Link, useNavigate } from "react-router-dom";
import CustomButton from "../../components/ui/CustomButton";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { signupSchema } from "../../schema";
import { useFormik } from "formik";
import { Autocomplete, Box, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { useDispatch, useSelector } from "react-redux";
import { register, resetReducer } from "../../redux/slices/RegisterSlice";
import { ToastContainer, toast } from 'react-toastify';


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

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [countryCode, setCountryCode] = useState(null);
    const RegisterSliceRes = useSelector((state) => state.RegisterSlice);
    const RegisterSliceLoading = useSelector((state) => state.RegisterSlice.isLoading);

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
                const payload = {
                    name: values.name,
                    phone: ` ${countryCode} ` + values.phone,
                    email: values.email,
                    password: values.password,
                    customer_type: values.role
                }
                dispatch(register(payload));
            },
        });


    const handleChangeCountry = (event, countryCode) => {
        setCountryCode(countryCode?.label)
    };


    useEffect(() => {
        if (RegisterSliceRes?.data?.success) {
            dispatch(resetReducer())
            toast.success("registered successfully",{autoClose: 2000,});
            navigate('/registerLink')
        }

        if (RegisterSliceRes?.data?.response?.data.email) {
            dispatch(resetReducer())
            toast.error(RegisterSliceRes?.data?.response?.data.email[0],{autoClose: 2000,});
        }
        if (RegisterSliceRes?.data?.response?.data.phone) {
            dispatch(resetReducer())
            toast.error(RegisterSliceRes?.data?.response?.data.phone[0],{autoClose: 2000,});
        }

    }, [RegisterSliceRes?.data?.success, RegisterSliceRes?.data?.response?.status == 400])

    return (
        <div className="w-[90%] sm:w-[400px] md:w-[400px] lg:w-[500px] m-auto bg-white my-6  px-4 py-10 rounded-xl space-y-6 shadow-2xl">
            <ToastContainer />
            <div className="text-3xl text-center text-blue-500 font-semibold">SIGNUP HERE</div>
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
                                            error={
                                                RegisterSliceRes?.data?.phone &&
                                                RegisterSliceRes?.data?.phone?.length > 0
                                                // RegisterSliceRes.data.phone == item.name  &&
                                            }
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
                                    error={
                                        RegisterSliceRes?.data?.phone &&
                                        RegisterSliceRes?.data?.phone?.length !== 10
                                    }
                                    type="number"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values[item.name]}
                                    name={item.name}
                                    className="w-full"
                                    label={item.placeHolder}
                                    size="small"
                                    required
                                    inputProps={{
                                        maxLength: 10
                                    }}
                                />
                            </div>
                            {errors[item.name] && touched[item.name] ? (
                                <div className="text-red-500 text-[12px] italic ml-32">{errors[item.name]}</div>
                            ) : null}
                        </div>
                        :
                        <div key={i} className="space-y-1">
                            <TextField
                                error={
                                    RegisterSliceRes?.data?.email &&
                                    RegisterSliceRes?.data?.email?.length > 0 &&
                                    (item.name === 'confirmEmail' || item.name === 'email')
                                    // RegisterSliceRes.data.email.includes(item.name)  &&
                                }
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
                    <FormControl
                        fullWidth
                        variant="outlined"
                        size="small"
                        required
                    >
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                            name='password'
                            label="Password"
                            required
                            // id="outlined-adornment-password"
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
                                        {!showPassword ? <VisibilityOff /> : <Visibility />}
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
                    <FormControl
                        fullWidth
                        variant="outlined"
                        size="small"
                        required
                    >
                        <InputLabel
                            htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                        <OutlinedInput
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.confirmPassword}
                            name='confirmPassword'
                            required
                            label="confirm Password"
                            // id="outlined-adornment-password"
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
                                        {!showPassword2 ? <VisibilityOff /> : <Visibility />}
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
                <CustomButton loading={RegisterSliceLoading} buttonName='Register' type="submit" variant='contained' />
            </form>
            <div className="  text-center">
                Already have account?<Link to='/login' title="Login" className="text-blue-600"> Login</Link>
            </div>
        </div>
    )
}
