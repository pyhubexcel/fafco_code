import { Box, Card, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, Typography } from "@mui/material";
import CustomButton from "../../components/ui/CustomButton";
import { useFormik } from "formik";
import {ToastContainer, toast} from "react-toastify"
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axiosInstance from "../../utils/axios";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

export default function NewPassword() {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { email } = useParams();
    const navigate = useNavigate();
    const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
        useFormik({
            initialValues: {
                newpassword: "",
                confirmpassword: ""
            },
            onSubmit: async (values) => {
                setLoading(true);
                const payload = {
                    newPassword: values.newpassword,
                    confirmPassword: values.confirmpassword,
                    email: email
                }
                try {
                    const res = await axiosInstance.post('api/auth/reset/confirm/', payload);
                    if (res.status === 200) {
                        toast.success("password updated successfully",{autoClose: 2000,})
                        navigate('/')
                    }
                } catch (error) {
                    if (error)
                        toast.error(error.response.data.error,{autoClose: 2000,})
                } finally {
                    setLoading(false)
                }
            },
        });
    return (
        <Box className="flex justify-center my-20">
            <Card sx={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>
            <ToastContainer />
                <Box sx={{ padding: '20px', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 5px 40px 0px' }}>
                    <Typography sx={{ fontSize: '1.5rem', fontWeight: '700' }}>Password Reset</Typography>
                    <Typography sx={{ fontSize: '1.05rem', fontWeight: '400', paddingY: "4px" }}>Enter your email to receive a password reset link</Typography>
                </Box>
                <Stack sx={{ padding: '10px' }} >
                    <Box>
                        <Box gap={3} sx={{ padding: '20px', display: "flex", flexDirection: "column" }}>
                            <Box sx={{ padding: '10px', }} >
                                <Typography sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Forgot your password?</Typography>
                            </Box>
                            <form className="space-y-4" onSubmit={handleSubmit}>
                                <div className="space-y-1">
                                    <FormControl fullWidth variant="outlined"  >
                                        <InputLabel size="small" htmlFor="outlined-adornment-password">New Password</InputLabel>
                                        <OutlinedInput
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.password}
                                            name='newpassword'
                                            label="New Password"
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
                                <div className="space-y-1">
                                    <FormControl fullWidth variant="outlined"  >
                                        <InputLabel size="small" htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                                        <OutlinedInput
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.password}
                                            name='confirmpassword'
                                            label="Confirm Password"
                                            // id="outlined-adornment-password"
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
                                <CustomButton
                                    buttonName="Submit"
                                    loading={loading}
                                    variant={'contained'}
                                    type="submit"
                                />
                                <Box>
                                    <Link to="/login">
                                        <CustomButton
                                            buttonName="back to login"
                                            variant={'contained'}
                                        >
                                        </CustomButton>
                                    </Link>
                                </Box>
                            </form>
                        </Box>
                    </Box>
                </Stack>
            </Card>
        </Box >
    )
}