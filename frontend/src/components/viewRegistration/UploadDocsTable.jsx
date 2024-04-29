import { useMemo } from 'react';
import {
  MRT_Table, //import alternative sub-component if we do not want toolbars
  useMaterialReactTable,
} from 'material-react-table';
import CustomButton from '../ui/CustomButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';


const data = [
  {
    actionButtons: '', // You can leave this empty for dummy data
    DocumentNote: 'Lorem ipsum dolor sit amet',
    Uploaded: '2024-04-28',
    RMAID: 'RMA001',
  },
  {
    actionButtons: '',
    DocumentNote: 'Sed do eiusmod tempor.',
    Uploaded: '2024-04-27',
    RMAID: 'RMA002',
  },
];

export const UploadDocsTable = () => {
  const columns = useMemo(
    () => [
        {
            accessorKey: 'actionButtons', 
            header: '#', 
            Cell: ({ row }) => ( 
              <div className='flex gap-4'>
                <CustomButton buttonName='Edit' variant="text" buttonIcon={<EditIcon/>}></CustomButton>
                <CustomButton buttonName='View' variant="text" buttonIcon={ <VisibilityIcon/>}></CustomButton>
              </div>
            ),
          },
      {
        accessorKey: 'DocumentNote',
        header: 'Document Note',
      },
      {
        accessorKey: 'Uploaded',
        header: 'Uploaded',
      },
      {
        accessorKey: 'RMAID',
        header: 'RMAID',
      },
    ],
    [],
  );
  const handleEdit = (row) => {
    // Handle edit button click here
    console.log('Edit button clicked for row:', row);
  };

  const handleView = (row) => {
    // Handle view button click here
    console.log('View button clicked for row:', row);
  };

  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableColumnActions: false,
    enableColumnFilters: false,
    enablePagination: false,
    enableSorting: false,
    mrtTheme: (theme) => ({
      baseBackgroundColor: theme.palette.background.default, //change default background color
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
        // py :'5px',
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

export default UploadDocsTable;
