import { useMemo } from 'react';
import {
  MRT_Table, 
  useMaterialReactTable,
} from 'material-react-table';


export const RevsTable = ({data}) => {
  console.log(data,"res");
  const columns = useMemo(
    () => [
      {
        accessorKey: '#',
        header: '#',
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
        accessorKey: 'Problem',
        header: 'Problem',
      },
      {
        accessorKey: 'Barcode',
        header: 'Barcode',
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
        py :'5px',
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

export default RevsTable;
