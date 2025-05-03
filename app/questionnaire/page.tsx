'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ZoningTable from '../components/ZoningTable';
import { Box, CircularProgress } from '@mui/material';

export default function QuestionnairePage() {
  const [address, setAddress] = useState('');
  const [sewerConnected, setSewerConnected] = useState('');
  const [hoa, setHoa] = useState('');
  const [zoningResult, setZoningResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

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

  const addressInput = (
    <label>
      <span >Your Street Address</span>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="123 Main St"
        required
      />
    </label>
  );

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
    <main>
      <h1>Property Questionnaire</h1>
      <Box position="relative">
        <form onSubmit={handleSubmit}>
          <div>{addressInput}</div>
          {/* <div>{sewerInput}</div>
          <div>{hoaInput}</div> */}
          <button type="submit">
            Submit
          </button>
        </form>
  
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
            sx={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', zIndex: 1 }}
          >
            <CircularProgress />
          </Box>
        )}
      </Box>
  
      {zoningResult && (
        <div style={{ padding: '30px' }}>
          <h2>Zoning Information</h2>
          <ZoningTable zoningData={JSON.stringify(zoningResult, null, 2)} />
        </div>
      )}
    </main>
  );
}
