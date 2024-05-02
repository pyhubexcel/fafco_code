import { Box, Card, Stack, TextField, Typography } from "@mui/material";
import CustomButton from "../../components/ui/CustomButton";
import UploadDocsTable from "../../components/viewRegistration/UploadDocsTable";
import { useState } from "react";
import PartsTable from "../../components/viewRegistration/PartsTable";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ViewRegistrationComp from "../../components/viewRegistration/ViewRegistration";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import RevsTable from "../../components/createClaim/RevsTable";

export default function CreateClaim() {
    const [value, setValue] = useState(0);
    const [uploadState, setUploadState] = useState([{
        uploadInput: null,
        commentInput: ''
    }])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("upload....", uploadState)
        if (!uploadState.uploadInput) {
            console.log("Please select a file.");
            return;
        }

        const formData = new FormData();
        formData.append('file', uploadState.uploadInput);
        formData.append('comment', uploadState.commentInput);

        try {
            await uploadApi();
        } catch (error) {
            console.error('Error uploading:', error);
        }
    };

    // const claimApi = async ()=>{
    //     try {
    //         const res = await axiosInstance.post(`api/claims/claim/`,{
    //             headers: {
    //                 "Content-Type": "application/json"
    //             }
    //         });
    //         console.log("street res ===", res);
    //     } catch (error) {
    //         console.log("Error:", error);
    //     }
    // }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }} my={2}>
            <Card sx={{ width: '100%', margin: '15px', padding: '20px', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>
                <Box sx={{ width: '50%', display: 'flex', gap: '7px', alignItems: 'center' }} my={2}>
                    <Typography sx={{ fontSize: '1.05rem', fontWeight: '600' }}>Enter Repair Date:</Typography>
                    <TextField
                        type='Date'
                        // onBlur={handleBlur}
                        // onChange={handleChange}
                        // value={values.email}
                        name='date'
                        // id="outlined-size-small"
                        className="w-1/2"
                        // label='Jim & Joan Smith'
                        size="small"
                    // value={location.state.Name}
                    />
                    {/* <CustomButton buttonName="Update" variant="contained" /> */}
                </Box>
                <Box >
                    <Typography>Choose Part:</Typography>
                    <PartsTable />
                </Box>
                <Box display={'flex'} gap={2} my={2}>
                    <Box>
                        <Typography>Action:</Typography>
                        <TextField size="small" />
                    </Box>
                    <Box>
                        <Typography>Problem:</Typography>
                        <TextField size="small" />
                    </Box>
                    <Box>
                        <Typography>Barcode:</Typography>
                        <TextField size="small" />
                    </Box>
                </Box>
                <Typography>You can add pitures as needed for each part you are claiming here.</Typography>
                <Box display={'flex'} gap={2} my={2}>
                    <TextField size="small" placeholder="*Optional comment"/>
                    <TextField size="small" type="file" />
                    <CustomButton buttonName='Upload File' variant='contained' />
                </Box>
                <Box display={'flex'} gap={2} my={2}>
                    <Typography>Upload List:</Typography>
                </Box>
                <Box sx={{ display:'flex', justifyContent:'end' }} my={2}>
                    <CustomButton buttonName={'Add Part'} variant='contained' />
                </Box>
                <Box>
                    <Typography fontWeight={'bold'}>*If the original system had Revs, you MUST enter Revs here!</Typography>
                    <RevsTable />
                </Box>
                <Stack gap={2} my={2} width={400}>
                    <TextField size="small" placeholder="Optional - Add comment if needed" />
                    <TextField size="small" placeholder="Optional - Ref#" />
                </Stack>
                <Box width={200}>
                    <CustomButton buttonName='Submit Claim' variant='contained' />
                </Box>
            </Card>
        </Box>
    )
}
