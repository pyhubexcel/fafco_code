import { useMemo } from 'react';
import { MRT_Table, useMaterialReactTable } from 'material-react-table';

const data = [
    {
      PanelId: 'ABC123',
      Part: '12345',
      Description: 'Sample description 1',
      Barcode: 'BAR123',
      InstallDate: '2024-04-28',
    },
    {
      PanelId: 'DEF456',
      Part: '67890',
      Description: 'Sample description 2',
      Barcode: 'BAR456',
      InstallDate: '2024-04-29',
    },
  ];

export const PartsTableView = () => {
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
        bgcolor:'lightgrey',
        py :'2px',
      },
    },
    muiTableBodyCellProps: {
      sx: {
        border: '1px solid rgba(81, 81, 81, .5)',
        py :'2px',
      },
    },
  });

  return <MRT_Table table={table} />;
};

export default PartsTableView;
