import React, { forwardRef } from 'react';
import {
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';

const ZoningPrintView = forwardRef<HTMLDivElement, any>(
    function ZoningPrintViewComponent({ address, coordinates, zoningCode, zoningInfo }: any, ref) {
        const { Name, ...categories } = zoningInfo;

        return (
            <div ref={ref} style={{ padding: '1rem', maxWidth: '1500px', margin: '0 auto' }}>
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
                    Object.entries(categories).map(([category, uses]) => (
                        <div key={category}>
                            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                {category.toLowerCase() === "residential" ? Name : category}
                            </Typography>
                            {renderTable(uses)}
                            <Box height={15}></Box>
                        </div>
                    ))
                }
            </div>
        );
    }
);

export default ZoningPrintView;

const renderTable = (data: any, columnLabels = ["Use", "Status"]) => (
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
