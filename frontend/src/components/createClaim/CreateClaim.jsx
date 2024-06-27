import {
  Box,
  Card,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";
import Cookies from "js-cookie";
import PartsTable from "../viewRegistration/PartsTable";
import CustomButton from "../ui/CustomButton";
// import RevsTable from "./RevsTable";
import axiosInstance from "../../utils/axios";
import { toast } from "react-toastify";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
// import CommonSelect from "../Common/CommonSelect";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MyContext } from "../../context/ContextProvider";

const modalInputs = [
  {
    name: "Part Number",
    type: "text",
    key: "part_number",
    placeholder: "partNumber",
  },
  {
    name: "Active",
    type: "text",
    key: "active",
    placeholder: "Status",
  },
  {
    name: "Part Description",
    type: "text",
    key: "part_description",
    placeholder: "Part Description",
  },
  {
    name: "Product Line",
    type: "text",
    key: "product_line",
    placeholder: "Product Line",
  },
  {
    name: "Installing Dealer",
    type: "text",
    key: "installing_dealer",
    placeholder: "Installing Dealer",
  },
  { name: "Barcode", type: "text", key: "barcode", placeholder: "Barcode" },
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

export default function CreateClaim() {
  const { id } = useParams();
  const token = Cookies.get("token");
  const { setShowPartsData } = useContext(MyContext);
  // const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  // const [payload, setPayload] = useState({});
  const [openDelete, setOpenDelete] = useState(false);
  // const [uploadState, setUploadState] = useState({
  //   uploadFile: null,
  //   commentInput: "",
  // });
  // const fileInputRef = useRef(null);
  // const [selectedAction, setSelectedAction] = useState("");
  // const [selectedProblem, setSelectedProblem] = useState("");
  const [resStatus, setResStatus] = useState("");
  const [partsData, setPartsData] = useState([]);
  // const [formValues, setFormValues] = useState({
  //   repairDate: "",
  //   barcode: "",
  //   uploadFile: null,
  //   uploadList: "",
  //   comment: "",
  //   ref: "",
  // });
  const [idAndRegistrationForUpdate, setIdAndRegistrationForUpdate] = useState({
    id: "",
    registration_no: "",
  });

  const [csvPartFormValues, setCsvPartFormValues] = useState({
    part_description: "",
    product_line: "",
    installing_dealer: "",
    barcode: "",
    active: "",
    part_number: "",
    profile_id: "",
    registration_id: "",
    id: "",
  });

  // const optionData = [
  //   { id: 1, value: "FREEZE DAMAGE" },
  //   { id: 2, value: "DIMPLE LEAK REV ONLY" },
  //   { id: 3, value: "HEADER LEAK" },
  //   { id: 4, value: "PANEL LEAK" },
  //   { id: 5, value: "PANEL SPLIT" },
  //   { id: 6, value: "PANEL TOO LONG" },
  //   { id: 7, value: "PANEL TOO SHORT" },
  //   { id: 8, value: "VRV FAIL" },
  // ];
  // const optionDataAction = [
  //   { id: 1, value: "Repair" },
  //   { id: 2, value: "Replace" },
  // ];

  const handleClose = () => {
    setCsvPartFormValues({
      part_description: "",
      product_line: "",
      installing_dealer: "",
      barcode: "",
      active: "",
      part_number: "",
      profile_id: "",
      registration_id: "",
      id: "",
    });
    setOpen(false);
  };
  // const handleOpenDelete = () => setOpenDelete(true);

  const handleDeleteClose = () => setOpenDelete(false);
  const [partNumbers, setPartNumbers] = useState([]);
  const [selectedPart, setSelectedPart] = useState(null);
  const [tableLoading,setTableLoading] = useState(false)

  // const getOptionData = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await axiosInstance.get(`api/`);
  //     setOptionData(response.data);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   getOptionData();
  // }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  // const handleSubmitFile = async () => {
  //   try {
  //     setLoading(true);
  //     const data = {
  //       document_note: uploadState.uploadFile,
  //       document: uploadState.uploadInput,
  //     };

  //     const res = await axiosInstance.post(`api/claims/claim/`, data, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     if (res.status == 200) {
  //       toast.success("Document Uploaded");
  //       setUploadState({
  //         uploadInput: null,
  //         commentInput: "",
  //       });
  //     }
  //   } catch (error) {
  //     console.log("Error:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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

  // const handleCreatePartsInputChange = (key, value) => {
  //   setPayload((prevState) => ({
  //     ...prevState,
  //     [key]: value,
  //   }));
  // };

  const handleCreateParts = async () => {
    try {
      const res = await axiosInstance.post(
        `api/parts/part/`,
        csvPartFormValues,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        toast.success("Added successfully", {
          theme: "colored",
          position: "top-center",
          autoClose: 1000,
        });
        setOpen(false);
        handleShowParts();
        setCsvPartFormValues({
          part_description: "",
          product_line: "",
          installing_dealer: "",
          barcode: "",
          active: "",
          part_number: "",
          profile_id: "",
          registration_id: "",
          id: "",
        });
      }
    } catch (error) {
      console.log(error, "error");
    }
    setShowPartsData(false)
  };

  const handleShowParts = async () => {
    setTableLoading(true)
    setShowPartsData(true)
    try {
      const res = await axiosInstance.get(
        `api/parts/part-detail/${Number(id)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPartsData(res.data);
    } catch (error) {
      console.log(error, "error");
    }
    setTableLoading(false)
  };

  useEffect(() => {
    handleShowParts();
    fetchPartNumbers();
  }, [resStatus]);

  // const handleActionChange = (event) => {
  //   setSelectedAction(event.target.value);
  // };

  // const handleProblemChange = (event) => {
  //   setSelectedProblem(event.target.value);
  // };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormValues({ ...formValues, [name]: value });
  // };

  // const handleFileChange = (e) => {
  //   setFormValues({ ...formValues, uploadFile: e.target.files[0] });
  // };


  const fetchPartNumbers = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`api/parts/partcsv/`);
      setPartNumbers(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  }, []);

  const handlePartNumberChange = (event) => {
    const selectedPartNumber = event.target.value;
    const selectedPartData = partNumbers.find(
      (part) => part.part_number === selectedPartNumber
    );
    if (selectedPartData) {
      setSelectedPart(selectedPartData);
      setCsvPartFormValues({
        part_description: selectedPartData.part_description,
        product_line: selectedPartData.product_line,
        installing_dealer: selectedPartData.installing_dealer,
        barcode: selectedPartData.barcode || "",
        part_number: selectedPartData.part_number,
        active: selectedPartData.active,
        profile_id: id,
        registration_id: idAndRegistrationForUpdate.registration_no,
        id: idAndRegistrationForUpdate.id,
      });
    } else {
      setSelectedPart(null);
      setCsvPartFormValues({
        part_description: "",
        product_line: "",
        installing_dealer: "",
        barcode: "",
        active: "",
        part_number: "",
        profile_id: "",
        registration_id: "",
        id: "",
      });
    }
  };

  // const data = [
  //   {
  //     actionButtons: null,
  //     PanelId: "ABC123",
  //     Part: "12345",
  //     Description: "Sample description 1",
  //     Barcode: "BAR123",
  //     InstallDate: "2024-04-28",
  //   },
  //   {
  //     actionButtons: null,
  //     PanelId: "DEF456",
  //     Part: "67890",
  //     Description: "Sample description 2",
  //     Barcode: "BAR456",
  //     InstallDate: "2024-04-29",
  //   },
  // ];

  const handleDeleteParts = async (registration, id) => {
    try {
      setResStatus("");
      const response = await axiosInstance.delete(
        `api/parts/part-details/${Number(registration)}/${Number(id)}`
      );
      if (response.status === 200 && response.statusText === "OK") {
        setShowPartsData(true)
        setResStatus(response.data.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setShowPartsData(false)
  };

  const handleEditParts = async (registration, id) => {
    try {
      const response = await axiosInstance.get(
        `api/parts/part-details/${Number(registration)}/${Number(id)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        const partDetails = response.data;
        setCsvPartFormValues({
          part_description: partDetails.part_description,
          product_line: partDetails.product_line,
          installing_dealer: partDetails.installing_dealer,
          barcode: partDetails.barcode || "",
          part_number: partDetails.part_number,
          active: partDetails.active,
        });
        setIdAndRegistrationForUpdate({
          id: partDetails.id,
          registration_no: partDetails.registration,
        });
        setOpen(true);
      } else {
        console.error("Failed to fetch part details");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpdateParts = async () => {
    try {
      const res = await axiosInstance.patch(
        `api/parts/part-details/${Number(
          csvPartFormValues.registration_id
        )}/${Number(csvPartFormValues.id)}`,
        csvPartFormValues,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setResStatus("");
      console.log(res,"res")
      if (res.status === 200) {
        toast.success("Part updated successfully");
        setResStatus(res.data.status);
        setOpen(false);
      } else {
        console.error("Failed to update part");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setShowPartsData(false)
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <ToastContainer />
      <Card
        sx={{
          width: "100%",
          margin: "15px",
          padding: "20px",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}
      >
        {/* <Box
          sx={{
            width: "50%",
            display: "flex",
            gap: "7px",
            alignItems: "center",
          }}
          my={2}
        >
          <Typography pb={"3px"} fontWeight={"bold"} color={"gray"}>
            Enter Repair Date:
          </Typography>
          <TextField
            type="date"
            name="repairDate"
            size="small"
            value={formValues.repairDate}
            onChange={handleInputChange}
          />
        </Box> */}
        <Box sx={{ overflow: "auto" }}>
          <Typography pb={"3px"} fontWeight={"bold"} color={"gray"}>
            Choose Part:
          </Typography>
          {tableLoading? <Box textAlign={"center"}><CircularProgress size={"1rem"}/></Box>:
          <PartsTable
            handleOpen={handleOpen}
            handleDeleteParts={handleDeleteParts}
            partsData={partsData}
            handleEditParts={handleEditParts}
          />}
        </Box>
        {/* <Box display={"flex"} gap={5} my={4}>
          <Box>
            <Typography pb={"3px"} fontWeight={"bold"} color={"gray"}>
              Action:
            </Typography>
            <CommonSelect
              value={selectedAction}
              placeholder={"Select Action"}
              onChange={handleActionChange}
              options={optionDataAction.map((option) => ({
                value: option.value,
                label: option.value,
              }))}
            />
          </Box>
          <Box>
            <Typography pb={"3px"} fontWeight={"bold"} color={"gray"}>
              Problem:
            </Typography>
            <CommonSelect
              value={selectedProblem}
              placeholder={"Select Problem"}
              onChange={handleProblemChange}
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
              placeholder="Barcode"
              value={formValues.barcode}
              onChange={handleInputChange}
            />
          </Box>
          <Box>
            <Typography pb={"3px"} fontWeight={"bold"} color={"gray"}>
              You can add pictures as needed for each part you are claiming
              here:
            </Typography>
            <form onSubmit={handleSubmitFile}>
              <Box sx={{ display: "flex", flexWrap: "wrap" }} gap={2}>
                <FormControl>
                  <TextField
                    size="small"
                    ref={fileInputRef}
                    type="file"
                    onChange={(e) =>
                      setUploadState((prevState) => ({
                        ...prevState,
                        uploadInput: e.target.files[0],
                      }))
                    }
                  />
                </FormControl>
                <Box sx={{ alignItems: "right" }}>
                  <CustomButton
                    buttonName="Upload File"
                    variant="contained"
                    type={"submit"}
                  />
                </Box>
              </Box>
            </form>
          </Box>
        </Box>
        <Box
          display={"flex"}
          width={"100%"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box width={"52%"}>
            <Typography pb={"3px"} fontWeight={"bold"} color={"gray"}>
              Upload List:
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
              placeholder="upload List"
              name="uploadList"
              value={formValues.uploadList}
              onChange={handleInputChange}
            />
            <Box sx={{ display: "flex", justifyContent: "end" }} my={2}>
              <CustomButton buttonName={"Add Part"} variant="contained" />
            </Box>
          </Box>
          <Box width={"45%"}>
            <Typography pb={"3px"} fontWeight={"bold"} color={"gray"}>
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
              placeholder="Optional - Add comment if needed"
              name="comment"
              value={formValues.comment}
              onChange={handleInputChange}
            />
            <Box sx={{ display: "flex", justifyContent: "end" }} my={2}>
              <CustomButton buttonName="Submit Claim" variant="contained" />
            </Box>
          </Box>
        </Box>
        <Box sx={{ overflow: "auto" }} mt={8}>
          <Typography pb={"3px"} fontWeight={"bold"} color={"#4a4d4a"}>
            *Claimed Part
          </Typography>
          <RevsTable data={data} />
        </Box> */}

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {modalInputs.map((item, i) => (
              <form key={i}>
                {item.name === "Part Number" ? (
                  <FormControl variant="standard" sx={{ width: "100%" }}>
                    <InputLabel
                      variant="standard"
                      htmlFor="uncontrolled-native"
                      sx={{
                        fontWeight: "bold",
                        padding: "2px",
                        backgroundColor: "transparent",
                        fontSize: "15px",
                      }}
                    >
                      -- part number --
                    </InputLabel>
                    <Select
                      value={csvPartFormValues.part_number}
                      onChange={handlePartNumberChange}
                      sx={{ py: "1px" }}
                    >
                      {partNumbers.map((part) => (
                        <MenuItem key={part.id} value={part.part_number}>
                          {part.part_number}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  <Box sx={{ my: "12px" }}>
                    <label
                      style={{
                        fontSize: "15px",
                        fontWeight: "600",
                        color: "gray",
                      }}
                    >
                      {item.name}
                    </label>
                    <input
                      size="small"
                      type={item.type}
                      variant="standard"
                      value={csvPartFormValues[item.key]}
                      disabled
                      onChange={(e) =>
                        setCsvPartFormValues((prevValues) => ({
                          ...prevValues,
                          [item.key]: e.target.value,
                        }))
                      }
                      style={{
                        borderBottom: "1px solid gray",
                        width: "100%",
                        fontSize: "15px",
                        backgroundColor: "transparent",
                      }}
                    />
                  </Box>
                )}
              </form>
            ))}
            <Box display={"flex"} justifyContent={"end"} gap={2}>
              <CustomButton buttonName={"Cancel"} onClick={handleClose} />
              <CustomButton buttonName={"Create"} onClick={handleCreateParts} />
              <CustomButton buttonName={"update"} onClick={handleUpdateParts} />
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
