// import { createContext, useEffect, useState } from "react";
// import Cookies from "js-cookie";
// import axiosInstance from "../utils/axios";

// const MyContext = createContext();

// const ContextProvider = ({ children, id }) => {
//   const [partsData, setPartsData] = useState([]);
//   const [resStatus, setResStatus] = useState("");
//   const token = Cookies.get("token");

//   console.log(id, "tokennnnnnnnnnnnnnnnn");
//   useEffect(() => {
//     const handleShowParts = async () => {
//       try {
//         const res = await axiosInstance.get(
//           `api/parts/part-detail/${Number(id)}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         setPartsData(res.data);
//         console.log(res.data, "contexttttttttttttttttttttttt");
//       } catch (error) {
//         console.log(error, "error");
//       }
//     };
//     handleShowParts();
//   }, [resStatus]);

//   return (
//     <MyContext.Provider
//       value={{ partsData, setPartsData, resStatus, setResStatus }}
//     >
//       {children}
//     </MyContext.Provider>
//   );
// };

// export { MyContext, ContextProvider };
