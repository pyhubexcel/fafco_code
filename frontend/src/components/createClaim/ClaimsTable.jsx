import { useMemo} from "react";
import { MRT_Table, useMaterialReactTable } from "material-react-table";
import {IconButton, Typography } from "@mui/material";
import { Visibility } from "@mui/icons-material";

export const ClaimsTable = ({ data,handleClaimViewParts }) => {

  const columns = useMemo(
    () => [
      {
        accessorKey: "documents",
        header: "Uploaded photos",
        size: 150,
        Cell: ({ row }) => (
          <IconButton
          onClick={() =>
            handleClaimViewParts(row.original)
          }
            sx={{ display: "flex", alignItems: "center" ,color:'#1976D2'}}
          >
            <Visibility />
            <Typography variant="body2" sx={{ ml: 1,color:'#1976D2' }}  >
              View
            </Typography>
          </IconButton>
        ),
      },
      {
        accessorKey: "regid",
        header: "Reg Id",
        size: 100,
      },
      {
        accessorKey: "part_id",
        header: "Part Id",
        size: 100,
      },
      {
        accessorKey: "ramid",
        header: "Rma Id",
        size: 100,
      },
      {
        accessorKey: "action",
        header: "Action",
        size: 100,
      },
      {
        accessorKey: "problem",
        header: "Problem",
        size: 100,
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 100,
      },
      {
        accessorKey: "add_comment",
        header: "Comments",
        size: 300,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
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
        py: "5px",
        // px :'5px',
      },
    },
    muiTableBodyCellProps: {
      sx: {
        border: "1px solid rgba(81, 81, 81, .5)",
        py: "2px",
        // px :'5px',
      },
    },
  });

  return <MRT_Table table={table} />;
};

export default ClaimsTable;
