import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export function ZoningTable(props: {zoningData: string}) {
    const { address, coordinates, zoningCode, zoningInfo } = JSON.parse(props.zoningData);
    const { Name, ...categories } = zoningInfo;
  
    return (
      <div style={{ padding: '1rem', maxWidth: '1500px', margin: '0 auto', marginBottom: 100 }}>
        <Typography variant="h5" gutterBottom>Address Information</Typography>
        {renderTable({
          Address: address,
          Latitude: coordinates.lat,
          Longitude: coordinates.lon,
          'Zoning Code': zoningCode,
          'Zoning Name': Name
        }, ["Detail", "Value"])}

        <Box height={35}></Box>
  
        <Typography variant="h5" gutterBottom>Zoning Details</Typography>
        {
          Object.keys(categories).length === 0
          ? emptyDetails()
          : zoningDetails(categories, Name)
        }
      </div>
    );
  };
  export default ZoningTable;

  const zoningDetails = (categories: any, Name: string) => {
    return (
      <div>{Object.entries(categories).map(([category, uses]) => (
        <Accordion key={category} disableGutters sx={{ 
            mb: 1,
            '& .MuiAccordionSummary-content': { margin: 0 }, 
            '& .MuiAccordionDetails-root': { paddingTop: 0.25, paddingBottom: 0.25 },
          }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{'&:hover': { backgroundColor: '#4caf50' }, }}>
            <Typography variant="subtitle1" fontWeight="bold">{category.toLocaleLowerCase() == "residential" ? Name : category}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {renderTable(uses)}
          </AccordionDetails>
        </Accordion>
      ))}
      </div>
    );
  }

  const emptyDetails = () => {
    return (
      <div>
        No zoning details avaliable.
      </div>
    );
  }

  const renderTable = (data: any, columnLabels=["Use", "Status"]) => {
    return (
      <TableContainer component={Paper} sx={{ marginY: 1 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: '#4caf50', color: "white" }}><strong>{columnLabels[0]}</strong></TableCell>
              <TableCell sx={{ backgroundColor: '#4caf50', color: "white" }}><strong>{columnLabels[1]}</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(data).map(([key, value]) => {
              if (typeof value === 'object') {
                return Object.entries(value).map(([subKey, subValue]) => (
                  <TableRow key={`${key}-${subKey}`}>
                    <TableCell>{`${key} - ${subKey}`}</TableCell>
                    <TableCell>{subValue}</TableCell>
                  </TableRow>
                ));
              }
              if (value) {
                return (
                  <TableRow key={key}>
                    <TableCell>{key}</TableCell>
                    <TableCell>{value.toString()}</TableCell>
                  </TableRow>
                );
              }
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };