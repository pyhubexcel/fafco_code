import { useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";



const RegisteredUsers = ({ userList, getRowData }) => {
  const [userData, setUserData] = useState(null);
  getRowData(userData);

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        enableColumnFilterModes: false,
        filterFn: "equals",
        header: "REGID",
      },
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "owner_email",
        header: "Email",
      },
      {
        accessorKey: "address",
        header: "Address",
      },
      // {
      //     accessorKey: 'zip_code',
      //     header: 'ZIP',
      // },
      {
        accessorKey: "current_dealer",
        header: "Current Dealer",
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: userList,
    enableColumnFilterModes: false,
    enableDensityToggle: false,
    enableFullScreenToggle: false,
    enableGlobalFilter: true,
    enableRowSelection: true,
    enableMultiRowSelection: false,
    enableHiding: false,
    enableColumnActions: false,
    enableSorting: false,
    initialState: { showColumnFilters: false, showGlobalFilter: true },
    filterFns: {
      customFilterFn: (row, id, filterValue) => {
        return row.getValue(id) === filterValue;
      },
    },
    localization: {
      filterCustomFilterFn: "Custom Filter Fn",
    },
    renderTopToolbar: ({ table }) => {
      setUserData(table?.getSelectedRowModel()?.rows[0]?.original);
    },
  });

  return <MaterialReactTable table={table} />;
};

export default RegisteredUsers;
