// import { useMemo} from "react";
// import { MRT_Table, useMaterialReactTable } from "material-react-table";
// import {IconButton, Typography } from "@mui/material";
// import { Visibility } from "@mui/icons-material";

// export const ClaimsTable = ({ data,handleClaimViewParts }) => {

//   const columns = useMemo(
//     () => [
//       {
//         accessorKey: "documents",
//         header: "Uploaded photos",
//         size: 150,
//         Cell: ({ row }) => (
//           <IconButton
//           onClick={() =>
//             handleClaimViewParts(row.original)
//           }
//             sx={{ display: "flex", alignItems: "center" ,color:'#1976D2'}}
//           >
//             <Visibility />
//             <Typography variant="body2" sx={{ ml: 1,color:'#1976D2' }}  >
//               View
//             </Typography>
//           </IconButton>
//         ),
//       },
//       // {
//       //   accessorKey: "regid",
//       //   header: "Reg Id",
//       //   size: 100,
//       // },
//       {
//         accessorKey: "part_id",
//         header: "Part Id",
//         size: 100,
//       },
//       {
//         accessorKey: "ramid",
//         header: "Rma Id",
//         size: 100,
//       },
//       {
//         accessorKey: "action",
//         header: "Action",
//         size: 100,
//       },
//       {
//         accessorKey: "problem",
//         header: "Problem",
//         size: 100,
//       },
//       // {
//       //   accessorKey: "status",
//       //   header: "Status",
//       //   size: 100,
//       // },
//       {
//         accessorKey: "add_comment",
//         header: "Comments",
//         size: 300,
//       },
//     ],
//     []
//   );

//   const table = useMaterialReactTable({
//     columns,
//     data,
//     enableColumnActions: false,
//     enableColumnFilters: false,
//     enablePagination: false,
//     enableSorting: false,
//     mrtTheme: (theme) => ({
//       baseBackgroundColor: theme.palette.background.default,
//     }),
//     muiTableBodyRowProps: { hover: true },
//     muiTableProps: {
//       sx: {
//         border: "1px solid rgba(81, 81, 81, .5)",
//         caption: {
//           captionSide: "top",
//         },
//       },
//     },
//     muiTableHeadCellProps: {
//       sx: {
//         border: "1px solid rgba(81, 81, 81, .5)",
//         fontWeight: "bold",
//         bgcolor: "lightgrey",
//         py: "5px",
//         // px :'5px',
//       },
//     },
//     muiTableBodyCellProps: {
//       sx: {
//         border: "1px solid rgba(81, 81, 81, .5)",
//         py: "2px",
//         // px :'5px',
//       },
//     },
//   });

//   return <MRT_Table table={table} />;
// };

// export default ClaimsTable;


// import React, { useState, useMemo } from 'react';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import Grid from '@mui/material/Grid';
// import { Visibility, ExpandMore, ExpandLess } from '@mui/icons-material';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';

// export const ClaimsTable = ({ data, handleClaimViewParts }) => {
//   const [expandedPartId, setExpandedPartId] = useState(null);

//   const columns = useMemo(
//     () => [
//       {
//         accessorKey: 'part_id',
//         header: 'Part Id',
//         size: 100,
//         Cell: ({ row }) => (
//           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//             <IconButton
//               onClick={() => {
//                 const newPartId = row.original.part_id;
//                 setExpandedPartId(expandedPartId === newPartId ? null : newPartId);
//               }}
//               sx={{ color: '#1976D2' }}
//             >
//               {expandedPartId === row.original.part_id ? <ExpandLess /> : <ExpandMore />}
//             </IconButton>
//             <Typography
//               onClick={() => {
//                 const newPartId = row.original.part_id;
//                 setExpandedPartId(expandedPartId === newPartId ? null : newPartId);
//               }}
//               sx={{ cursor: 'pointer', color: '#1976D2', ml: 1, fontWeight: 'bold' }}
//             >
//               {row.original.part_id}
//             </Typography>
//           </Box>
//         ),
//       },
//       {
//         accessorKey: 'repair_date',
//         header: 'Repair Date',
//         size: 150,
//       },
//       {
//         accessorKey: 'status',
//         header: 'Status',
//         size: 100,
//       },
//     ],
//     [expandedPartId]
//   );

