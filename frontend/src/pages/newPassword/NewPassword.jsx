import { Box, Card, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, TextField, Typography } from "@mui/material";
import CustomButton from "../../components/ui/CustomButton";
import { useFormik } from "formik";
import { loginSchema } from "../../schema";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axiosInstance from "../../utils/axios";
import toast, { Toaster } from "react-hot-toast";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

export default function NewPassword() {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
        useFormik({
            initialValues: {
                newpassword: "",
                confirmPassword: ""
            },
            // validationSchema: loginSchema,
            onSubmit: async (values) => {
                console.log("values===");
                console.log("values===", values);
                setLoading(true);
                const payload = {
                    newPassword: values.email,
                    confirmPassword: values.email,
                }
                try {
                    const res = await axiosInstance.post('api/auth/reset/confirm/MQ/c5ztit-56c9de5822c6f8646bae0a94ab1391ec/ ', payload);
                    console.log("res ===", res.data);
                    if(res.status === 200){
                        navigate('/')
                    }
                } catch (error) {
                    if (error)
                        toast.error(error.response.data.error)
                    console.log("Error:", error);
                } finally {
                    setLoading(false)
                }
            },
        });
    // console.log('formik===', errors, touched, handleChange, handleBlur, handleSubmit)
    return (
        <Box className="flex justify-center my-20">
            <Card sx={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>

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
                                    buttonName="Email Link"
                                    loading={loading}
                                    type="submit"

                                />
                                <Toaster />
                            </form>
                        </Box>
                    </Box>
                </Stack>
            </Card>
        </Box >
    )
}