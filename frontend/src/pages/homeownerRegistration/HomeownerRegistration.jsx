import {
  Box,
  Card,
  FormControl,
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
import { useLocation } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import { toast } from "react-toastify";
import CreateClaim from "../../components/createClaim/CreateClaim";
import Cookies from "js-cookie";
import { MyContext } from "../../context/ContextProvider";
import CommonSelect from "../../components/Common/CommonSelect";
import RevsTable from "../../components/createClaim/RevsTable";



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
  const { partsData } = useContext(MyContext);
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
  const [formValues, setFormValues] = useState({
    repairDate: "",
    action_id: "",
    problem_id: "",
    barcode: "",
    uploadFile: null,
    uploadList: "",
    comment: "",
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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


  const uploadApi = async () => {
    try {
      setLoading(true);
      const data = {
        document_note: uploadState.commentInput,
        document: uploadState.uploadInput,
      };
      const res = await axiosInstance.post(
        `api/claims/upload/document/`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.status == 200) {
        toast.success("Document Uploaded");
        // getDocumentData();
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
        toast.success("Document Uploaded");
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
    if (!uploadState.uploadInput) {
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
    setUploadState((prevState) => ({
      ...prevState,
      uploadInput: file,
    }));
  };

  const handleUploadChange = (e) => {
    const { value } = e.target;
    setUploadState((prevState) => ({
      ...prevState,
      commentInput: value,
    }));
  };


  const handleFileUploadChangeShowParts = (e) => {
    setUploadState((prevState) => ({
      ...prevState,
      uploadInput: e.target.files[0],
    }));
    // setUploadFileList([...uploadFileList, uploadState.uploadInput.name]);
  };


  const submitClaim = async () => {

    const partData = {
      action: formValues.action_id,
      problem: formValues.problem_id,
      comment: formValues.comment,
    };
    try {
      const response = await axiosInstance.post("api/claims/claim/", partData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      if (response) {
        getClaimedPart()
        setFormValues({
          repairDate: "",
          action_id: "",
          problem_id: "",
          barcode: "",
          uploadFile: null,
          uploadList: "",
          comment: "",
        });
      }

    } catch (error) {
      throw new Error("Failed to submit claim. Please try again later.")
    }

  }

  const getClaimedPart = () => {

  }

  const handleAddPart = () => {
    const partData = {
      part_number: selectedPart.part_number,
      repairDate: formValues.repairDate,
      barcode: formValues.barcode,
      action: formValues.action_id,
      problem: formValues.problem_id,
      uploadFileList: uploadFileList,
      comment: formValues.comment,
    };
    setAllFormData(partData);
    setSelectedPart("");
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
  };
  const data = [
    {
      actionButtons: null,
      PanelId: "ABC123",
      Part: "12345",
      Description: "Sample description 1",
      Barcode: "BAR123",
      InstallDate: "2024-04-28",
    },
    {
      actionButtons: null,
      PanelId: "DEF456",
      Part: "67890",
      Description: "Sample description 2",
      Barcode: "BAR456",
      InstallDate: "2024-04-29",
    },
  ];

  useEffect(() => {
    if (selectedPart) {
      setFormValues((prev) => ({ ...prev, barcode: selectedPart.barcode }))
    } else if (selectedPart == null) {
      setFormValues((prev) => ({ ...prev, barcode: "" }))
    }
  }, [selectedPart])

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
          <Box sx={{ display: "flex", gap: "5px" }}>
            <Typography sx={{ fontSize: "1.05rem", fontWeight: "600" }}>
              Assigned Dealer:
            </Typography>
            <Typography sx={{ fontSize: "1.05rem" }}>
              {location.state.current_dealer}
            </Typography>
          </Box>
        </div>
        <div className="flex flex-col gap-2 my-2 sm:flex-row sm:items-center">
          <Typography sx={{ fontSize: "1.05rem", fontWeight: "600" }}>
            Owner Name:
          </Typography>
          <TextField
            type="text"
            name="name"
            id="outlined-size-small"
            className="w-full sm:w-2/6"
            size="small"
            value={location.state.name}
          />
          <CustomButton buttonName="Update" variant="contained" />
        </div>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Show Parts" {...a11yProps(0)} />
              <Tab label="Upload Documents" {...a11yProps(1)} />
              <Tab label="Open Claim" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
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
                  alignItems={{sm:"center"}}
                  width={{ xs: "100%", sm: "50%" }}
                >
                  <Typography pb={"3px"} fontWeight={"bold"} color={"gray"}>
                    Enter Repair Date:
                  </Typography>
                  <TextField
                    type="date"
                    name="repairDate"
                    size="small"
                    value={formValues.repairDate}
                    onChange={(e) => handleInputChange(e, "repairDate")}
                  />
                </Stack>
                <PartsTableView
                  data={partsData}
                  setSelectedPart={setSelectedPart}
                />
                {partsData.length > 0 &&
                  <>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 1, sm: 2, md: 4 }}
                  my={4}
                >
                  <Box>
                    <Typography pb={"3px"} fontWeight={"bold"} color={"gray"}>
                      Action:
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
                    <Typography pb={"3px"} fontWeight={"bold"} color={"gray"}>
                        Problem:
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
                    <Typography pb={"3px"} fontWeight={"bold"} color={"gray"}>
                      Barcode:
                    </Typography>
                    <TextField
                      size="small"
                      name="barcode"
                        readOnly
                      placeholder="Barcode"
                      value={formValues.barcode}
                        // onChange={(e) => handleInputChange(e, "barcode")}
                    />
                  </Box>
                  <Box>
                    <Typography pb={"3px"} fontWeight={"bold"} color={"gray"}>
                      You can add pictures as needed for each part you are
                      claiming here:
                    </Typography>
                    <form onSubmit={handleSubmitFile}>
                      <Box sx={{ display: "flex", flexWrap: "wrap" }} gap={2}>
                        <FormControl>
                          <TextField
                            size="small"
                            ref={fileInputRef}
                            type="file"
                            onChange={handleFileUploadChangeShowParts}
                          />
                        </FormControl>
                        {/* <Box sx={{ alignItems: "right" }}>
                          <CustomButton
                            buttonName="Upload File"
                            variant="contained"
                            type={"submit"}
                          />
                        </Box> */}
                      </Box>
                    </form>
                  </Box>
                </Stack>
                <Stack
                  width={"100%"}
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 1, sm: 2, md: 4 }}
                >
                  <Box width={{ xs: "100%", sm: "50%" }}>
                    <Typography pb={"3px"} fontWeight={"bold"} color={"gray"}>
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
                      }}
                    >
                      {uploadFileList?.map((ele, index) => (
                        <div key={index}>
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
                        </div>
                      ))}
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "end" }} my={2}>
                      <CustomButton
                        buttonName={"Add Part"}
                        variant="contained"
                          // onClick={handleAddPart}
                      />
                    </Box>
                  </Box>
                  <Box width={{ xs: "100%", sm: "45%" }}>
                    <Typography pb={"3px"} fontWeight={"bold"} color={"gray"}>
                      Add Comment:
                    </Typography>
                    <TextareaAutosize
                      aria-label="minimum height"
                      minRows={4}
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

                    <Box sx={{ display: "flex", justifyContent: "end" }} my={2}>
                      <CustomButton
                        buttonName="Submit Claim"
                        variant="contained"
                          onClick={submitClaim}
                      />
                    </Box>
                  </Box>
                </Stack>
                  </>
                }
                <Box sx={{ overflow: "auto" }} mt={8}>
                  <Typography pb={"3px"} fontWeight={"bold"} color={"#4a4d4a"}>
                    *Claimed Part
                  </Typography>
                  <RevsTable data={data} />
                </Box>
              </Box>
            </Card>
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
                  <UploadDocsTable userData={docDetails} />
                </Box>
                <form onSubmit={handleSubmit}>
                  <Box width={"400px"}>
                    <Box my={2}>
                      <TextField
                        type="file"
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
                        value={uploadState.commentInput}
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
            </Card>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <CreateClaim />
          </CustomTabPanel>
        </Box>
      </Card>
    </Box>
  );
}
