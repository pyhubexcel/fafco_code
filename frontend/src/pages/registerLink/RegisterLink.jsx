import { Box, Card, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import { useSelector } from "react-redux";

export default function RegisterLink() {
    const customSliceRes = useSelector((state) => state.CustomSlice);
    console.log(customSliceRes,'customSliceRes')
   
    const resendApi = async () => {
        try {
            // const token = cookie.load('token');
            const res = await axiosInstance.post(`api/auth/resend-verification/`, {
                headers: {
                    "Content-Type": "application/json",
                    // "Authorization": `Bearer ${token}`
                }
            });
            console.log("street res ===", res.data.data);
            // setUserList(res?.data?.data)
        } catch (error) {
            console.log("Error:", error);
        }
    }
    return (
            <Card sx={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',margin:'20px' }}>
                <Stack sx={{ padding: '10px' }} >
                    <Box gap={3} sx={{ textAlign: 'center', padding: '20px', display: "flex", flexDirection: "column" }}>
                        <Box sx={{ padding: '10px', }} >
                            <Typography fontSize={15}>Registraction Successful! Please check your email for a confirmation link that you must click on to activate your account. If the email doesn&apos;t arrive, be sure to check your spam/junk email folders. If it has not arrived you can resend by clicking the link below. If you are still having problems please contact Customer Care.</Typography>
                        </Box>
                        <div onClick={resendApi}>
                        <Link className="text-blue-600 underline ">Click here to resend your confirmation email</Link>
                        </div>
                    </Box>
                </Stack>
            </Card>
    )
}