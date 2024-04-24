import { useMemo } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import { Box, Card, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import CustomButton from './ui/CustomButton';
import SimpleTable from './SimpleTable';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from 'dayjs';

const data = [
    {
        id: 1,
        firstName: 'John',
        middleName: 'Doe',
        lastName: 'Smith',
        address: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        country: 'USA',
    },
    {
        id: 2,
        firstName: 'Jane',
        middleName: 'Alice',
        lastName: 'Doe',
        address: '456 Elm St',
        city: 'Othertown',
        state: 'NY',
        country: 'USA',
    },
    // Add more dummy data as needed
];

const ViewRegistration = () => {
    const columns = useMemo(
        //column definitions...
        () => [
            {
                accessorKey: 'id',
                header: '#',
                size: 50,
            },
            {
                accessorKey: 'firstName',
                header: 'RMAID',
            },
            {
                accessorKey: 'middleName',
                header: 'Repair Date',
            },
            {
                accessorKey: 'lastName',
                header: 'Status',
            },
            {
                accessorKey: 'lastName',
                header: 'Dealer Ref#',
            },
        ],
        [],
        //end
    );

    const table = useMaterialReactTable({
        columns,
        data,
        enableColumnFilterModes: false,
        enableDensityToggle: false,
        enableFullScreenToggle: false,
        enableGlobalFilter: false,
        // enableColumnFilters:false,
        enableHiding: false,
        enableColumnActions: false,
        enableSorting: false,
        showGlobalFilter: false,
        initialState: { showColumnFilters: true },
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
                                    <Typography>Date Summited:</Typography>
                                    <FormControl sx={{ width: 300 }} size="small">
                                        <InputLabel id="demo-select-small-label">Date</InputLabel>
                                        <Select
                                            labelId="demo-select-small-label"
                                            id="demo-select-small"
                                            // value={age}
                                            label="Age"
                                        // onChange={handleChange}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem>
                                        </Select>
                                    </FormControl>
                                    {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DatePicker']}>
                                            <DatePicker label="Basic date picker" />
                                        </DemoContainer>
                                    </LocalizationProvider> */}
                                </Box>

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '15px', m: '5px' }}>
                                    <Typography>Installer: {row.original.city}</Typography>
                                    <FormControl sx={{ width: 300 }} size="small">
                                        <InputLabel id="demo-select-small-label">Date</InputLabel>
                                        <Select
                                            labelId="demo-select-small-label"
                                            id="demo-select-small"
                                            // value={age}
                                            label="Age"
                                        // onChange={handleChange}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem>
                                        </Select>
                                    </FormControl>
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
                                        label='Jim & Joan Smith'
                                        size="small"
                                    />
                                </Box>


                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '5px', m: '5px' }}>
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
                                </Box>
                            </Box>
                            <Box>
                                <Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '15px', m: '5px' }}>
                                        <Typography>Date Shipped:</Typography>
                                        <FormControl sx={{ width: 300 }} size="small">
                                            <InputLabel id="demo-select-small-label">Date</InputLabel>
                                            <Select
                                                labelId="demo-select-small-label"
                                                id="demo-select-small"
                                                // value={age}
                                                label="Age"
                                            // onChange={handleChange}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                                <MenuItem value={30}>Thirty</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '15px', m: '5px' }}>
                                        <Typography>Entered By: </Typography>
                                        <FormControl sx={{ width: 300 }} size="small">
                                            <InputLabel id="demo-select-small-label">Date</InputLabel>
                                            <Select
                                                labelId="demo-select-small-label"
                                                id="demo-select-small"
                                                // value={age}
                                                label="Age"
                                            // onChange={handleChange}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                                <MenuItem value={30}>Thirty</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '15px', m: '5px' }}>
                                        <Typography>Sales Support Note:</Typography>
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
                    <SimpleTable />
                </Stack>
            ) : null,
    });

    return <MaterialReactTable table={table} />;
};

export default ViewRegistration;
