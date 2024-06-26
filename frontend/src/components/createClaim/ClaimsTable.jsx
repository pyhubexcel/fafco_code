import { useMemo } from "react";
import { MRT_Table, useMaterialReactTable } from "material-react-table";

export const ClaimsTable = ({ data }) => {
  console.log(data,"lhgjc")
  const columns = useMemo(
    () => [
      {
        accessorKey: "regid",
        header: "Reg Id",
      },
      {
        accessorKey: "part_id",
        header: "Part Id",
      },
      {
        accessorKey: "ramid",
        header: "Ram Id",
      },
      {
        accessorKey: "action",
        header: "Action",
      },
      {
        accessorKey: "problem",
        header: "Problem",
      },
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        accessorKey: "add_comment",
        header: "Comments",
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
