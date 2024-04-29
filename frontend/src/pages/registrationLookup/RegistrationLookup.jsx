import { Box, Card, Typography } from "@mui/material";
import RegisteredUsers from "../../components/RegisteredUsers";
import CustomButton from "../../components/ui/CustomButton";
import { Link } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import { useEffect, useState } from "react";
import cookie from 'react-cookies'
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function RegistrationLookup() {
    const [userList, setUserList] = useState([])
    const lookupApi = async () => {
        try {
            const token = cookie.load('token');
            const res = await axiosInstance.get(`api/auth/profiles/`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            console.log("street res ===", res.data.data);
            setUserList(res?.data?.data)
        } catch (error) {
            console.log("Error:", error);
        }
    }

    useEffect(() => {
        lookupApi();
    }, [])
    return (
        // <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }} my={1}>
        <Card sx={{ width: '95%', margin: 'auto', padding: '20px', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>
            <Typography sx={{ fontSize: '1.35rem', fontWeight: '700' }}>Registration Lookup</Typography>
            {userList?.length > 0 ?
                <RegisteredUsers userList={userList} />
                :
                <Stack spacing={1}>
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                    <Skeleton variant="circular" width={40} height={40} />
                    <Skeleton variant="rectangular" width={210} height={60} />
                    <Skeleton variant="rounded" width={210} height={60} />
                </Stack>
            }
            <Box sx={{ width: '200px', direction: 'flex', justifyContent: 'flex-start' }} my={2}>
                <Link to='/viewRegistration'>
                    <CustomButton buttonName='View Registration'  variant='contained' />
                </Link>
            </Box>
        </Card>
        // </Box>
    )
}