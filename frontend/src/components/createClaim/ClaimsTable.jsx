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

import React, { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import { Visibility, ExpandMore, ExpandLess } from '@mui/icons-material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// Status mapping
const statusLabels = {
  0: 'Draft',
  1: 'Submitted',
  3: 'Pending',
  6: 'Credited',
  7: 'Denied',
  99: 'Voided',
};

export const ClaimsTable = ({ data, handleClaimViewParts }) => {
  const [expandedPartId, setExpandedPartId] = useState(null);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'part_id',
        header: 'Part Id',
        size: 100,
        Cell: ({ row }) => (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              onClick={() => {
                const newPartId = row.original.part_id;
                setExpandedPartId(expandedPartId === newPartId ? null : newPartId);
              }}
              sx={{ color: '#1976D2' }}
            >
              {expandedPartId === row.original.part_id ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
            <Typography
              onClick={() => {
                const newPartId = row.original.part_id;
                setExpandedPartId(expandedPartId === newPartId ? null : newPartId);
              }}
              sx={{ cursor: 'pointer', color: '#1976D2', ml: 1, fontWeight: 'bold' }}
            >
              {row.original.part_id}
            </Typography>
          </Box>
        ),
      },
      {
        accessorKey: 'repair_date',
        header: 'Repair Date',
        size: 150,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 100,
        Cell: ({ row }) => (
          <Typography>{statusLabels[row.original.status]}</Typography>
        ),
      },
    ],
    [expandedPartId]
  );

  const renderExpandedRowDetails = (row) => {
    if (row.part_id === expandedPartId) {
      return (
        <Box sx={{ padding: 2, border: '1px solid rgba(81, 81, 81, .5)', mt: 1, bgcolor: '#f9f9f9', borderRadius: '4px', boxShadow: 1 }}>
          <Grid container spacing={2} key={row.part_id}>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Claim Details</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body1" sx={{ marginBottom: '10px', fontWeight: 'bold' }}><strong>Uploaded Photo:</strong></Typography>
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
            <Grid item xs={2}>
              <Typography variant="body1" sx={{ marginBottom: '10px', fontWeight: 'bold' }}><strong>Part ID:</strong></Typography>
              <Typography variant="body1">{row.part_id}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body1" sx={{ marginBottom: '10px', fontWeight: 'bold' }}><strong>Action:</strong></Typography>
              <Typography variant="body1">{row.action}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body1" sx={{ marginBottom: '10px', fontWeight: 'bold' }}><strong>Problem:</strong></Typography>
              <Typography variant="body1">{row.problem}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body1" sx={{ marginBottom: '10px', fontWeight: 'bold' }}><strong>Comments:</strong></Typography>
              <Typography variant="body1">{row.add_comment}</Typography>
            </Grid>
          </Grid>
        </Box>
      );
    }
    return null;
  };

  return (
    <Box sx={{ border: '1px solid rgba(81, 81, 81, .5)', borderRadius: '4px', boxShadow: 1 }}>
      <TableContainer component={Paper}>
        <Table aria-label="claims table">
          <TableHead sx={{ bgcolor: '#1976D2' }}>
            <TableRow>
              <TableCell />
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Part Id</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Repair Date</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <React.Fragment key={row.part_id}>
                <TableRow
                  sx={{ '&:hover': { bgcolor: '#f1f1f1' } }}
                >
                  <TableCell>
                    <IconButton
                      onClick={() => {
                        const newPartId = row.part_id;
                        setExpandedPartId(expandedPartId === newPartId ? null : newPartId);
                      }}
                      sx={{ color: '#1976D2' }}
                    >
                      {expandedPartId === row.part_id ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                  </TableCell>
                  <TableCell>{row.part_id}</TableCell>
                  <TableCell>{row.repair_date}</TableCell>
                  <TableCell>{statusLabels[row.status]}</TableCell>
                </TableRow>
                {expandedPartId === row.part_id && (
                  <TableRow>
                    <TableCell colSpan={4}>
                      {renderExpandedRowDetails(row)}
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ClaimsTable;
