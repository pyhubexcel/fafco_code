import { Box, Card, TextField, Typography } from "@mui/material";
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

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function ViewRegistration() {
    const [value, setValue] = useState(0);
    const [uploadState,setUploadState] = useState([{
        uploadInput:null,
        commentInput:''
    }])
    const location = useLocation()
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const uploadApi = async () => {
        try {
            const data = {
                document_note: uploadState.commentInput,
                document: uploadState.uploadInput
            };
    
            const res = await axiosInstance.post(`api/claims/upload/document/`, data, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
    
            console.log("Response:", res);
        } catch (error) {
            console.log("Error:", error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("upload...." ,uploadState)
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

    const handleFileUploadChange = (e) => {
        const file = e?.target?.files[0];
        if (!file) return;
        setUploadState((prevState) => ({
            ...prevState,
            uploadInput : file
        }));
    };
    
    const handleUploadChange = (e) => {
        const { value } = e.target;
            setUploadState((prevState) => [{
                ...prevState,
                commentInput: value
            }]);
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
                <div className="flex flex-col justify-between sm:flex-row md:flex-row" >
                    <Box sx={{ display: 'flex', gap: '5px' }}>
                        <Typography sx={{ fontSize: '1.05rem', fontWeight: '600' }}>Registration Addresss: </Typography>
                        <Typography sx={{ fontSize: '1.05rem' }}>{location.state.address}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: '5px' }} >
                        <Typography sx={{ fontSize: '1.05rem', fontWeight: '600' }}>Assigned Dealer:</Typography>
                        <Typography sx={{ fontSize: '1.05rem' }}>{location.state.current_dealer}</Typography>
                    </Box>
                </div>
                <Box sx={{ width: '50%', display: 'flex', gap: '7px', alignItems: 'center' }} my={2}>
                    <Typography sx={{ fontSize: '1.05rem', fontWeight: '600' }}>Owner Name:</Typography>
                    <TextField
                        type='text'
                        // onBlur={handleBlur}
                        // onChange={handleChange}
                        // value={values.email}
                        name='name'
                        id="outlined-size-small"
                        className="w-1/2"
                        // label='Jim & Joan Smith'
                        size="small"
                        value={location.state.Name}
                    />
                    <CustomButton buttonName="Update" variant="contained" />
                </Box>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Show Parts" {...a11yProps(0)} />
                            <Tab label="Upload Documents" {...a11yProps(1)} />
                            <Tab label="Open Claim" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <Card sx={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', marginBottom: '20px' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', bgcolor: '#1976D2', color: 'white', padding: '10px', marginBottom: '10px' }}>
                                <Typography >Pool Parts</Typography>
                            </Box>
                            <Box margin={3}>
                                <PartsTable />
                            </Box>
                        </Card>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <Card sx={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', marginBottom: '20px' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', bgcolor: '#1976D2', color: 'white', padding: '10px', marginBottom: '10px' }}>
                                <Typography>Pool - Upload POP Docs</Typography>
                            </Box>
                            <Box margin={3}>
                                <UploadDocsTable />
                                <form onSubmit={handleSubmit}>
                                    <Box width={'400px'} >
                                        <Box my={2}>
                                            <TextField type="file" size="small" value={uploadState.uploadInput} onChange={handleFileUploadChange}/>
                                        </Box>
                                        <Box display={"flex"} alignItems={'center'} gap={1}>
                                            <Typography>Comment:</Typography>
                                            <TextField size="small" fullWidth placeholder="Enter document name" value={uploadState.commentInput}  onChange={handleUploadChange} />
                                            <CustomButton buttonName="Upload" variant="contained" type='submit' />
                                        </Box>
                                    </Box>
                                </form>
                            </Box>
                        </Card>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        comming soon...
                    </CustomTabPanel>
                </Box>
                <Card sx={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>
                    <ViewRegistrationComp />
                </Card>
            </Card>
        </Box>
    )
}
