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
  const { setShowPartsData,setDeletePart } = useContext(MyContext);
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


  const handleDeleteClose = () => setOpenDelete(false);
  const [partNumbers, setPartNumbers] = useState([]);
  const [selectedPart, setSelectedPart] = useState(null);
  const [tableLoading,setTableLoading] = useState(false)


  const handleOpen = () => {
    setOpen(true);
  };

  
  const handleCreateParts = async () => {
    try {
      setShowPartsData(true)
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
          autoClose: 2000,
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
    setShowPartsData(false)
  };

  useEffect(() => {
    handleShowParts();
    fetchPartNumbers();
    setResStatus("");
  }, [resStatus]);

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


  const handleDeleteParts = async (registration, id) => {
    try {
      setDeletePart(true)
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
      // console.log(res,"res")
      if (res.status === 200) {
        toast.success("Part updated successfully",{autoClose: 2000,});
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
      {/* <ToastContainer /> */}
      <Card
        sx={{
          width: "100%",
          margin: "15px",
          padding: "20px",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}
      >
       
        <Box sx={{ overflow: "auto" }}>
        
          {tableLoading? <Box textAlign={"center"}><CircularProgress size={"1rem"}/></Box>:
          <PartsTable
            handleOpen={handleOpen}
            handleDeleteParts={handleDeleteParts}
            partsData={partsData}
            handleEditParts={handleEditParts}
          />}
        </Box>

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
