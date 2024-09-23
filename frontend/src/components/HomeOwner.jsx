import { Box, Card, Stack, Typography } from "@mui/material"
import { ToastContainer } from "react-toastify"

const HomeOwner = () => {
  return (
            <Card sx={{ margin:'25px', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>
                <ToastContainer />
                <Stack sx={{ padding: '5px' }} >
                    <Box gap={2} sx={{ textAlign: 'center', padding: '20px', display: "flex", flexDirection: "column" }}>
                        <Stack gap={3} >
                            <Typography sx={{ fontSize: '1.2rem', fontWeight: '500' }}>Welcome to FAFCO&apos;s customer service site for homeowners. Here you can register your system for exclusive owner benefits, ask for help finding a dealer, or open a claim for warranty service.</Typography>
                            <Typography>Make a selection from the menu above to get started!</Typography>
                        </Stack>
                    </Box>
                </Stack>
            </Card>
  )
}

export default HomeOwner;
