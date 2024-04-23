import { Box, Card, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function RegisterLink() {
    return (
        <Box className="flex justify-center my-20">
            <Card sx={{ width: '60%', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>
                <Stack sx={{ padding: '10px' }} >
                    <Box gap={3} sx={{ textAlign: 'center', padding: '20px', display: "flex", flexDirection: "column" }}>
                        <Box sx={{ padding: '10px', }} >
                            <Typography sx={{ fontSize: '1.05rem' }}>Registraction Successful! Please check your email for a confirmation link that you must click on to activate your account. If the email doesn&apos;t arrive, be sure to check your spam/junk email folders. If it has not arrived you can resend by clicking the link below. If you are still having problems please contact Customer Care.</Typography>
                        </Box>
                        <Link className="text-blue-600 underline">Click here to resend your confirmation email</Link>
                    </Box>
                </Stack>
            </Card>
        </Box >
    )
}