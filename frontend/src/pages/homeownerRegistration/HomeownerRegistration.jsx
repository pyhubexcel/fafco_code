import {
  Box,
  Card,
  CircularProgress,
  FormControl,
  Modal,
  Stack,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import CustomButton from "../../components/ui/CustomButton";
import UploadDocsTable from "../../components/viewRegistration/UploadDocsTable";
import { useContext, useEffect, useRef, useState } from "react";
import PartsTableView from "../../components/viewRegistration/PartTableView";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useLocation, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import { ToastContainer, toast } from "react-toastify";
import CreateClaim from "../../components/createClaim/CreateClaim";
import Cookies from "js-cookie";
import { MyContext } from "../../context/ContextProvider";
import CommonSelect from "../../components/Common/CommonSelect";
import RevsTable from "../../components/createClaim/RevsTable";
import BackspaceIcon from "@mui/icons-material/Backspace";
import ClaimsTable from "../../components/createClaim/ClaimsTable";
import { jwtDecode } from "jwt-decode";
import { Details } from "@mui/icons-material";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';


const optionData = [
  { id: 1, value: "FREEZE DAMAGE" },
  { id: 2, value: "DIMPLE LEAK REV ONLY" },
  { id: 3, value: "HEADER LEAK" },
  { id: 4, value: "PANEL LEAK" },
  { id: 5, value: "PANEL SPLIT" },
  { id: 6, value: "PANEL TOO LONG" },
  { id: 7, value: "PANEL TOO SHORT" },
  { id: 8, value: "VRV FAIL" },
];
const optionDataAction = [
  { id: 1, value: "Repair" },
  { id: 2, value: "Replace" },
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 10,
  p: 4,
  borderRadius: "10px",
  margin: "auto",
};
const styles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 10,
  p: 4,
  borderRadius: "10px",
  margin: "auto",
};

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
        <Box padding={{ xs: 1, sm: 3 }}>
          <ToastContainer />
          <Box>{children}</Box>
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
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ViewRegistration() {
  const { id } = useParams();
  const { partsData,deletePart,setDeletePart } = useContext(MyContext);
  const token = Cookies.get("token");
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const location = useLocation();
  const [docDetails, setDocDetails] = useState([]);
  const [uploadFileList, setUploadFileList] = useState([]);
  const [selectedPart, setSelectedPart] = useState(null);
  const [allFormData, setAllFormData] = useState("");
  const [uploadState, setUploadState] = useState({
    uploadInput: null,
  });
  const [uploadDocState, setUploadDocState] = useState({ uploadInput: null });
  const [uploadClaimImageList, setUploadClaimImageList] = useState([]);
  const [uploadDocEditState, setUploadDocEditState] = useState({
    uploadInput: null,
  });
  const [editDocDetails, setEditDocDetails] = useState(null);
  const [formValues, setFormValues] = useState({
    repairDate: "",
    action_id: "",
    problem_id: "",
    barcode: "",
    uploadFile: null,
    uploadList: "",
    comment: "",
  });
  const [claimedPartData, setClaimedPartData] = useState([]);
  const [claimsData, setClaimsData] = useState([]);
  const [updateName, setUpdateName] = useState(location.state.name);
  const [openEditDoc, setOpenEditDoc] = useState(false);
  const [openViewDoc, setOpenViewDoc] = useState(false);
  const [openClaimDoc, setOpenClaimDoc] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [addPartLoading, setAddPartLoading] = useState(false);
  const [showSubmit, setShowSubmit] = useState(true);
  const [imageData, setImageData] = useState(null);
  const [claimImageData, setClaimImageData] = useState([]);
  const [imageLoading, setImageLoading] = useState(false);
 

  useEffect(() => {
    if (uploadState.uploadInput !== null) {
      if (uploadFileList.includes(uploadState.uploadInput.name)) {
        return;
      } else {
        setUploadFileList([...uploadFileList, uploadState.uploadInput.name]);
      }
      fileInputRef.current.value = "";
    }
  }, [uploadState]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    if (uploadState.uploadInput !== null) {
      const file = uploadState.uploadInput;
      
      if (file && file.type?.startsWith('image/')) {
        if (!uploadClaimImageList.some(img => img.name === file.name)) {
          setUploadClaimImageList((prevList) => [...prevList, file]);
        }
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, [uploadState]);
  const handleInputChange = (event, name) => {
    const { value, type } = event.target;
    if (type === "file") {
      setFormValues({
        ...formValues,
        [name]: event.target.files[0],
      });
    } else {
      setFormValues({
        ...formValues,
        [name]: value,
      });
    }
  };

  function convertDateFormat(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
  }

  useEffect(() => {
    getDocumentData();
    getClaimedPart();
  }, [deletePart]);

  const getDocumentData = async () => {
    setTableLoading(true);
    try {
      const response = await axiosInstance.get(`api/claims/documents/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(response, "===");
      if (response.status == 200) {
        const data1 = await response.data.map((detail, i) => {
          const data = {
            documentid: detail.id,
            actionButtons: "",
            regid: detail.regid,
            uploaded: convertDateFormat(detail.uploaded_at),
            documentnote: detail.document_note,
            document: detail.document,
          };
          return data;
        });
        setDocDetails(data1);
        setTableLoading(false);
      }
    } catch (error) {
      throw new Error("Failed to submit claim. Please try again later.");
    }
  };

  const uploadApi = async () => {
    try {
      setLoading(true);
      const data = {
        document_note: uploadDocState.commentInput,
        document: uploadDocState.uploadInput,
        profile_id: id,
      };

      const res = await axiosInstance.post(
        `api/claims/upload/document/`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status == 201) {
        toast.success(res.data.message, { autoClose: 2000 });
        getDocumentData();
        // console.log(res, "------");
        setUploadDocState({
          uploadInput: null,
          commentInput: "",
        });
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) {
          fileInput.value = null;
        }
      }
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitFile = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = {
        document_note: uploadState.uploadFile,
        document: uploadState.uploadInput,
      };

      const res = await axiosInstance.post(`api/claims/claim/`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status == 200) {
        toast.success("Document Uploaded", { autoClose: 2000 });
        setUploadState({
          uploadInput: null,
          commentInput: "",
        });
      }
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!uploadDocState.uploadInput) {
      return;
    }
    try {
      await uploadApi();
    } catch (error) {
      console.error("Error uploading:", error);
    }
  };

  const handleFileUploadChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadDocState((prevState) => ({
      ...prevState,
      uploadInput: file,
    }));
  };

  const handleUploadChange = (e) => {
    const { value } = e.target;
    setUploadDocState((prevState) => ({
      ...prevState,
      commentInput: value,
    }));
  };

  const handleUploadEditChange = (e) => {
    const { value } = e.target;
    setUploadDocEditState((prevState) => ({
      ...prevState,
      commentInput: value,
    }));
  };

  const handleFileUploadEditChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadDocEditState((prevState) => ({
      ...prevState,
      uploadInput: e.target.files[0],
    }));
  };
  const handleFileUploadChangeShowParts = (e) => {
    setUploadState((prevState) => ({
      ...prevState,
      uploadInput: e.target.files[0],
    }));
    e.target.value = null;
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.value = null;
    }
    // setUploadFileList([...uploadFileList, uploadState.uploadInput.name]);
  };


  const submitClaim = async () => {
    const partData = {
      //action: formValues.action_id,
    };
    try {
      const response = await axiosInstance.post(
        `api/claims/submit-claim/${id}/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response.data.claims, "===+++++");
      if (response.status == 200) {
        toast.success(response.data.message, { autoClose: 2000 });
        getClaimedPart();
        setClaimedPartData([]);
        setShowSubmit(true);
      }
    } catch (error) {
      throw new Error("Failed to submit claim. Please try again later.");
    }
  };

  const getClaimedPart = async () => {
    setTableLoading(true);
    try {
      const response = await axiosInstance.get(
        `api/claims/retrieve-claims/${id}/`
      );
      if (response.status == 200) {
        const data1 = await response.data.claims.map((detail, i) => {
          const data = {
            action: optionDataAction[detail?.action - 1]?.value,
            problem: optionData[detail?.problem - 1]?.value,
            part_id: detail?.part_id,
            regid: detail?.regid,
            ramid: detail?.ramid,
            status: detail?.status,
            add_comment: detail?.add_comment,
            repair_date:detail?.repair_date,
            // documents:detail?.documents?.[0]
            documents: detail?.documents || [],
            part_description:detail?.part_description
          };
          return data;
        });
        // console.log(data1, "====working fine------")
        setClaimsData(data1);
      }
    } catch (error) {
      setClaimsData('');
      throw new Error("Failed to submit claim. Please try again later.");
    }
    setTableLoading(false);
    setDeletePart(false)
  };

  const errorField = () => {
    if (formValues.action_id === "" && formValues.problem_id === "" && formValues.repairDate === "") {
      toast.error("Action, Problem, and Repair Date fields are required", {
        autoClose: 2000,
      });
    } else if (formValues.action_id === "" && formValues.problem_id === "") {
      toast.error("Action and Problem Fields are required", { autoClose: 2000 });
    } else if (formValues.action_id === "") {
      toast.error("Action Field is required", { autoClose: 2000 });
    } else if (formValues.problem_id === "") {
      toast.error("Problem Field is required", { autoClose: 2000 });
    } else if (formValues.repairDate === "") {
      toast.error("Repair Date Field is required", { autoClose: 2000 });
    }
  };
  

  const handleAddPart = () => {
    if (formValues.action_id !== "" && formValues.problem_id !== "" && formValues.repairDate !=="") {
      const partData=new FormData();
      partData.append('part_id',selectedPart.id);
      partData.append('repair_date',formValues.repairDate);
      partData.append('claim_action',formValues.action_id);
      partData.append('part_problem',formValues.problem_id);
      for(let i=0;i<uploadClaimImageList.length;i++){
        partData.append('documents',uploadClaimImageList[i]);
      }
      partData.append('add_comment',formValues.comment,);
      partData.append('profile',id);
      const element = document.getElementsByClassName(
        "css-cdprif-MuiButtonBase-root-MuiButton-root"
      );
      if (element.length > 0) {
        const elements = element[0];
        elements.click();
      }
      setAllFormData(partData);
      AddPartApi(partData);
      setSelectedPart(null);
      setUploadFileList([]);
      setUploadState({
        uploadInput: null,
      });
      setFormValues({
        repairDate: "",
        action_id: "",
        problem_id: "",
        barcode: "",
        uploadFile: null,
        uploadList: "",
        comment: "",
      });
    } else {
      errorField();
    }
  };

  const AddPartApi = async (data) => {
    // console.log(data, "comming I  correct--------------------")
    try {
      setAddPartLoading(true);
      const res = await axiosInstance.post(`api/claims/add-part/`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        
      });
      if (res.status == 201) {
        setShowSubmit(false);
        toast.success("Part Uploaded", { autoClose: 2000 });
        const data = {
          Action: optionDataAction[res.data.claim_action - 1].value,
          Problem: optionData[res.data.part_problem - 1].value,
          PartId: res.data.part_id,
          Part: res.data.part_number,
          regid: res.data.regid,
          ramid: res.data.ramid_id,
          status: res.data.status,
          repair_date:res.data.repair_date
          // Barcode: formValues.barcode,
        };
        setClaimedPartData([...claimedPartData, data]);
        setSelectedPart(null);
      }
    } catch (error) {
      toast.error(error.response.data.error, { autoClose: 2000 });
      console.log("Error:", error);
    } finally {
      setAddPartLoading(false);
    }
  };

  const handleOnChangeName = (e) => {
    setUpdateName(e.target.value);
  };

  const handleUpdateName = async () => {
    try {
      const cust = jwtDecode(token).user_id;
      setLoading(true);
      const data = {
        customer: cust,
        name: updateName,
      };
      const res = await axiosInstance.patch(
        `api/auth/profile_detail/${id}/`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status == 200) {
        toast.success(res.data.message, { autoClose: 2000 });
      }
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    if (selectedPart) {
      setFormValues((prev) => ({ ...prev, barcode: selectedPart.barcode }));
    } else if (selectedPart == null) {
      setFormValues((prev) => ({ ...prev, barcode: "" }));
    }
  }, [selectedPart]);

  const handleDelete = (name) => {
    const updatedFileList = uploadFileList.filter((e) => e !== name);
    setUploadFileList(updatedFileList);
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.value = null;
    }
  };

  const handleEditParts = (data) => {
    setUploadDocEditState({
      commentInput: data.documentnote,
      uploadInput: data.document,
    });
    setEditDocDetails({
      documentid: data.documentid,
      documentnote: data.documentnote,
      regid: data.regid,
      uploaded: data.uploaded,
      document: data.document,
    });
    setOpenEditDoc(true);
  };

  const handleUpdateDocPool = async () => {
    // console.log(uploadDocEditState, "values");
    const data = {
      document_note: uploadDocEditState.commentInput,
      document: uploadDocEditState.uploadInput,
      profile_id: id,
    };
    try {
      const response = await axiosInstance.put(
        `api/claims/update/${id}/documents/${editDocDetails.documentid}/`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response.data, "===+++++");
      if (response.status == 200) {
        toast.success("Document Updated Successfully", { autoClose: 2000 });
        getDocumentData();
      } else {
        toast.error(response.data.message, { autoClose: 2000 });
      }
    } catch (error) {
      toast.error(error.response.data.document_note[0], { autoClose: 2000 });
      throw new Error("Failed to submit claim. Please try again later.");
    }
    setOpenEditDoc(false);
  };

  const handleClose = () => {
    setOpenEditDoc(false);
    setEditDocDetails(null);
  };

  const fetchImage = async (data) => {
    setImageLoading(true);
    try {
      const response = await axiosInstance.get(data, {
        responseType: "blob",
      });

      if (data.includes(".pdf")) {
        const url = URL.createObjectURL(response.data);
        window.open(url);
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(response.data);

        reader.onloadend = () => {
          setImageData(reader.result);
        };
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    }
    setImageLoading(false);
  };

  const fetchImages = async (urls) => {
    setImageLoading(true);
    try {
      const imagePromises = urls.map(async (url) => {
        const response = await axiosInstance.get(url, { responseType: "blob" });

        if (url.endsWith(".pdf")) {
          // Handle PDFs
          const pdfUrl = URL.createObjectURL(response.data);
          window.open(pdfUrl);
          return null;
        } else {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(response.data);
          });
        }
      });

      const imageDataArray = await Promise.all(imagePromises);
      setClaimImageData(imageDataArray.filter(data => data !== null)); // Filter out null values for PDFs
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setImageLoading(false);
    }
  };

  const handleViewParts = (data) => {
    fetchImage(data.document);
    if (data.document.includes(".pdf")) {
      setOpenViewDoc(false);
    } else {
      setOpenViewDoc(true);
    }
  };

  const handleClaimViewParts = (data) => {
    fetchImages(data.documents);
    if (data.documents.includes(".pdf")) {
      setOpenClaimDoc(false);
    } else {
      setOpenClaimDoc(true);
    }
  };

  const handleViewClose = () => {
    setOpenViewDoc(false);
    setEditDocDetails(null);
    setImageData(null);
    setClaimImageData(null)
  };

  const handleClaimClose=()=>{
    setOpenClaimDoc(false);
    setImageData(null)
    setClaimImageData(null)
  }


  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", width: "100%" }}
      my={2}
    >
      <Card
        sx={{
          width: "100%",
          margin: "15px",
          padding: "20px",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}
      >
        <div className="flex flex-col justify-between sm:flex-row md:flex-row">
          <Box sx={{ display: "flex", gap: "5px" }}>
            <Typography sx={{ fontSize: "1.05rem", fontWeight: "600" }}>
              Registration Addresss:{" "}
            </Typography>
            <Typography sx={{ fontSize: "1.05rem" }}>
              {location.state.address}
            </Typography>
          </Box>
        
        </div>
        <div className="flex flex-col gap-2 my-2 sm:flex-row sm:items-center">
          {/* <ToastContainer /> */}
          <Typography sx={{ fontSize: "1.05rem", fontWeight: "600" }}>
            Owner Name:
          </Typography>
          <TextField
            type="text"
            name="name"
            id="outlined-size-small"
            className="w-full sm:w-2/6"
            size="small"
            value={updateName}
            onChange={handleOnChangeName}
          />
          <CustomButton
            buttonName="Update"
            variant="contained"
            onClick={handleUpdateName}
          />
        </div>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Registered Parts" {...a11yProps(0)} />
              <Tab label="Upload Documents" {...a11yProps(1)} />
              <Tab label="Open Claim" {...a11yProps(2)} />
              <Tab label="View Claims" {...a11yProps(3)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
          <CreateClaim />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <Card
              sx={{
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                marginBottom: "20px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  bgcolor: "#1976D2",
                  color: "white",
                  padding: "10px",
                  marginBottom: "10px",
                }}
              >
                <Typography>Pool - Upload POP Docs</Typography>
              </Box>
              <Box margin={3}>
                <Box sx={{ overflow: "auto" }}>
                  {tableLoading ? (
                    <Box textAlign={"center"}>
                      <CircularProgress size={"1rem"} />
                    </Box>
                  ) : (
                    <UploadDocsTable
                      data={docDetails}
                      handleEditParts={handleEditParts}
                      handleViewParts={handleViewParts}
                    />
                  )}
                </Box>
                <form onSubmit={handleSubmit}>
                  <Box width={"400px"}>
                    <Box my={2}>
                      <TextField
                        type="file"
                        ref={fileInputRef}
                        size="small"
                        onChange={handleFileUploadChange}
                      />
                    </Box>
                    <Box display={"flex"} alignItems={"center"} gap={1}>
                      <Typography>Comment:</Typography>
                      <TextField
                        size="small"
                        fullWidth
                        placeholder="Enter document name"
                        value={uploadDocState.commentInput}
                        onChange={handleUploadChange}
                      />
                      <CustomButton
                        buttonName={"Upload"}
                        type={"submit"}
                        variant={"contained"}
                        loading={loading}
                      />
                    </Box>
                  </Box>
                </form>
              </Box>
              <Modal
                open={openEditDoc}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <form onSubmit={handleSubmit}>
                    <Box my={2}>
                      <Box gap={1} my={2}>
                        <Typography
                          variant="body1"
                          sx={{
                            fontSize: "15px",
                            fontWeight: "600",
                            color: "gray",
                          }}
                        >
                          Upload Doc:
                        </Typography>
                        <TextField
                          type="file"
                          ref={fileInputRef}
                          size="small"
                          onChange={handleFileUploadEditChange}
                        />
                      </Box>
                      <Box gap={1}>
                        <Typography
                          variant="body1"
                          sx={{
                            fontSize: "15px",
                            fontWeight: "600",
                            color: "gray",
                          }}
                        >
                          Comment:
                        </Typography>
                        <TextField
                          style={{ width: "100%" }}
                          size="small"
                          placeholder="Enter document name"
                          value={uploadDocEditState.commentInput}
                          onChange={handleUploadEditChange}
                        />
                      </Box>
                    </Box>
                  </form>
                  <Box display={"flex"} justifyContent={"end"} gap={2}>
                    <CustomButton buttonName={"Cancel"} onClick={handleClose} />
                    <CustomButton
                      buttonName={"update"}
                      onClick={handleUpdateDocPool}
                    />
                  </Box>
                </Box>
              </Modal>
              <Modal
                open={openViewDoc}
                onClose={handleViewClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={styles}>
                  <Box my={2}>
                    <Box my={2}>
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: "15px",
                          fontWeight: "600",
                          color: "gray",
                        }}
                      >
                        Preview the Doc:
                      </Typography>
                      <Box>
                        {imageLoading ? (
                          <Box textAlign={"center"}>
                            <CircularProgress size={"1rem"} />
                          </Box>
                        ) : (
                          <img src={imageData} alt="doc" width={"100%"} />
                        )}
                      </Box>
                    </Box>
                  </Box>
                  <Box display={"flex"} justifyContent={"center"} gap={2}>
                    <CustomButton
                      buttonName={"Close"}
                      onClick={handleViewClose}
                    />
                  </Box>
                </Box>
              </Modal>
            </Card>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>        
            <Card
              sx={{
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                marginBottom: "20px",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  bgcolor: "#1976D2",
                  color: "white",
                  padding: "10px",
                  marginBottom: "10px",
                }}
              >
                <Typography>Pool Parts</Typography>
              </Box>
              <Box sx={{ overflow: "auto" }} margin={3}>
                <Stack
                  my={2}
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 1, sm: 2, md: 4 }}
                  alignItems={{ sm: "center" }}
                  width={{ xs: "100%", sm: "50%" }}
                >


                  <Typography pb={"3px"} fontWeight={"bold"} color={"gray"}>
                  <span style={{ color: "red" }}>*</span>  Enter Repair Date:
                  </Typography>
                  <TextField
                    type="date"
                    name="repairDate"
                    size="small"
                    value={formValues.repairDate}
                    onChange={(e) => handleInputChange(e, "repairDate")}
                  />

                </Stack>
                <Typography pb={"3px"} fontWeight={"bold"} color={"gray"}>
                  Choose Part:
                </Typography>
                <PartsTableView
                  data={partsData}
                  setSelectedPart={setSelectedPart}
                />
                {partsData.length > 0 && (
                  <>
                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      spacing={{ xs: 1, sm: 2, md: 4 }}
                      my={4}
                    >
                      <Box>
                        <Typography
                          pb={"3px"}
                          fontWeight={"bold"}
                          color={"gray"}
                        >
                          <span style={{ color: "red" }}>*</span>Action:
                        </Typography>
                        <CommonSelect
                          name={"action_id"}
                          value={formValues.action_id}
                          disabled={selectedPart == null}
                          placeholder={"Select Action"}
                          onChange={(e) => handleInputChange(e, "action_id")}
                          options={optionDataAction.map((option) => ({
                            value: option.id,
                            label: option.value,
                          }))}
                        />
                      </Box>
                      <Box>
                        <Typography
                          pb={"3px"}
                          fontWeight={"bold"}
                          color={"gray"}
                        >
                          <span style={{ color: "red" }}>*</span>Problem:
                        </Typography>
                        <CommonSelect
                          name={"problem_id"}
                          value={formValues.problem_id}
                          disabled={selectedPart == null}
                          placeholder={"Select Problem"}
                          onChange={(e) => handleInputChange(e, "problem_id")}
                          options={optionData.map((option) => ({
                            value: option.id,
                            label: option.value,
                          }))}
                        />
                      </Box>
                      <Box>
                        <Typography
                          pb={"3px"}
                          fontWeight={"bold"}
                          color={"gray"}
                        >
                          Barcode:
                        </Typography>
                        <TextField
                          size="small"
                          name="barcode"
                          readOnly
                          placeholder="Barcode"
                          value={formValues.barcode}
                        />
                      </Box>
                      <Box>
                        <Typography
                          pb={"3px"}
                          fontWeight={"bold"}
                          color={"gray"}
                        >
                          You can add pictures as needed for each part you are
                          claiming here:
                        </Typography>
                        <form onSubmit={handleSubmitFile}>
                          <Box
                            sx={{ display: "flex", flexWrap: "wrap" }}
                            gap={2}
                          >
                            <FormControl>
                              <TextField
                                size="small"
                                ref={fileInputRef}
                                type="file"
                                onChange={handleFileUploadChangeShowParts}
                              />
                            </FormControl>
                          </Box>
                        </form>
                      </Box>
                    </Stack>
                    <Stack
                      width={"100%"}
                      direction={{ xs: "column", sm: "row" }}
                      spacing={{ xs: 1, sm: 2, md: 4 }}
                    >
                      <Box width={"100%"}>
                        <Typography
                          pb={"3px"}
                          fontWeight={"bold"}
                          color={"gray"}
                        >
                          Add Comment:
                        </Typography>
                        <TextareaAutosize
                          aria-label="minimum height"
                          minRows={3}
                          style={{
                            width: "100%",
                            border: "1px solid gray",
                            borderRadius: "5px",
                            padding: "4px",
                          }}
                          placeholder="Add comment ..."
                          name="comment"
                          value={formValues.comment}
                          onChange={(e) => handleInputChange(e, "comment")}
                        />
                      </Box>

                      <Box width={"100%"}>
                        <Typography
                          pb={"3px"}
                          fontWeight={"bold"}
                          color={"gray"}
                        >
                          Uploaded File List:
                        </Typography>
                        <Box
                          style={{
                            width: "100%",
                            border: "1px solid gray",
                            borderRadius: "5px",
                            padding: "4px",
                            height: "80px",
                            overflowY: "auto",
                            overflowX: "hidden",
                            display: "flex",
                            flexWrap: "wrap",
                          }}
                        >
                          {uploadFileList?.map((ele, index) => (
                            <Box
                              key={index}
                              display={"flex"}
                              gap={1}
                              m={1}
                              alignItems={"center"}
                            >
                              <Box>
                                <Typography
                                  fontSize={"12px"}
                                  fontWeight={"bold"}
                                  border={"1px solid gray"}
                                  borderRadius={"5px"}
                                  my={1}
                                  width={"max-content"}
                                  py={"1px"}
                                  px={1}
                                >
                                  {ele}
                                </Typography>
                              </Box>
                              <BackspaceIcon
                                fontSize="small"
                                sx={{ "&:hover": { cursor: "pointer" } }}
                                onClick={() => handleDelete(ele)}
                              />
                            </Box>
                          ))}
                        </Box>

                        <Box
                          sx={{ display: "flex", justifyContent: "end" }}
                          my={2}
                        >
                          <CustomButton
                            buttonName={"Add Part"}
                            variant="contained"
                            disable={selectedPart === null}
                            onClick={handleAddPart}
                          />
                        </Box>
                      </Box>
                    </Stack>
                  </>
                )}
                <Box sx={{ overflow: "auto" }} mb={4}>
                  <Typography pb={"3px"} fontWeight={"bold"} color={"#4a4d4a"}>
                    *Claimed Part
                  </Typography>
                  {addPartLoading ? (
                    <Box textAlign={"center"}>
                      <CircularProgress size={"1rem"} />
                    </Box>
                  ) : (
                    <RevsTable data={claimedPartData} />
                  )}
                </Box>

                <Box width={"100%"}>
                <Box sx={{ display: "flex", justifyContent: "end" }} my={2}>
                    <CustomButton
                      buttonName="Submit Claim"
                      variant="contained"
                      disable={showSubmit}
                      onClick={submitClaim}
                    />
                  </Box>
                </Box>
              
              </Box>
            </Card>
          
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <Box sx={{ overflow: "auto" }} mb={4}>
              <Typography pb={"3px"} fontWeight={"bold"} color={"#4a4d4a"}>
                *Claims Master
              </Typography>
              {tableLoading ? (
                <Box textAlign={"center"}>
                  <CircularProgress size={"1rem"} />
                </Box>
              ) : (
                <ClaimsTable data={claimsData} handleClaimViewParts={handleClaimViewParts}/>
              )}
            </Box>
            <Modal
  open={openClaimDoc}
  onClose={handleClaimClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={styles}>
    <Box my={2}>
      <Typography
        variant="body1"
        sx={{
          fontSize: "15px",
          fontWeight: "600",
          color: "gray",
          padding:"10px"
        }}
      >
        Preview the Docs:
      </Typography>
      <Box>
        {imageLoading ? (
          <Box textAlign={"center"}>
            <CircularProgress size={"1rem"} />
          </Box>
        ) : (
          claimImageData && claimImageData.length > 0 ? (
            <Carousel
              showThumbs={false}
              showStatus={false}
              infiniteLoop
              autoPlay
              interval={3000}
              stopOnHover
              renderArrowPrev={(onClickHandler, hasPrev, label) =>
                hasPrev && (
                  <button
                    type="button"
                    onClick={onClickHandler}
                    title={label}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '10px',
                      transform: 'translateY(-50%)',
                      zIndex: 2,
                      background: 'rgba(0, 0, 0, 0.5)',
                      borderRadius: '50%',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <ArrowBackIos fontSize="medium" style={{ color: 'white',paddingLeft:'5px' }} />
                  </button>
                )
              }
              renderArrowNext={(onClickHandler, hasNext, label) =>
                hasNext && (
                  <button
                    type="button"
                    onClick={onClickHandler}
                    title={label}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      right: '10px',
                      transform: 'translateY(-50%)',
                      zIndex: 2,
                      background: 'rgba(0, 0, 0, 0.5)',
                      borderRadius: '50%',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <ArrowForwardIos fontSize="medium" style={{ color: 'white' ,paddingLeft:'5px'}} />
                  </button>
                )
              }
            >
              {claimImageData.map((image, index) => (
                <div key={index} style={{ position: 'relative' }}>
                  <img
                    src={image}
                    alt={`doc-${index}`}
                    style={{
                      width: '700px',
                      height: '500px',
                      maxWidth: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </div>
              ))}
            </Carousel>
          ) : (
            <Typography variant="body2" color="textSecondary">
              No images uploaded yet.
            </Typography>
          )
        )}
      </Box>
    </Box>
    <Box display={"flex"} justifyContent={"center"} gap={2}>
      <CustomButton
        buttonName={"Close"}
        onClick={handleClaimClose}
      />
    </Box>
  </Box>
</Modal>
          </CustomTabPanel>
        </Box>
      </Card>
    </Box>
  );
}
