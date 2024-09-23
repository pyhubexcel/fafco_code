import { Box, Card, Stack, Typography } from "@mui/material";

export default function InactiveAccount() {
    return (
        <Box className="min-w-[70%] flex justify-center my-14">
            <Card sx={{ width: '60%', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>
                <Box sx={{ padding: '10px', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 5px 40px 0px' }}>
                    <Typography sx={{ fontSize: '1.05rem', fontWeight: '600' }}>Account Lockout</Typography>
                </Box>
                <Stack sx={{ padding: '5px' }} >
                    <Box gap={2} sx={{ textAlign: 'center', padding: '20px', display: "flex", flexDirection: "column" }}>
                        <Box sx={{ padding: '5px', }} >
                            <Typography sx={{ fontSize: '1.75rem', fontWeight: '700' }}>Account Inactive</Typography>
                        </Box>
                        <Box  >
                            <Typography sx={{ fontSize: '1.2rem', fontWeight: '500' }}>Contact customercare@fafco.com to reactivate.
                            </Typography>
                        </Box>
                    </Box>
                </Stack>
            </Card>
        </Box >
    )
}