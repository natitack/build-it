'use client';

import { Box, Button, Typography, Stack } from '@mui/material';
import Image from 'next/image';
import React from 'react';

export default function HomePage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f7fdf5',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
      }}
    >
      {/* Logo Section */}
      <Stack direction="row" spacing={4} alignItems="center" mb={6}>
        <Image
          src="/logo.png"
          alt="Build-It Inc. Logo"
          width={550}
          height={250}
        />
      </Stack>

      {/* Button Row */}
      <Stack direction="row" spacing={2} mb={10}>
        <Button
          variant="contained"
          size="large"
          sx={{
            backgroundColor: '#4caf50', // green
            color: '#fff',
            textTransform: 'none',
            boxShadow: 2,
            '&:hover': {
              backgroundColor: '#43a047',
            },
          }}
        >
          Get Started
        </Button>

        <Button
          variant="text"
          size="large"
          sx={{
            color: '#000',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: 'transparent',
              textDecoration: 'underline',
            },
          }}
        >
          Log in
        </Button>
      </Stack>

      {/* Footer CTA */}
      <Typography variant="body1" gutterBottom>
        Interested in partnering with us? We'd love to hear from you!
      </Typography>
      <Button
        variant="contained"
        size="medium"
        sx={{
          backgroundColor: '#4caf50',
          color: '#fff',
          textTransform: 'none',
          boxShadow: 2,
          '&:hover': {
            backgroundColor: '#43a047',
          },
        }}
      >
        Contact Us
      </Button>
    </Box>
  );
}
