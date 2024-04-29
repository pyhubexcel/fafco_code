import { Link, useNavigate } from "react-router-dom";
import CustomButton from "../../components/ui/CustomButton";
import { useFormik } from "formik";
import { loginSchema } from "../../schema";
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { customApiFunc, resetReducer } from "../../redux/slices/CustomSlice";
import { ToastContainer, toast } from 'react-toastify';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const apiUrl = 'api/auth/login/'

    const customSliceRes = useSelector((state) => state.CustomSlice);
    const customSliceLoading = useSelector((state) => state.CustomSlice.isLoading);
    const customSliceSuccess = useSelector((state) => state.CustomSlice.isSuccess);

    // console.log('customSliceRes', customSliceRes)

    const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
        useFormik({
            initialValues: {
                email: "",
                password: "",
            },
            validationSchema: loginSchema,
            onSubmit: (values) => {
                // console.log("values===", values);
                const payload = {
                    username: values.email,
                    password: values.password
                }
                // try {
                //     const res = await axiosInstance.post('api/auth/login/', payload, {
                //         headers: {
                //             "Content-Type": "application/json"
                //         }
                //     });
                //     console.log("res ===", res.data);
                //     if (res.status === 200) {
                //         cookie.save('token', res?.data?.data?.access)
                //         cookie.save('role', res?.data?.data?.customer_type)
                //         toast.success('Login Successfully!')
                //         navigate('/');
                //         window.top.location.reload();
                //     }
                // } catch (error) {
                //     toast.error(error.response.data.non_field_errors[0])
                //     console.log("Error:", error.response.data.non_field_errors[0]);
                // } finally {
                //     setLoading(false)
                // }

                dispatch(customApiFunc(apiUrl, payload));

                // dispatch(resetReducer());
            },
        });

    // useEffect(() => {
    //     dispatch(resetReducer());
    // }, [customSliceSuccess])

    useEffect(() => {
        if (customSliceRes.data.status) {
            // toast.success("Login Successful");
            dispatch(resetReducer());
            navigate('/login')
        }
        if (customSliceRes.data.non_field_errors) {
            // console.log(customSliceRes.data.non_field_errors)
            toast.error(customSliceRes.data.non_field_errors[0])
        }
    }, [customSliceSuccess, customSliceRes.data.non_field_errors])

    return (
        <div className="bg-white w-[90%] sm:w-[400px] md:w-[400px] lg:w-[500px] m-auto my-6 px-4 py-10 rounded-xl space-y-6 shadow-2xl">
            <div className="text-3xl text-center text-blue-500 font-semibold ">LOGIN HERE</div>
            <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="space-y-1">
                    <TextField
                        error={customSliceRes.data.non_field_errors && customSliceRes?.data?.non_field_errors?.length > 0 }
                        type='email'
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
                    <FormControl
                        fullWidth
                        variant="outlined"
                        size="small"
                        required
                        error={customSliceRes.data.non_field_errors && customSliceRes?.data?.non_field_errors?.length > 0 }
                    >
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                            name='password'
                            label="Password"
                            id="outlined-adornment-password"
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
                    <Link to='/forgetPassword' title="reset password" className="py-2">Forgot Password?</Link>
                </div>
                <div className="text-center">
                    <CustomButton
                        loading={customSliceLoading}
                        buttonName='Login'
                        type="submit"
                        variant='contained'
                    />
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="colored"
                    // transition:Zoom,
                    />
                </div>
            </form>
            <div className=" text-center">
                Don&apos;t have an account?<Link to='/register' title="register" className="text-blue-600" > Create Account</Link>
            </div>
        </div>
    )
}
