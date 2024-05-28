import { useContext, useMemo } from "react";
import { MRT_Table, useMaterialReactTable } from "material-react-table";

export const PartsTableView = ({data}) => {
  const columns = useMemo(
    () => [
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

export default PartsTableView;
