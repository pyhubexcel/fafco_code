import { useMemo } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';

// const data = [
//     {
//         id: 1,
//         Name: 'John Doe',
//         owner_email: 'john@example.com',
//         address: '123 Main St',
//         zip_code: '12345',
//         current_dealer: 'ABC Motors',
//     },
//     {
//         id: 2,
//         Name: 'Jane Smith',
//         owner_email: 'jane@example.com',
//         address: '456 Elm St',
//         zip_code: '54321',
//         current_dealer: 'XYZ Autos',
//     },
//     {
//         id: 3,
//         Name: 'Alice Johnson',
//         owner_email: 'alice@example.com',
//         address: '789 Oak St',
//         zip_code: '67890',
//         current_dealer: '123 Cars',
//     },
//     // Add more dummy data as needed
// ];
const RegisteredUsers = ({userList}) => {
    const columns = useMemo(
        () => [
            {
                accessorKey: 'id',
                enableColumnFilterModes: false,
                filterFn: 'equals',
                header: 'REGID',
            },
            {
                accessorKey: 'Name',
                header: 'Name',
            },
            {
                accessorKey: 'owner_email',
                header: 'Email',
            },
            {
                accessorKey: 'address',
                header: 'Address',
            },
            {
                accessorKey: 'zip_code',
                header: 'ZIP',
            },
            {
                accessorKey: 'current_dealer',
                header: 'Current Dealer',
            },
        ],
        [],
    );

    const table = useMaterialReactTable({
        columns,
        data:userList,
        enableColumnFilterModes: false,
        enableDensityToggle: false,
        enableFullScreenToggle: false,
        enableGlobalFilter: true,
        // enableColumnFilters:false,
        enableHiding: false,
        enableColumnActions: false, 
        enableSorting: false,
        initialState: { showColumnFilters: false,showGlobalFilter:true }, 
        filterFns: {
            customFilterFn: (row, id, filterValue) => {
                return row.getValue(id) === filterValue;
            },
        },
        localization: {
            filterCustomFilterFn: 'Custom Filter Fn',
        },
    });

    return <MaterialReactTable table={table} />;
};

export default RegisteredUsers;
