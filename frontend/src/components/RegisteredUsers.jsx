import { useMemo } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';

const data = [
    {
        REGID: 1,
        Name: "John",
        Email: "Doe",
        Address: "Smith",
        ZIP: 30,
        CurrentDealer: "Pacific",
    },
    {
        REGID: 1,
        Name: "John",
        Email: "Doe",
        Address: "Smith",
        ZIP: 310,
        CurrentDealer: "Pacific",
    },
    {
        REGID: 1,
        Name: "John",
        Email: "Doe",
        Address: "Smith",
        ZIP: 11110,
        CurrentDealer: "Pacific",
    },
    {
        REGID: 1,
        Name: "John",
        Email: "Doe",
        Address: "Smith",
        ZIP: 32220,
        CurrentDealer: "Pacific",
    },
    {
        REGID: 1,
        Name: "John",
        Email: "Doe",
        Address: "Smith",
        ZIP: 3333440,
        CurrentDealer: "Pacific",
    },
    {
        REGID: 1,
        Name: "John",
        Email: "Doe",
        Address: "Smith",
        ZIP: 3550,
        CurrentDealer: "Pacific",
    },
];
const RegisteredUsers = () => {
    const columns = useMemo(
        () => [
            {
                accessorKey: 'REGID',
                enableColumnFilterModes: false,
                filterFn: 'equals',
                header: 'REGID',
            },
            {
                accessorKey: 'Name',
                header: 'Name',
            },
            {
                accessorKey: 'Email',
                header: 'Email',
            },
            {
                accessorKey: 'Address',
                header: 'Address',
            },
            {
                accessorKey: 'ZIP',
                header: 'ZIP',
            },
            {
                accessorKey: 'CurrentDealer',
                header: 'Current Dealer',
            },
        ],
        [],
    );

    const table = useMaterialReactTable({
        columns,
        data,
        enableColumnFilterModes: false,
        enableDensityToggle: false,
        enableFullScreenToggle: false,
        enableGlobalFilter: true,
        // enableColumnFilters:false,
        enableHiding: false,
        enableColumnActions: false,
         enableSorting: false,
        initialState: { showColumnFilters: true, showGlobalFilter: true },
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
