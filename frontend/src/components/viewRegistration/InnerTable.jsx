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
    Part: 'ABC123',
    Action: 'Repair',
    ProblemDesc: 'Broken component',
    Barcode: '1234567890',
    DateInstalled: '2024-04-28',
  },
  {
    actionButtons: null,
    Part: 'DEF456',
    Action: 'Replacement',
    ProblemDesc: 'Faulty sensor',
    Barcode: '0987654321',
    DateInstalled: '2024-03-15',
  },
  {
    actionButtons: null,
    Part: 'GHI789',
    Action: 'Maintenance',
    ProblemDesc: 'Routine check-up',
    Barcode: '1357924680',
    DateInstalled: '2024-01-10',
  }
];


export const InnerTable = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'actionButtons',
        header: (
          <div className='flex gap-2'>
            <CustomButton buttonName='New' variant="text" buttonIcon={<AddCircleOutlineIcon />}></CustomButton>
          </div>
        ),
        // eslint-disable-next-line react/prop-types
        Cell: ({ row }) => (
          <div className='flex gap-4'>
            <CustomButton buttonName='Edit' variant="text" buttonIcon={<EditIcon />}></CustomButton>
            <CustomButton buttonName='New' variant="text" buttonIcon={<AddCircleOutlineIcon />}></CustomButton>
            <CustomButton buttonName='Delete' variant="text" buttonIcon={<DeleteIcon />}></CustomButton>
          </div>
        ),
      },
      {
        accessorKey: 'Part',
        header: 'Part#',
      },
      {
        accessorKey: 'Action',
        header: 'Action',
      },
      {
        accessorKey: 'ProblemDesc',
        header: 'Problem Desc',
      },
      {
        accessorKey: 'Barcode',
        header: 'Barcode',
      },
      {
        accessorKey: 'DateInstalled',
        header: 'Date Installed',
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
        // px :'5px',
      },
    },
    muiTableBodyCellProps: {
      sx: {
        border: '1px solid rgba(81, 81, 81, .5)',
        py: '2px',
        // px :'5px',
      },
    },
  });

  return <MRT_Table table={table} />;
};

export default InnerTable;
