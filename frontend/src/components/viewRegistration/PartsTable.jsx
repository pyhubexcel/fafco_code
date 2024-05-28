// import { useMemo } from "react";
// import { MRT_Table, useMaterialReactTable } from "material-react-table";
// import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import CustomButton from "../ui/CustomButton";

// export const PartsTable = ({ handleOpen, handleDeleteParts, partsData }) => {
//   const columns = useMemo(
//     () => [
//       {
//         accessorKey: "actionButtons",
//         header: (
//           <div>
//             <CustomButton
//               className="flex gap-2"
//               buttonName="New"
//               variant="text"
//               buttonIcon={<AddCircleOutlineIcon sx={{ fontSize: "20px" }} />}
//               onClick={handleOpen}
//             ></CustomButton>
//           </div>
//         ),
//         Cell: () => (
//           <div className="flex gap-4">
//             <CustomButton
//               buttonName="Edit"
//               variant="text"
//               buttonIcon={<EditIcon sx={{ fontSize: "16px" }} />}
//               onClick={handleOpen}
//             ></CustomButton>
//             <CustomButton
//               buttonName="Delete"
//               variant="text"
//               buttonIcon={<DeleteIcon sx={{ fontSize: "16px" }} />}
//               onClick={() => handleDeleteParts()}
//             ></CustomButton>
//           </div>
//         ),
//       },
//       {
//         accessorKey: "id",
//         header: "Panel ID#",
//       },
//       {
//         accessorKey: "part_number",
//         header: "Part No",
//       },
//       {
//         accessorKey: "part_description",
//         header: "Description",
//       },
//       {
//         accessorKey: "barcode",
//         header: "Barcode",
//       },
//       {
//         accessorKey: "date_installed",
//         header: "Install Date",
//       },
//       {
//         accessorKey: "product_line",
//         header: "Product Line",
//       },
//       {
//         accessorKey: "part_problem",
//         header: "Part Problem",
//       },
//       {
//         accessorKey: "active",
//         header: "Active",
//       },
//       {
//         accessorKey: "claim_action",
//         header: "Claim Action",
//       },
//     ],
//     []
//   );

//   const table = useMaterialReactTable({
//     columns,
//     data: partsData,
//     enableColumnActions: false,
//     enableColumnFilters: false,
//     enablePagination: false,
//     enableSorting: false,
//     mrtTheme: (theme) => ({
//       baseBackgroundColor: theme.palette.background.default,
//     }),
//     muiTableBodyRowProps: { hover: true },
//     muiTableProps: {
//       sx: {
//         border: "1px solid rgba(81, 81, 81, .5)",
//         caption: {
//           captionSide: "top",
//         },
//       },
//     },
//     muiTableHeadCellProps: {
//       sx: {
//         border: "1px solid rgba(81, 81, 81, .5)",
//         fontWeight: "bold",
//         bgcolor: "lightgrey",
//         py: "2px",
//       },
//     },
//     muiTableBodyCellProps: {
//       sx: {
//         border: "1px solid rgba(81, 81, 81, .5)",
//         py: "2px",
//       },
//     },
//   });

//   return <MRT_Table table={table} />;
// };

// export default PartsTable;

import { useContext, useMemo } from "react";
import { MRT_Table, useMaterialReactTable } from "material-react-table";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomButton from "../ui/CustomButton";
import { MyContext } from "../../context/ContextProvider";
import Loader from "../loader";

export const PartsTable = ({
  handleOpen,
  handleDeleteParts,
  partsData,
  handleEditParts,
}) => {
  const{isLoading}=useContext(MyContext)
  const columns = useMemo(
    () => [
      {
        accessorKey: "actionButtons",
        header: (
          <div>
            <CustomButton
              className="flex gap-2"
              buttonName="New"
              variant="text"
              buttonIcon={<AddCircleOutlineIcon sx={{ fontSize: "20px" }} />}
              onClick={handleOpen}
            ></CustomButton>
          </div>
        ),
        Cell: ({ row }) => (
          <div className="flex gap-4">
            <CustomButton
              buttonName="Edit"
              variant="text"
              buttonIcon={<EditIcon sx={{ fontSize: "16px" }} />}
              onClick={() =>
                handleEditParts(row.original.registration, row.original.id)
              }
            ></CustomButton>
            <CustomButton
              buttonName="Delete"
              variant="text"
              buttonIcon={<DeleteIcon sx={{ fontSize: "16px" }} />}
              onClick={() =>
                handleDeleteParts(row.original.registration, row.original.id)
              }
            ></CustomButton>
          </div>
        ),
      },
      {
        accessorKey: "id",
        header: "Panel ID#",
      },
      {
        accessorKey: "part_number",
        header: "Part No",
      },
      {
        accessorKey: "part_description",
        header: "Description",
      },
      {
        accessorKey: "barcode",
        header: "Barcode",
      },
      {
        accessorKey: "date_installed",
        header: "Install Date",
      },
      {
        accessorKey: "product_line",
        header: "Product Line",
      },
      // {
      //   accessorKey: "part_problem",
      //   header: "Part Problem",
      // },
      // {
      //   accessorKey: "active",
      //   header: "Active",
      // },
      // {
      //   accessorKey: "claim_action",
      //   header: "Claim Action",
      // },
    ],
    []
  );
  
  const table = useMaterialReactTable({
    columns,
    data: partsData,
    enableColumnActions: false,
    enableColumnFilters: false,
    enablePagination: false,
    enableSorting: false,
    mrtTheme: (theme) => ({
      baseBackgroundColor: theme.palette.background.default,
    }),
    muiTableBodyRowProps: { hover: true },
    muiTableProps: {
      sx: {
        border: "1px solid rgba(81, 81, 81, .5)",
        caption: {
          captionSide: "top",
        },
      },
    },
    muiTableHeadCellProps: {
      sx: {
        border: "1px solid rgba(81, 81, 81, .5)",
        fontWeight: "bold",
        bgcolor: "lightgrey",
        py: "2px",
      },
    },
    muiTableBodyCellProps: {
      sx: {
        border: "1px solid rgba(81, 81, 81, .5)",
        py: "2px",
      },
    },
  });

  return <MRT_Table table={table} />;
};

export default PartsTable;
