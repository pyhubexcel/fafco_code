import { Box, Card, Typography } from "@mui/material";
import RegisteredUsers from "../../components/RegisteredUsers";
import CustomButton from "../../components/ui/CustomButton";
import { Link } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import { useContext, useEffect, useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Cookies from "js-cookie";
import { MyContext } from "../../context/ContextProvider";

export default function RegistrationLookup() {
  const [loading, setLoading] = useState(false);
  const [userList, setUserList] = useState([]);
  const [rowUserData, setRowUserData] = useState(null);
  const { fetchAllClaimParts,setShowPartsData } = useContext(MyContext);

  const lookupApi = async () => {
    try {
      setLoading(true);
      const token = Cookies.get("token");
      const res = await axiosInstance.get(`api/auth/profiles/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setUserList(res?.data?.data);
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getRowData = (userData) => {
    setRowUserData(userData);
  };

  useEffect(() => {
    lookupApi();
  }, []);

  const handleShowParts = (id) => {
    setShowPartsData(true)
    localStorage.setItem("idd",id)
    fetchAllClaimParts(id);
  };

  return (
    <Card
      sx={{
        width: "100%",
        margin: "20px",
        padding: "20px",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      }}
    >
      <Typography sx={{ fontSize: "1.35rem", fontWeight: "700" }}>
        Registration Lookup
      </Typography>
      {!loading ? (
        <RegisteredUsers getRowData={getRowData} userList={userList} />
      ) : (
        <Stack spacing={1}>
          <Skeleton variant="rectangular" width={210} height={50} />
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} height={40} />
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} height={40} />
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} height={40} />
          <Skeleton variant="rounded" width={210} height={50} />
        </Stack>
      )}

      <Box
        sx={{ width: "200px", direction: "flex", justifyContent: "flex-start" }}
        my={2}
      >
        <Link
          to={rowUserData ? `/viewRegistration/${rowUserData.id}` : ""}
          state={rowUserData}
          title="view registration details"
        >
          <CustomButton
            buttonName="View Registration"
            variant="contained"
            disable={!rowUserData}
            onClick={() => handleShowParts(rowUserData?.id)}
          />
        </Link>
      </Box>
    </Card>
  );
}
