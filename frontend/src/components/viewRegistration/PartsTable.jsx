import { useMemo } from 'react';
import {
  MRT_Table, 
  useMaterialReactTable,
} from 'material-react-table';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomButton from '../ui/CustomButton';
const data = [
    {
      actionButtons: null,
      PanelId: 'ABC123',
      Part: '12345',
      Description: 'Sample description 1',
      Barcode: 'BAR123',
      InstallDate: '2024-04-28',
    },
    {
      actionButtons: null,
      PanelId: 'DEF456',
      Part: '67890',
      Description: 'Sample description 2',
      Barcode: 'BAR456',
      InstallDate: '2024-04-29',
    },
  ];

export const PartsTable = ({handleOpen,handleDeleteClose}) => {
  const columns = useMemo(
    () => [
        {
            accessorKey: 'actionButtons', 
            header: (
                <div>
                  <CustomButton className='flex gap-2' buttonName='New' variant="text" buttonIcon={<AddCircleOutlineIcon/>} onClick={handleOpen}></CustomButton>
                </div>
              ), 
            Cell: () => ( 
              <div className='flex gap-4'>
                <CustomButton buttonName='Edit' variant="text" buttonIcon={<EditIcon/>} onClick={handleOpen}></CustomButton>
                <CustomButton buttonName='Delete' variant="text" buttonIcon={ <DeleteIcon/>} onClick={handleDeleteClose}></CustomButton>
              </div>
            ),
          },
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
        bgcolor:'lightgrey',
        py :'2px',
        // px :'5px',
      },
    },
    muiTableBodyCellProps: {
      sx: {
        border: '1px solid rgba(81, 81, 81, .5)',
        py :'2px',
        // px :'5px',
      },
    },
  });

  return <MRT_Table table={table} />;
};

export default PartsTable;
