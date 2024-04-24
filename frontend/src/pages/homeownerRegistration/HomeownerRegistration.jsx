import { Box, Card, TextField, Typography } from "@mui/material";
import CustomButton from "../../components/ui/CustomButton";
import ViewRegistration from "../../components/ViewRegistration";

export default function HomeownerRegistration() {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }} my={3}>
            <Card sx={{ width: '95%', margin: 'auto', padding: '20px', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontSize: '1.05rem' }}>Registration Addresss: 123 Some St, Sometown, PA 12345</Typography>
                    <Typography sx={{ fontSize: '1.05rem' }}>Assigned Dealer: Super Solar Inc.</Typography>
                </Box>
                <Box sx={{ width: '40%', display: 'flex', flexDirection: 'row', gap: '5px', py: '10px' }}>
                    <Typography>Owner Name:</Typography>
                    <TextField
                        type='text'
                        // onBlur={handleBlur}
                        // onChange={handleChange}
                        // value={values.email}
                        name='email'
                        id="outlined-size-small"
                        className="w-1/2"
                        label='Jim & Joan Smith'
                        size="small"
                    />
                    <CustomButton buttonName="Update" />
                </Box>
                <Box sx={{ width: '40%', display: 'flex', flexDirection: 'row', gap: '10px',marginBottom:'20px' }}>
                    <CustomButton buttonName="Show Parts" />
                    <CustomButton buttonName="Upload Documents" />
                    <CustomButton buttonName="Open Claim" />
                </Box>
                <Card sx={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>
                    <ViewRegistration />
                </Card>
            </Card>
        </Box>
    )
}
