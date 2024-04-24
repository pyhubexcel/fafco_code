import { Box, Card, Stack, TextField, Typography } from "@mui/material";
import CustomButton from "../../components/ui/CustomButton";
import { useFormik } from "formik";
import { loginSchema } from "../../schema";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axiosInstance from "../../utils/axios";
import toast, { Toaster } from "react-hot-toast";

export default function ResetPassword() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
        useFormik({
            initialValues: {
                email: "",
            },
            // validationSchema: loginSchema,
            onSubmit: async (values) => {
                console.log("values===");
                console.log("values===", values);
                setLoading(true);
                const payload = {
                    email: values.email,
                }
                try {
                  const res =  await axiosInstance.post('api/auth/forgot-password/', payload);
                    console.log("res ===res", res);
                    if(res.status === 200){
                        navigate('/newPassword')
                    }
                } catch (error) {
                    toast.error(error.response.data.detail)
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
                                <TextField
                                    type='email'
                                    name='email'
                                    id="outlined-size-small"
                                    className="w-full"
                                    label='Email'
                                    size="small"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.email}
                                    // id="outlined-size-small"
                                    required
                                />
                                {errors.email && touched.email ? (
                                    <div className="text-red-500 text-[12px] italic">{errors.email}</div>
                                ) : null}
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