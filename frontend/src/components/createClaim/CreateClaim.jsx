import { Box, Card, Modal, Stack, TextField, TextareaAutosize, Typography } from "@mui/material";
import PartsTable from "../viewRegistration/PartsTable";
import CustomButton from "../ui/CustomButton";
import RevsTable from "./RevsTable";
import axiosInstance from "../../utils/axios";
import { toast } from "react-toastify";
import { useState } from "react";

const modalInputs = [
    {
        name: 'Part Number:',
        type: 'text'
    },
    {
        name: 'Part Description:',
        type: 'text'
    },
    {
        name: 'Product Line:',
        type: 'text'
    },
    {
        name: 'Installing Dealer:',
        type: 'text'
    },
    {
        name: 'Barcode:',
        type: 'text'
    },
    {
        name: 'Problem:',
        type: 'text'
    },
    {
        name: 'Action:',
        type: 'text'
    },
]

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 10,
    p: 2,
};

export default function CreateClaim() {
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [uploadState, setUploadState] = useState({
        uploadInput: null,
        commentInput: ''
    });


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleOpenDelete = () => setOpenDelete(true);
    const handleDeleteClose = () => setOpenDelete(false);

    const uploadApi = async () => {
        try {
            setLoading(true)

            // const data = {
            //     document_note: uploadState.commentInput,
            //     document: uploadState.uploadInput
            // };

            // console.log(data, 'dataaaaaa')

            const res = await axiosInstance.post(`api/claims/claim/`, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log("Response:", res);
            if (res.status == 200) {
                toast.success('Document Uploaded')
            }
        } catch (error) {
            console.log("Error:", error);
        } finally {
            setLoading(false)
        }
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
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
                </Box>
                <Box >
                    <Typography>Choose Part:</Typography>
                    <PartsTable handleOpen={handleOpen} handleOpenDelete={handleOpenDelete} />
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
                    {/* <TextField size="small" placeholder="*Optional comment" /> */}
                    <TextField size="small" type="file" />
                    <CustomButton buttonName='Upload File' variant='contained' />
                </Box>
                <Box display={'flex'} gap={2} my={2}>
                    <Typography>Upload List:</Typography>
                    <TextareaAutosize></TextareaAutosize>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'end' }} my={2}>
                    <CustomButton buttonName={'Add Part'} variant='contained' />
                </Box>
                <Box>
                    <Typography fontWeight={'bold'}>*Claimed Part</Typography>
                    <RevsTable />
                </Box>
                <Stack gap={2} my={2} width={400}>
                    <TextField size="small" placeholder="Optional - Add comment if needed" />
                    <TextField size="small" placeholder="Optional - Ref#" />
                </Stack>
                <Box width={200}>
                    <CustomButton buttonName='Submit Claim' variant='contained' />
                </Box>
                <Box>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style} >
                            {modalInputs.map((item, i) => (
                                <Box key={i} >
                                    <TextField 
                                    size="small" 
                                    fullWidth 
                                    label={item.name}
                                    type={item.type}
                                    variant="standard"
                                    sx={{marginBottom:'15px'}}
                                    />
                                </Box>
                            ))}
                            <Box display={"flex"} justifyContent={'end'} gap={2}>
                                <CustomButton buttonName={'cancel'} onClick={handleClose}/>
                                <CustomButton buttonName={'Create'} onClick={handleClose}/>
                            </Box>
                        </Box>
                    </Modal>
                </Box>
                <Box>
                    <Modal
                        open={openDelete}
                        onClose={handleDeleteClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style} >
                           <Typography>Are you sure?</Typography>
                            <Box display={"flex"} justifyContent={'end'} gap={2}>
                                <CustomButton buttonName={'Sure'} onClick={handleDeleteClose}/>
                                <CustomButton buttonName={'Cancel'} onClick={handleDeleteClose}/>
                            </Box>
                        </Box>
                    </Modal>
                </Box>
            </Card>
        </Box>
    )
}