//   const renderExpandedRowDetails = (row) => {
//     if (row.part_id === expandedPartId) {
//       return (
//         <Box sx={{ padding: 2, border: '1px solid rgba(81, 81, 81, .5)', mt: 1, bgcolor: '#f9f9f9', borderRadius: '4px', boxShadow: 1 }}>
//           <Grid container spacing={2} key={row.part_id}>
//             <Grid item xs={12}>
//               <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Claim Details</Typography>
//             </Grid>
//             <Grid item xs={2}>
//               <Typography variant="body1" sx={{ marginBottom: '10px', fontWeight: 'bold' }}><strong>Uploaded Photo:</strong></Typography>
//               <IconButton
//                 onClick={() => handleClaimViewParts(row)}
//                 sx={{ display: 'flex', alignItems: 'center', color: '#1976D2' }}
//               >
//                 <Visibility />
//                 <Typography variant="body2" sx={{ ml: 1, color: '#1976D2' }}>
//                   View
//                 </Typography>
//               </IconButton>
//             </Grid>
//             <Grid item xs={2}>
//               <Typography variant="body1" sx={{ marginBottom: '10px', fontWeight: 'bold' }}><strong>Part ID:</strong></Typography>
//               <Typography variant="body1">{row.part_id}</Typography>
//             </Grid>
//             <Grid item xs={2}>
//               <Typography variant="body1" sx={{ marginBottom: '10px', fontWeight: 'bold' }}><strong>Action:</strong></Typography>
//               <Typography variant="body1">{row.action}</Typography>
//             </Grid>
//             <Grid item xs={3}>
//               <Typography variant="body1" sx={{ marginBottom: '10px', fontWeight: 'bold' }}><strong>Problem:</strong></Typography>
//               <Typography variant="body1">{row.problem}</Typography>
//             </Grid>
//             <Grid item xs={3}>
//               <Typography variant="body1" sx={{ marginBottom: '10px', fontWeight: 'bold' }}><strong>Comments:</strong></Typography>
//               <Typography variant="body1">{row.add_comment}</Typography>
//             </Grid>
//           </Grid>
//         </Box>
//       );
//     }
//     return null;
//   };

//   return (
//     <Box sx={{ border: '1px solid rgba(81, 81, 81, .5)', borderRadius: '4px', boxShadow: 1 }}>
//       <TableContainer component={Paper}>
//         <Table aria-label="claims table">
//           <TableHead sx={{ bgcolor: '#1976D2' }}>
//             <TableRow>
//               <TableCell />
//               <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Part Id</TableCell>
//               <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Repair Date</TableCell>
//               <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Status</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {data.map((row) => (
//               <React.Fragment key={row.part_id}>
//                 <TableRow
//                   sx={{ '&:hover': { bgcolor: '#f1f1f1' } }}
//                 >
//                   <TableCell>
//                     <IconButton
//                       onClick={() => {
//                         const newPartId = row.part_id;
//                         setExpandedPartId(expandedPartId === newPartId ? null : newPartId);
//                       }}
//                       sx={{ color: '#1976D2' }}
//                     >
//                       {expandedPartId === row.part_id ? <ExpandLess /> : <ExpandMore />}
//                     </IconButton>
//                   </TableCell>
//                   <TableCell>{row.part_id}</TableCell>
//                   <TableCell>{row.repair_date}</TableCell>
//                   <TableCell>{row.status}</TableCell>
//                 </TableRow>
//                 {expandedPartId === row.part_id && (
//                   <TableRow>
//                     <TableCell colSpan={4}>
//                       {renderExpandedRowDetails(row)}
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </React.Fragment>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// };

// export default ClaimsTable;

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import { Visibility, ExpandMore, ExpandLess, Edit, Undo } from '@mui/icons-material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from "js-cookie";
import axiosInstance from '../../utils/axios';

// Status mapping
const statusLabels = {
  0: 'Received',
  1: 'Submitted',
  2: 'Verified',
  3: 'Processed',
  6: 'Credited',
  7: 'DENIED',
  99: 'VOIDED',
};

