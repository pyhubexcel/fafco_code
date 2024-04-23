import { Box, Card, Stack, TextField, Typography } from "@mui/material";
import CustomButton from "../../components/ui/CustomButton";

export default function ResetPassword() {
    return (
        <Box className="flex justify-center my-20">
            <Card sx={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>

                <Box sx={{ padding: '20px', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 5px 40px 0px' }}>
                    <Typography sx={{ fontSize: '1.5rem', fontWeight: '700' }}>Password Reset</Typography>
                    <Typography sx={{ fontSize: '1.05rem', fontWeight: '400', paddingY: "4px" }}>Enter your email to receive a password reset link</Typography>
                </Box>
                <Stack sx={{ padding: '10px' }} >
                    <Box>
                        <Box gap={3} sx={{ textAlign: 'center', padding: '20px', display: "flex", flexDirection: "column" }}>
                            <Box sx={{ padding: '10px', }} >
                                <Typography sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Forgot your password?</Typography>
                            </Box>
                            <TextField
                                type='text'
                                // onBlur={handleBlur}
                                // onChange={handleChange}
                                // value={values.email}
                                name='email'
                                id="outlined-size-small"
                                className="w-full"
                                label='Email'
                                // placeholder="email"
                                size="small"

                            />
                            <CustomButton buttonName="Email Link" />
                        </Box>
                    </Box>
                </Stack>
            </Card>
        </Box >
    )
}