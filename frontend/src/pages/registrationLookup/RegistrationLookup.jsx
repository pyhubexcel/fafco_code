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
    const [rowUserData, setRowUserData] = useState(null)
    // const hoo=(d)=>log
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

    const getRowData = (userData) => {
        console.log(userData, 'testing userData')
        setRowUserData(userData)
    }

    useEffect(() => {
        lookupApi();
    }, [])
    return (
        <Card sx={{ width: '95%', margin: 'auto', padding: '20px', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>
            <Typography sx={{ fontSize: '1.35rem', fontWeight: '700' }}>Registration Lookup</Typography>
            {userList?.length > 0 ?
                <RegisteredUsers getRowData={getRowData} userList={userList} />
                :
                <Stack spacing={1}>
                    <Skeleton variant="rectangular" width={210} height={50} />
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} height={40} />
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} height={40} />
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} height={40} />
                    <Skeleton variant="rounded" width={210} height={50} />
                </Stack>
            }


            {/* <RegisteredUsers getRowData={getRowData} userList={userList} /> */}


            <Box sx={{ width: '200px', direction: 'flex', justifyContent: 'flex-start' }} my={2}>
                <Link to={rowUserData ? '/viewRegistration': ''} state={rowUserData}>
                    <CustomButton buttonName='View Registration' variant='contained' disable={!rowUserData } />
                </Link>
            </Box>
        </Card>
    )
}