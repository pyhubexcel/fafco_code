import { useMemo } from "react";
import {
  // MRT_Table,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
// import FileDownloadIcon from '@mui/icons-material/FileDownload';

export const PartsTableView = ({ data, setSelectedPart }) => {
  const columns = useMemo(
    () => [
      // {
      //   accessorKey: "id",
      //   header: "Panel ID#",
      // },
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
      // {
      //   accessorKey: "product_line",
      //   header: "Product Line",
      // },
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
    data,
    enableColumnFilterModes: false,
    enableDensityToggle: false,
    enableFullScreenToggle: false,
    enableGlobalFilter: true,
    enableRowSelection: true,
    enableMultiRowSelection: false,
    enableHiding: false,
    enableColumnActions: false,
    enableSorting: false,
    initialState: { showColumnFilters: false, showGlobalFilter: false },
    renderTopToolbar: ({ table }) => {
      const selectedRow = table.getSelectedRowModel();
      if (
        selectedRow &&
        selectedRow.rows.length > 0 &&
        !selectedRow.selectAction
      ) {
        setSelectedPart(selectedRow.rows[0].original);
      } else {
        setSelectedPart(null)
      }
    },
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

  return <MaterialReactTable table={table} />;
};

export default PartsTableView;
