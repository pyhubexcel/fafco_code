import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axiosInstance from "../utils/axios";

const MyContext = createContext();

const ContextProvider = ({ children }) => {
  const [partsData, setPartsData] = useState([]);
  const [resStatus, setResStatus] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const token = Cookies.get("token");
  const [updateName,setUpdateName]=useState(false)



  const fetchAllClaimParts = async (id) => {
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
      setIsLoading(false);
    } catch (error) {
      console.log(error, "error");
    }
  };

  const viewPartId = localStorage.getItem("idd");
  useEffect(() => {
    if (viewPartId !== null || undefined || "") {
      fetchAllClaimParts(viewPartId);
    }
  }, [resStatus,viewPartId]);

  return (
    <MyContext.Provider
      value={{
        partsData,
        resStatus,
        setResStatus,
        fetchAllClaimParts,
        isLoading,
        updateName,
        setUpdateName
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, ContextProvider };
