import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axiosInstance from "../utils/axios";

const MyContext = createContext();

const ContextProvider = ({ children }) => {
  const [partsData, setPartsData] = useState([]);
  const [resStatus, setResStatus] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const token = Cookies.get("token");

  const fetchAllClaimParts = async (id) => {
    console.log("helllooooooooooo");
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

  useEffect(() => {
    const viewPartId = sessionStorage.getItem("idd");
    if (viewPartId !== null || undefined || "") {
      console.log("hiiiiiiiiiiiiiiii");
      fetchAllClaimParts(viewPartId);
    }
  }, [resStatus]);

  return (
    <MyContext.Provider
      value={{
        partsData,
        resStatus,
        setResStatus,
        fetchAllClaimParts,
        isLoading,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, ContextProvider };
