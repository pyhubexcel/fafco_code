import { Box, Card, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';


export default function RegisterLink() {
    const registerdEmail=     localStorage.getItem("registerdMail")    
    const resendApi = async () => {
        try {
            const payload = {
                username: registerdEmail,
            } 
            const res = await axiosInstance.post(`api/auth/resend-verification/`,{payload}, {
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if(res.data.success){
                toast.success("email resent successfully");
            }
            else{
                toast.error("please make registration first");
            }
        } catch (error) {
            toast.error("please make registration first");
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