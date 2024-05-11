import { Box, Card, Modal, TextField, Typography } from "@mui/material";
import CustomButton from "../../components/ui/CustomButton";
import UploadDocsTable from "../../components/viewRegistration/UploadDocsTable";
import { useState } from "react";
import PartsTable from "../../components/viewRegistration/PartsTable";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// import ViewRegistrationComp from "../../components/viewRegistration/ViewRegistration";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import { toast } from "react-toastify";
import CreateClaim from "../../components/createClaim/CreateClaim";
import Cookies from 'js-cookie';

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

const modalInputs = [
  {
    name: 'partNumber',
    label: 'Part Number',
    type: 'text',
  },
  {
    name: 'description',
    label: 'Part Description',
    type: 'text'
  },
  {
    name: 'product',
    label: 'Product Line',
    type: 'text'
  },
  // {
  //     name: 'dealer',
  //     label: 'Installing Dealer',
  //     type: 'text'
  // },
  {
    name: 'barcode',
    label: 'Barcode',
    type: 'text'
  },
  {
    name: 'problem',
    label: 'Problem',
    type: 'text'
  },
  // {
  //     name: 'action',
  //     label: 'Action',
  //     type: 'text'
  // },
]

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
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [uploadState, setUploadState] = useState({
    uploadInput: null,
    commentInput: ''
  });

  const location = useLocation()
  console.log(location.state, 'locationnnnnnnn')

  const [partInput, setPartInput] = useState({
    profile_id: location.state.id,
    partNumber: '',
    description: '',
    dealer: location.state.current_dealer,
    product: '',
    date_installed: new Date().toISOString().split('T')[0], // Set today's date
    barcode: '',
    problem: '',
    action: 1,
  });


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleDeleteClose = () => setOpenDelete(false);

  const uploadApi = async () => {
    try {
      setLoading(true)
      const data = {
        document_note: uploadState.commentInput,
        document: uploadState.uploadInput
      };


      const res = await axiosInstance.post(`api/claims/upload/document/`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (res.status == 200) {
        toast.success('Document Uploaded')
        setUploadState({
          uploadInput: null,
          commentInput: ''
        })
      }
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false)
    }
  }

  const createPartApi = async () => {
    const token = Cookies.get('token')
    try {
      setLoading(true)
      const data = {
        profile_id: partInput.profile_id,
        part_number: partInput.partNumber,
        part_description: partInput.description,
        product_line: partInput.product,
        installing_dealer: partInput.dealer,
        date_installed: partInput.date_installed,
        barcode: partInput.barcode,
        problem_code: partInput.problem,
        claim_action: partInput.action,
        rmaid: partInput.rmaid,
        active: partInput.active,
      };

      const res = await axiosInstance.post(`api/parts/part/`, data, {
        headers: {
          'Content-Type': "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      if (res.status == 200) {
        toast.success('Part created successful')
        setUploadState({
          uploadInput: null,
          commentInput: ''
        })
      }
    } catch (error) {
      toast.error('api failed!!!')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!uploadState.uploadInput) {
      return;
    }
    try {
      await uploadApi();
    } catch (error) {
      console.error('Error uploading:', error);
    }
  };

  const handleFileUploadChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadState((prevState) => ({
      ...prevState,
      uploadInput: file
    }));
  };

  const handleUploadChange = (e) => {
    const { value } = e.target;
    setUploadState((prevState) => ({
      ...prevState,
      commentInput: value
    }));
  };

  const handlePartChange = (e) => {
    const { name, value } = e.target;
    setPartInput(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handlePartSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPartApi();
    } catch (error) {
      console.log(error);
    }
  };


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
        <div className="flex flex-col gap-2 my-2 sm:flex-row sm:items-center">
          <Typography sx={{ fontSize: '1.05rem', fontWeight: '600' }}>Owner Name:</Typography>
          <TextField
            type='text'
            name='name'
            id="outlined-size-small"
            className="w-full sm:w-2/6"
            size="small"
            value={location.state.name}
          />
          <CustomButton buttonName="Update" variant="contained" />
        </div>
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
              <Box sx={{ overflow: 'auto' }} margin={3}>
                <PartsTable handleOpen={handleOpen} handleOpenDelete={handleOpenDelete} />
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
                      <TextField type="file" size="small" onChange={handleFileUploadChange} />
                    </Box>
                    <Box display={"flex"} alignItems={'center'} gap={1}>
                      <Typography>Comment:</Typography>
                      <TextField size="small" fullWidth placeholder="Enter document name" value={uploadState.commentInput} onChange={handleUploadChange} />
                      <CustomButton buttonName={'Upload'} type={'submit'} variant={'contained'} loading={loading} />
                    </Box>
                  </Box>
                </form>
              </Box>
            </Card>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <CreateClaim />
          </CustomTabPanel>
        </Box>
        {/* <Card sx={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>
                    <ViewRegistrationComp />
                </Card> */}
      </Card>
      <Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <form onSubmit={handlePartSubmit}>
            <Box sx={style} >
              {modalInputs.map((item, index) => (
                <TextField
                  key={index}
                  size="small"
                  fullWidth
                  label={item.label}
                  type={item.type}
                  variant="standard"
                  sx={{ marginBottom: '15px' }}
                  name={item.name}
                  value={partInput[item.name]}
                  onChange={handlePartChange}
                />
              ))}
              <Box display={"flex"} justifyContent={'end'} gap={2}>
                <CustomButton buttonName={'cancel'} onClick={handleClose} />
                <CustomButton buttonName={'Create'} type={'submit'} />
              </Box>
            </Box>
          </form>
        </Modal>
      </Box>
    </Box>
  )
}