import { useMemo } from 'react';
import {
  MRT_Table,
  useMaterialReactTable,
} from 'material-react-table';
import CustomButton from '../ui/CustomButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';


export const UploadDocsTable = (userData) => {

  function convertDateFormat(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  }

  const data = [
    {
      actionButtons: '',
      DocumentNote: userData.userData.document_note ? userData.userData.document_note : "Not available",
      Uploaded: userData.userData.uploaded_at ? convertDateFormat(userData.userData.uploaded_at) : "Not available",
      RMAID: userData.userData.rmaid ? userData.userData.rmaid : "Not available",
    }
  ];

  const columns = useMemo(
    () => [
      {
        accessorKey: 'actionButtons',
        header: '#',
        Cell: () => (
          <div className='flex gap-4'>
            <CustomButton buttonName='Edit' variant="text" buttonIcon={<EditIcon sx={{ fontSize: "16px" }} />}></CustomButton>
            <CustomButton buttonName='View' variant="text" buttonIcon={<VisibilityIcon sx={{ fontSize: "16px" }} />}></CustomButton>
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
        bgcolor: 'lightgrey',
        // py :'5px',
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

export default UploadDocsTable;
