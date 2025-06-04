import React, { useRef, useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Button,
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
import { PrimaryButton } from '@/app/components/Buttons';
import ZoningPrintView from './ZoningPrintView';
import GhostPostPopup from './GhostPostPopup';

export function ZoningTable(props: { zoningData: string }) {
  const { address, coordinates, zoningCode, zoningInfo } = JSON.parse(props.zoningData);
  const { Name, ...categories } = zoningInfo;

  const pdfRef = useRef<HTMLDivElement>(null);
  const [ghostPopupOpen, setGhostPopupOpen] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState('');

  // Function to convert use names to URL-friendly slugs
  const convertToSlug = (useName: string): string => {
    return useName
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters except spaces and hyphens
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .trim();
  };

  const handleRowClick = (useName: string) => {
    const slug = convertToSlug(useName);
    setSelectedSlug(slug);
    setGhostPopupOpen(true);
  };

  const handleClosePopup = () => {
    setGhostPopupOpen(false);
    setSelectedSlug('');
  };

  async function downloadPDF() {
    if (!pdfRef.current) return;

    const html2pdf = (await import('html2pdf.js')).default;

    const opt = {
      margin: 0.3,
      filename: `zoning-info-${zoningCode}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(pdfRef.current).save();
  }

  return (
    <div style={{ padding: '1rem', maxWidth: '1500px', margin: '0 auto', marginBottom: 100 }}>
      <Box display="flex" justifyContent="center" mb={2}>
        <PrimaryButton onClick={downloadPDF}>
          Download PDF
        </PrimaryButton>
      </Box>

      <div ref={pdfRef}>
        <Typography variant="h5" gutterBottom>Address Information</Typography>
        {renderTable({
          Address: address,
          Latitude: coordinates.lat,
          Longitude: coordinates.lon,
          'Zoning Code': zoningCode,
          'Zoning Name': Name
        }, ["Detail", "Value"], false, handleRowClick)}

        <Box height={35}></Box>

        <Typography variant="h5" gutterBottom>Zoning Details</Typography>
        {
          Object.keys(categories).length === 0
            ? emptyDetails()
            : zoningDetails(categories, Name, handleRowClick)
        }
      </div>
      
      <div style={{ display: 'none' }}>
        <ZoningPrintView
          ref={pdfRef}
          address={address}
          coordinates={coordinates}
          zoningCode={zoningCode}
          zoningInfo={zoningInfo}
        />
      </div>

      {/* Ghost Post Popup */}
      <GhostPostPopup
        open={ghostPopupOpen}
        onClose={handleClosePopup}
        slug={selectedSlug}
        maxWidth="lg"
        fullWidth={true}
      />
    </div>
  );
};

export default ZoningTable;

const zoningDetails = (categories: any, Name: string, onRowClick: (useName: string) => void) => {
  return (
    <div>{Object.entries(categories).map(([category, uses]) => (
      <Accordion key={category} disableGutters sx={{
        mb: 1,
        '& .MuiAccordionSummary-content': { margin: 0 },
        '& .MuiAccordionDetails-root': { paddingTop: 0.25, paddingBottom: 0.25 },
      }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ '&:hover': { backgroundColor: '#4caf50' }, }}>
          <Typography variant="subtitle1" fontWeight="bold">{category.toLocaleLowerCase() == "residential" ? Name : category}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {renderTable(uses, undefined, true, onRowClick)}
        </AccordionDetails>
      </Accordion>
    ))}
    </div>
  );
}

const emptyDetails = () => {
  return (
    <div>
      No zoning details available.
    </div>
  );
}

const renderTable = (
  data: any, 
  columnLabels = ["Use", "Status"], 
  enableRowClick = false, 
  onRowClick?: (useName: string) => void
) => {
  return (
    <TableContainer component={Paper} sx={{ marginY: 1 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ backgroundColor: '#4caf50', color: "white" }}>
              <strong>{columnLabels[0]}</strong>
            </TableCell>
            <TableCell sx={{ backgroundColor: '#4caf50', color: "white" }}>
              <strong>{columnLabels[1]}</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(data).map(([key, value]) => {
            if (typeof value === 'object') {
              return Object.entries(value).map(([subKey, subValue]) => (
                <TableRow 
                  key={`${key}-${subKey}`}
                  onClick={enableRowClick && onRowClick ? () => onRowClick(`${key} ${subKey}`) : undefined}
                  sx={enableRowClick ? {
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: '#f5f5f5',
                    }
                  } : {}}
                >
                  <TableCell>{`${key} - ${subKey}`}</TableCell>
                  <TableCell>{subValue}</TableCell>
                </TableRow>
              ));
            }
            if (value) {
              return (
                <TableRow 
                  key={key}
                  onClick={enableRowClick && onRowClick ? () => onRowClick(key) : undefined}
                  sx={enableRowClick ? {
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: '#f5f5f5',
                    }
                  } : {}}
                >
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