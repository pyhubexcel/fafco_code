import { Link, useNavigate } from "react-router-dom";
import CustomButton from "../../components/ui/CustomButton";
import { useFormik } from "formik";
import { loginSchema } from "../../schema";
import axiosInstance from "../../utils/axios";
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import cookie from 'react-cookies'

export default function Login() {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [apiResponse,setApiResponse] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        cookie.remove('token');
        cookie.remove('role');
    },[])
    
    const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
        useFormik({
            initialValues: {
                email: "",
                password: "",
            },
            validationSchema: loginSchema,
            onSubmit: async (values) => {
                console.log("values===", values);
                setLoading(true);
                const payload = {
                    username: values.email,
                    password: values.password
                }
                try {
                    const res = await axiosInstance.post('api/auth/login/', payload, {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                    console.log("res ===", res.data);
                    setApiResponse(res)
                    if (res.status === 200) {
                        cookie.save('token', res?.data?.data?.refresh)
                        // cookie.save('name', res?.data?.data?.email)
                        cookie.save('role', res?.data?.data?.customer_type)
                        toast.success('Login Successfully!')
                        navigate('/home');
                    }
                } catch (error) {
                    if (error.response.data.non_field_errors) {
                        toast.error(error.response.data.non_field_errors[0])
                        // console.log("Error:", error.response.data.non_field_errors[0]);
                    }
                } finally {
                    setLoading(false)
                }
            },
        });
    // console.log('formik===', errors, touched, handleChange, handleBlur, handleSubmit)

    return (
        <div className="flex w-full p-5">
            <div className="bg-white w-full sm:w-[80%] md:w-[60%] lg:w-[40%] m-auto border-1 my-14 border-black px-4 py-7 rounded-xl space-y-5 shadow-2xl">
                <div className="text-3xl text-center text-blue-500 font-semibold ">LOGIN HERE</div>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="space-y-1">
                        <TextField
                            type='text'
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            name='email'
                            // id="outlined-size-small"
                            className="w-full"
                            label='Email'
                            size="small"
                            required

                        />
                        {errors.email && touched.email ? (
                            <div className="text-red-500 text-[12px] italic">{errors.email}</div>
                        ) : null}
                    </div>
                    <div className="space-y-1">
                        <FormControl fullWidth variant="outlined"  >
                            <InputLabel size="small" htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.password}
                                name='password'
                                label="Password"
                                id="outlined-adornment-password"
                                size="small"
                                required
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowPassword((show) => !show)}
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
                    <div className=" text-blue-600 flex float-right">
                        <Link to='resetPassword' title="reset password" className="py-2">Forgot Password?</Link>
                    </div>
                    <div className="text-center">
                        <CustomButton
                            loading={loading}
                            buttonName='Login'
                            type="submit"
                        />
                        <Toaster />
                    </div>
                </form>
                <div className=" text-center">
                    Don&apos;t have an account?<Link to='/signup' title="register" className="text-blue-600" > Create Account</Link>
                </div>
            </div>
        </div>
    )
}
