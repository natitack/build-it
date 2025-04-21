'use client';

import { Box, Button, Typography, Stack } from '@mui/material';
import Image from 'next/image';
import React from 'react';

export default function HomePage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f7fdf5', // soft light green/white background
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
      }}
    >
      {/* Top Logo Section */}
      <Stack direction="row" spacing={4} alignItems="center" mb={6}>
        <Image
          src="/logo-with-house.png" // Replace with your actual image path
          alt="Build-It Inc. Logo"
          width={300}
          height={100}
        />
      </Stack>

      {/* Button Row */}
      <Stack direction="row" spacing={2} mb={10}>
        <Button variant="contained" color="success" size="large">
          Get Started
        </Button>
        <Button variant="text" size="large">
          Log in
        </Button>
      </Stack>

      {/* Footer CTA */}
      <Typography variant="body1" gutterBottom>
        Interested in partnering with us? We’d love to hear from you!
      </Typography>
      <Button variant="contained" color="success" size="medium">
        Contact Us
      </Button>
    </Box>
  );
}
