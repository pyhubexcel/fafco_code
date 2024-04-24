import { Box, Card, Typography } from "@mui/material";
import RegisteredUsers from "../../components/RegisteredUsers";
import CustomButton from "../../components/ui/CustomButton";
import { Link } from "react-router-dom";

export default function RegistrationLookup() {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center',width:'100%' }} my={3}>
            <Card sx={{ width: '95%', margin: 'auto', padding: '20px', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>
                <Typography sx={{ fontSize: '1.35rem', fontWeight: '700' }}>Registration Lookup</Typography>
                <RegisteredUsers />
                <Box sx={{width:'200px', direction: 'flex', justifyContent: 'flex-start' }} my={2}>
                <Link to='/homeownerRegistration'>
                    <CustomButton buttonName='View Registration' />
                    </Link>
                </Box>
            </Card>
        </Box>
    )
}
