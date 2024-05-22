import {
  Box,
  Card,
  FormControl,
  FormLabel,
  Modal,
  Stack,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import Cookies from 'js-cookie';
import PartsTable from "../viewRegistration/PartsTable";
import CustomButton from "../ui/CustomButton";
import RevsTable from "./RevsTable";
import axiosInstance from "../../utils/axios";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import CommonSelect from "../Common/CommonSelect";
const modalInputs = [
  { name: "Part Number", type: "text", key: "partNumber" },
  { name: "Part Description", type: "text", key: "partDescription" },
  { name: "Product Line", type: "text", key: "productLine" },
  { name: "Installing Dealer", type: "text", key: "installingDealer" },
  { name: "Barcode", type: "text", key: "barcode" },
  { name: "Problem", type: "text", key: "problem" },
  { name: "Action", type: "text", key: "action" },
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  boxShadow: 10,
  p: 2,
};

export default function CreateClaim() {
  const token = Cookies.get('token');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [uploadState, setUploadState] = useState({
    uploadFile: null,
    commentInput: "",
  });
  const fileInputRef=useRef(null)
  const [selectedAction, setSelectedAction] = useState("");
  const [selectedProblem, setSelectedProblem] = useState("");
  const [optionData, setOptionData] = useState([]);
  const [formValues, setFormValues] = useState({
    repairDate: "",
    barcode: "",
    uploadFile: null,
    uploadList: "",
    comment: "",
    ref: "",
  });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleDeleteClose = () => setOpenDelete(false);

  const getOptionData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`api/`);
      setOptionData(response.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOptionData();
  }, []);

  const handleSubmitFile = async () => {
    try {
      setLoading(true)
      const data = {
        document_note: uploadState.uploadFile,
        document: uploadState.uploadInput
      };


      const res = await axiosInstance.post(`api/claims/claim/`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          "Authorization": `Bearer ${token}`
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
 
  // const uploadApi = async () => {
  //   try {
  //     setLoading(true);
  //     const formData = new FormData();
  //     formData.append("repairDate", formValues.repairDate);
  //     formData.append("barcode", formValues.barcode);
  //     formData.append("uploadFile", formValues.uploadFile);
  //     formData.append("uploadList", formValues.uploadList);
  //     formData.append("comment", formValues.comment);
  //     formData.append("ref", formValues.ref);
  //     formData.append("action", selectedAction);
  //     formData.append("problem", selectedProblem);

  //     const res = await axiosInstance.post(`api/claims/claim/`, formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });

  //     if (res.status === 200) {
  //       toast.success("Document Uploaded");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleActionChange = (event) => {
    setSelectedAction(event.target.value);
  };

  const handleProblemChange = (event) => {
    setSelectedProblem(event.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // const handleFileChange = (e) => {
  //   setFormValues({ ...formValues, uploadFile: e.target.files[0] });
  // };
  const data = [
    {
      actionButtons: null,
      PanelId: 'ABC123',
      Part: '12345',
      Description: 'Sample description 1',
      Barcode: 'BAR123',
      InstallDate: '2024-04-28',
    },
    {
      actionButtons: null,
      PanelId: 'DEF456',
      Part: '67890',
      Description: 'Sample description 2',
      Barcode: 'BAR456',
      InstallDate: '2024-04-29',
    },
  ];

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Card
        sx={{
          width: "100%",
          margin: "15px",
          padding: "20px",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}
      >
        <Box
          sx={{
            width: "50%",
            display: "flex",
            gap: "7px",
            alignItems: "center",
          }}
          my={2}
        >
          <Typography sx={{ fontSize: "1.05rem", fontWeight: "600" }}>
            Enter Repair Date:
          </Typography>
          <TextField
            type="date"
            name="repairDate"
            size="small"
            value={formValues.repairDate}
            onChange={handleInputChange}
          />
        </Box>
        <Box sx={{ overflow: "auto" }}>
          <Typography>Choose Part:</Typography>
          <PartsTable
            handleOpen={handleOpen}
            handleOpenDelete={handleOpenDelete}
          />
        </Box>
        <Box display={"flex"} gap={2} my={2}>
          <Box>
            <Typography>Action:</Typography>
            <CommonSelect
              value={selectedAction}
              onChange={handleActionChange}
              options={optionData.map((option) => ({
                value: option.value,
                label: option.label,
              }))}
            />
          </Box>
          <Box>
            <Typography>Problem:</Typography>
            <CommonSelect
              value={selectedProblem}
              onChange={handleProblemChange}
              options={optionData.map((option) => ({
                value: option.value,
                label: option.label,
              }))}
            />
          </Box>
          <Box>
            <Typography>Barcode:</Typography>
            <TextField
              size="small"
              name="barcode"
              placeholder="Barcode"
              value={formValues.barcode}
              onChange={handleInputChange}
            />
          </Box>
        </Box>
        <Typography>
          You can add pictures as needed for each part you are claiming here.
        </Typography>
        <form onSubmit={handleSubmitFile}>
        <Box sx={{display:"flex",flexWrap:"wrap"}} gap={2} my={2}>
        <FormControl>
          <TextField size="small" type="text"  placeholder="*Optional Comment" 
             onChange={(e) =>
          setUploadState((prevState) => ({
            ...prevState,
            commentInput: e.target.value,
          }))
        }
          />
        </FormControl>
         <FormControl>
          <TextField size="small" ref={fileInputRef} type="file" 
          onChange={(e) =>
          setUploadState((prevState) => ({
            ...prevState,
            uploadInput: e.target.files[0],
          }))
        }
           />
         </FormControl>
         <Box sx={{alignItems:"right"}}>
         <CustomButton
            buttonName="Upload File"
            variant="contained"
            type={'submit'}
          />
         </Box>
        </Box>
          </form>
        <Box display={"flex"} >
          <Typography>Upload List:</Typography>
          <TextareaAutosize
            aria-label="minimum height"
            minRows={3}
            style={{ width: "100%",border:"1px solid gray",borderRadius:"5px" }}
            name="uploadList"
            value={formValues.uploadList}
            onChange={handleInputChange}
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "end" }} my={2}>
          <CustomButton
            buttonName={"Add Part"}
            variant="contained"
          />
        </Box>
        <Box sx={{ overflow: "auto" }}>
          <Typography fontWeight={"bold"}>*Claimed Part</Typography>
          <RevsTable data={data} />
        </Box>
        <Stack gap={2} my={2} width={400}>
          <TextField
            size="small"
            name="comment"
            placeholder="Optional - Add comment if needed"
            value={formValues.comment}
            onChange={handleInputChange}
          />
          <TextField
            size="small"
            name="ref"
            placeholder="Optional - Ref#"
            value={formValues.ref}
            onChange={handleInputChange}
          />
        </Stack>
        <Box width={200}>
          <CustomButton buttonName="Submit Claim" variant="contained" />
        </Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {modalInputs.map((item, i) => (
              <Box key={i}>
                <TextField
                  size="small"
                  fullWidth
                  label={item.name}
                  type={item.type}
                  variant="standard"
                  sx={{ marginBottom: "15px" }}
                />
              </Box>
            ))}
            <Box display={"flex"} justifyContent={"end"} gap={2}>
              <CustomButton buttonName={"Cancel"} onClick={handleClose} />
              <CustomButton buttonName={"Create"} onClick={handleClose} />
            </Box>
          </Box>
        </Modal>
        <Modal
          open={openDelete}
          onClose={handleDeleteClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography>Are you sure?</Typography>
            <Box display={"flex"} justifyContent={"end"} gap={2}>
              <CustomButton buttonName={"Sure"} onClick={handleDeleteClose} />
              <CustomButton buttonName={"Cancel"} onClick={handleDeleteClose} />
            </Box>
          </Box>
        </Modal>
      </Card>
    </Box>
  );
}
