import { useMemo } from 'react';
import {
    MRT_Table, //import alternative sub-component if we do not want toolbars
    useMaterialReactTable,
} from 'material-react-table';
const data = [
    {
        firstName: 'John',
        lastName: 'Doe',
        address: '123 Main St',
        city: 'Anytown',
        state: 'CA',
    },
    {
        firstName: 'Jane',
        lastName: 'Smith',
        address: '456 Elm St',
        city: 'Otherville',
        state: 'NY',
    },
]
export const SimpleTable = () => {
    const columns = useMemo(
        //column definitions...
        () => [
            {
                accessorKey: 'firstName',
                header: 'First Name',
            },
            {
                accessorKey: 'lastName',
                header: 'Last Name',
            },
            {
                accessorKey: 'address',
                header: 'Address',
            },
            {
                accessorKey: 'city',
                header: 'City',
            },
            {
                accessorKey: 'state',
                header: 'State',
            },
        ],
        [],
        //end
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
        muiTableBodyRowProps: { hover: false },
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
                fontStyle: 'italic',
                fontWeight: 'normal',
            },
        },
        muiTableBodyCellProps: {
            sx: {
                border: '1px solid rgba(81, 81, 81, .5)',
            },
        },
    });

    //using MRT_Table instead of MaterialReactTable if we do not need any of the toolbar components or features
    return <MRT_Table table={table} />;
};

export default SimpleTable;
