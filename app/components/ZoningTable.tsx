import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
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
      <div>
        <Typography variant="h5" gutterBottom>Address Information</Typography>
        {renderTable({
          Address: address,
          Latitude: coordinates.lat,
          Longitude: coordinates.lon,
          'Zoning Code': zoningCode,
          'Zoning Name': Name
        })}
  
        <Typography variant="h5" gutterBottom>Zoning Details</Typography>
        {Object.entries(categories).map(([category, uses]) => (
          <Accordion key={category} defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">{category}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {renderTable(uses)}
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    );
  };
  export default ZoningTable;

  const renderTable = (data: any) => {
    return (
      <TableContainer component={Paper} sx={{ marginY: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell><strong>Use</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
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
              return (
                <TableRow key={key}>
                  <TableCell>{key}</TableCell>
                  <TableCell>{value.toString()}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };