'use client';

import { useState } from 'react';
import ZoningTable from '../components/ZoningTable';
import { Box, CircularProgress, Stack, TextField, Typography } from '@mui/material';
import Nav from '../components/Nav';
import { PrimaryButton } from '../components/Buttons';

export default function QuestionnairePage() {
  const [address, setAddress] = useState('');
  const [sewerConnected, setSewerConnected] = useState('');
  const [hoa, setHoa] = useState('');
  const [zoningResult, setZoningResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/zoning', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'ERROR!')
      }
      setZoningResult(data)
      // router.push('/new-report');
    } catch (e: any) {
      alert('Error: ' + e.message)
    } finally {
      setLoading(false);
    }
  };

  const sewerInput = (
    <label >
      <span>Are you connected to sewer?</span>
      <select
        value={sewerConnected}
        onChange={(e) => setSewerConnected(e.target.value)}
        required
      >
        <option value="" disabled>Select one</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
    </label>
  );

  const hoaInput = (
    <label>
      <span >Do you have an HOA?</span>
      <select
        value={hoa}
        onChange={(e) => setHoa(e.target.value)}
        required
      >
        <option value="" disabled>Select one</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
    </label>
  );

  return (
    <Box sx={{ backgroundColor: '#f7fdf5', minHeight: '100vh' }}>
      <Nav />

      <Box
        sx={{
          maxWidth: 600,
          mx: 'auto',
          pt: 8,
          px: 2,
          position: 'relative',
        }}
      >

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <Stack spacing={5}>
            <Typography variant="h5" fontWeight="bold" textAlign="center">
              Enter your address below to find your zoning information!
            </Typography>

            <TextField
              label="Your Street Address"
              variant="outlined"
              fullWidth
              // size="small"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="123 Main St"
            />

            <PrimaryButton type="submit" fullWidth disabled={loading}>
              {loading ? 'Submitting...' : 'Submit'}
            </PrimaryButton>
          </Stack>
        </form>

        {/* Loading Overlay */}
        {loading && (
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', zIndex: 1 }}
          >
            <CircularProgress />
          </Box>
        )}
      </Box>

      {/* Zoning Result */}
      {zoningResult && (
        <Box maxWidth="md" mx="auto" py={6} px={2}>
          <ZoningTable zoningData={JSON.stringify(zoningResult, null, 2)} />
        </Box>
      )}
    </Box>
  );
}
