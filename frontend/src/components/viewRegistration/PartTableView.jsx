import { useMemo } from 'react';
import { MRT_Table, useMaterialReactTable } from 'material-react-table';
import CustomButton from '../ui/CustomButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/material';


export const PartsTableView = (userData) => {

  console.log(userData,"PartsTableView userData....!");

  const data = [
    {
      PanelId: userData.data.id,
      Part: userData.data.part_number,
      Description: userData.data.part_description,
      Barcode: userData.data.barcode,
      InstallDate: userData.data.date_installed,
    }
  ];

  const columns = useMemo(
    () => [

      {
        accessorKey: 'PanelId',
        header: 'Panel ID#',
      },
      {
        accessorKey: 'Part',
        header: 'Part#',
      },
      {
        accessorKey: 'Description',
        header: 'Description',
      },
      {
        accessorKey: 'Barcode',
        header: 'Barcode',
      },
      {
        accessorKey: 'InstallDate',
        header: 'Install Date',
      },
    ],
    [],
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
        border: '1px solid rgba(81, 81, 81, .5)',
        caption: {
          captionSide: 'top',
        },
      },
    },
    muiTableHeadCellProps: {
      sx: {
        border: '1px solid rgba(81, 81, 81, .5)',
        fontWeight: 'bold',
        bgcolor: 'lightgrey',
        py: '2px',
      },
    },
    muiTableBodyCellProps: {
      sx: {
        border: '1px solid rgba(81, 81, 81, .5)',
        py: '2px',
      },
    },
  });

  return <MRT_Table table={table} />;
};

export default PartsTableView;
