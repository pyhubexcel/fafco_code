import { useMemo } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import { Box, Card, Stack, TextField, Typography } from '@mui/material';
import CustomButton from '../ui/CustomButton';
import InnerTable from './InnerTable';
import EditIcon from '@mui/icons-material/Edit';

const data = [
    {
        id: 1,
        RMAID: 'RMA001',
        RepairDate: '2024-04-28',
        Status: 'In Progress',
        Dealer: 'ABC123',
        address: '123 Main St',
    },
    {
        id: 2,
        RMAID: 'RMA002',
        RepairDate: '2024-04-29',
        Status: 'Pending',
        Dealer: 'DEF456',
        address: '456 Elm St',
    },
    {
        id: 3,
        RMAID: 'RMA003',
        RepairDate: '2024-04-30',
        Status: 'Completed',
        Dealer: 'GHI789',
        address: '789 Oak St',
    },
    {
        id: 4,
        RMAID: 'RMA004',
        RepairDate: '2024-05-01',
        Status: 'In Progress',
        Dealer: 'JKL012',
        address: '012 Pine St',
    }
];



const ViewRegistrationComp = () => {
    const columns = useMemo(
        () => [
            {
                accessorKey: 'actionButtons',
                header: '#',
                size: 50,
                Cell: ({ row }) => (
                    <div className='flex gap-4'>
                      <CustomButton buttonName='Edit' variant="text" buttonIcon={<EditIcon />}></CustomButton>
                    </div>
                  ),
            },
            {
                accessorKey: 'RMAID',
                header: 'RMAID',
            },
            {
                accessorKey: 'RepairDate',
                header: 'Repair Date',
            },
            {
                accessorKey: 'Status',
                header: 'Status',
            },
            {
                accessorKey: 'Dealer',
                header: 'Dealer Ref#',
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
        showGlobalFilter: false,
        initialState: { showColumnFilters: false },
        enableExpandAll: false, //disable expand all button
        muiDetailPanelProps: () => ({
            sx: (theme) => ({
                backgroundColor:
                    theme.palette.mode === 'dark'
                        ? 'rgba(255,210,244,0.1)'
                        : 'rgba(0,0,0,0.1)',
            }),
        }),
        //custom expand button rotation
        muiExpandButtonProps: ({ row, table }) => ({
            onClick: () => table.setExpanded({ [row.id]: !row.getIsExpanded() }), //only 1 detail panel open at a time
            sx: {
                transform: row.getIsExpanded() ? 'rotate(180deg)' : 'rotate(-90deg)',
                transition: 'transform 0.2s',
            },
        }),
        //conditionally render detail panel
        renderDetailPanel: ({ row }) =>
            row.original.address ? (
                <Stack gap={2}>
                    <Card sx={{ padding: '10px' }}>
                        <Box sx={{ display: 'flex', justifyContent: "space-around" }}>
                            <Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '15px', m: '5px' }}>
                                    <Typography>Date Submitted:</Typography>
                                    <TextField type='date' sx={{ width: 300 }} size="small"/>
                                </Box>


                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '15px', m: '5px' }}>
                                    <Typography>Dealer Comment:</Typography>
                                    <TextField
                                        type='text'
                                        // onBlur={handleBlur}
                                        // onChange={handleChange}
                                        // value={values.email}
                                        name='email'
                                        id="outlined-size-small"
                                        sx={{ width: 300 }}
                                        // label='Jim & Joan Smith'
                                        value='none'
                                        size="small"
                                    />
                                </Box>


                                {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '5px', m: '5px' }}>
                                    <Typography>Dealer Ref#:</Typography>
                                    <TextField
                                        type='text'
                                        // onBlur={handleBlur}
                                        // onChange={handleChange}
                                        // value={values.email}
                                        name='email'
                                        id="outlined-size-small"
                                        sx={{ width: 300 }}
                                        label='Jim & Joan Smith'
                                        size="small"
                                    />
                                </Box> */}
                            </Box>
                            <Box>
                                <Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '15px', m: '5px' }}>
                                        <Typography>Date Shipped:</Typography>
                                        <TextField type='date' sx={{ width: 300 }} size="small"/>
                                    </Box>

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '15px', m: '5px' }}>
                                        <Typography>Sales Support Note:</Typography>
                                        <TextField
                                            type='text'
                                            // onBlur={handleBlur}
                                            // onChange={handleChange}
                                            // value={values.email}
                                            name='name'
                                            id="outlined-size-small"
                                            sx={{ width: 300 }}
                                            // label='Jim & Joan Smith'
                                            size="small"
                                            value='none'
                                        />
                                    </Box>


                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", float: 'right', gap: '5px' }}>
                            <CustomButton
                                buttonName='Update'
                                type="submit"
                            />
                            <CustomButton
                                buttonName='Cancel'
                                type="submit"
                            />
                        </Box>
                    </Card>
                    <Box margin={3}>
                        <InnerTable />
                    </Box>

                </Stack>
            ) : null,
    });

    return <MaterialReactTable table={table} />;
};

export default ViewRegistrationComp;