export const ClaimsTable = ({ data, handleClaimViewParts }) => {
  const [expandedPartId, setExpandedPartId] = useState(null);
  const [isEditing, setIsEditing] = useState(null);
  const [repairDate, setRepairDate] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [isSaveDisabled, setIsSaveDisabled] = useState(false); // State to disable save button
  const token = Cookies.get("token");

  // Function to handle edit click
  const handleEditClick = (row) => {
    setIsEditing(row.part_id);
    setRepairDate(row.repair_date);
    setIsSaveDisabled(false); // Enable save button on edit click
  };

  // Function to handle save click
  const handleSaveClick = async (row) => {
    setIsSaveDisabled(true); // Disable save button to prevent multiple clicks

    try {
      const response = await axiosInstance.patch(
        `api/parts/part-details/${row.part_id}`,
        { repair_date: repairDate },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

    

      if (response.status === 200) {
        toast.success('Successfully updated repair date!'); // Show success notification
        setIsEditing(null); // Exit edit mode
        setIsSaveDisabled(true); // Disable save button after successful update
        // Optionally, update the local state to reflect the new repair date
        row.repair_date = repairDate;
      }
    } catch (error) {
      toast.error('Failed to update repair date. Please try again.'); // Show error notification
      console.error('Failed to update repair date:', error);
      setIsSaveDisabled(false); // Re-enable save button if error occurs
    }
  };

  // Function to handle UnVoid click
  const handleUnVoidClick = (row) => {
    if (row.status === 99) {
      // Set status to 0 (Received) and dateEntered to current date
      row.status = 0;
      row.dateEntered = new Date().toISOString().split('T')[0];
      toast.info('Claim unvoided successfully.'); // Show info notification
      console.log('Unvoided claim:', row);
    }
  };

  const renderExpandedRowDetails = (row) => {
    if (row.part_id === expandedPartId) {
      return (
        <Box
          sx={{
            padding: 2,
            border: '1px solid rgba(81, 81, 81, .5)',
            mt: 1,
            bgcolor: '#f9f9f9',
            borderRadius: '4px',
            boxShadow: 1,
          }}
        >
          <Grid container spacing={2} key={row.part_id}>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Claim Details
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body1" sx={{ marginBottom: '10px', fontWeight: 'bold' }}>
                <strong>Uploaded Photo:</strong>
              </Typography>
              <IconButton
                onClick={() => handleClaimViewParts(row)}
                sx={{ display: 'flex', alignItems: 'center', color: '#1976D2' }}
              >
                <Visibility />
                <Typography variant="body2" sx={{ ml: 1, color: '#1976D2' }}>
                  View
                </Typography>
              </IconButton>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="body1" sx={{ marginBottom: '10px', fontWeight: 'bold' }}>
                <strong>Part#</strong>
              </Typography>
              <Typography variant="body1">{row.part_id}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body1" sx={{ marginBottom: '10px', fontWeight: 'bold' }}>
                <strong>Part Description:</strong>
              </Typography>
              <Typography variant="body1">{row.part_description}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body1" sx={{ marginBottom: '10px', fontWeight: 'bold' }}>
                <strong>Action:</strong>
              </Typography>
              <Typography variant="body1">{row.action}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body1" sx={{ marginBottom: '10px', fontWeight: 'bold' }}>
                <strong>Problem:</strong>
              </Typography>
              <Typography variant="body1">{row.problem}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body1" sx={{ marginBottom: '10px', fontWeight: 'bold' }}>
                <strong>Comments:</strong>
              </Typography>
              <Typography variant="body1">{row.add_comment}</Typography>
            </Grid>
          </Grid>
        </Box>
      );
    }
    return null;
  };

  return (
    <Box
      sx={{
        border: '1px solid rgba(81, 81, 81, .5)',
        borderRadius: '4px',
        boxShadow: 1,
      }}
    >
      <ToastContainer /> {/* Add ToastContainer to render toasts */}
      <TableContainer component={Paper}>
        <Table aria-label="claims table">
          <TableHead sx={{ bgcolor: '#1976D2' }}>
            <TableRow>
              <TableCell />
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>RMAID</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Repair Date</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <React.Fragment key={row.part_id}>
                <TableRow sx={{ '&:hover': { bgcolor: '#f1f1f1' } }}>
                  <TableCell>
                    <IconButton
                      onClick={() => {
                        const newPartId = row.part_id;
                        setExpandedPartId(
                          expandedPartId === newPartId ? null : newPartId
                        );
                      }}
                      sx={{ color: '#1976D2' }}
                    >
                      {expandedPartId === row.part_id ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                  </TableCell>
                  <TableCell>{row.ramid}</TableCell>
                  <TableCell>
                    {isEditing === row.part_id ? (
                      <TextField
                        variant="standard"
                        value={repairDate}
                        onChange={(e) => setRepairDate(e.target.value)}
                      />
                    ) : (
                      row.repair_date
                    )}
                  </TableCell>
                  <TableCell>{statusLabels[row.status]}</TableCell>
                  <TableCell>
                    {row.status === 99 ? (
                      <IconButton
                        onClick={() => handleUnVoidClick(row)}
                        sx={{ color: '#1976D2' }}
                      >
                        <Undo />
                      </IconButton>
                    ) : (
                      <>
                        {isEditing === row.part_id ? (
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={() => handleSaveClick(row)}
                            disabled={isSaveDisabled} // Disable save button when needed
                          >
                            Save
                          </Button>
                        ) : (
                          <IconButton
                            onClick={() => handleEditClick(row)}
                            sx={{ color: '#1976D2' }}
                          >
                            <Edit />
                            <Typography variant="body2" sx={{ ml: 1 }}>
            Edit
          </Typography>
                          </IconButton>
                        )}
                      </>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={5}>{renderExpandedRowDetails(row)}</TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};




export default ClaimsTable;