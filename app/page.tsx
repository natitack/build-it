'use client';

import { Box, Button, Typography, Stack, ButtonProps } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react';
import { BuiltItLogo } from './components/BuiltItLogo';
import { PrimaryButton, TextButton } from './components/Buttons';

export default function HomePage() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/questionnaire');
  };

  const handleLogIn = () => {
    router.push('/log-in');
  };

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
        <BuiltItLogo width={600} height={250} />
      </Stack>

      {/* Button Row */}
      <Stack direction="row" spacing={2} mb={10}>
        <PrimaryButton onClick={handleGetStarted}>
          Get Started
        </PrimaryButton>

        <TextButton onClick={handleLogIn}>
          Log in
        </TextButton>
      </Stack>

      {/* Footer CTA */}
      <Typography variant="body1" gutterBottom>
        {"Interested in partnering with us? We'd love to hear from you!"}
      </Typography>

      <PrimaryButton size="medium">
        Contact Us
      </PrimaryButton>
    </Box>
  );
}
