'use client';

import { Box, Button, Typography, Stack, ButtonProps } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

// Shared styles
const primaryButtonStyles = {
  backgroundColor: '#4caf50',
  color: '#fff',
  textTransform: 'none',
  boxShadow: 2,
  '&:hover': {
    backgroundColor: '#43a047',
  },
};

const textButtonStyles = {
  color: '#000',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: 'transparent',
    textDecoration: 'underline',
  },
};

// Reusable Button Components
function PrimaryButton(props: ButtonProps) {
  return (
    <Button
      variant="contained"
      size="large"
      sx={primaryButtonStyles}
      {...props}
    />
  );
}

function TextButton(props: ButtonProps) {
  return (
    <Button
      variant="text"
      size="large"
      sx={textButtonStyles}
      {...props}
    />
  );
}

export default function HomePage() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/questionnaire');
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
        <Image
          src="/logo.png"
          alt="Build-It Inc. Logo"
          width={600}
          height={250}
        />
      </Stack>

      {/* Button Row */}
      <Stack direction="row" spacing={2} mb={10}>
        <PrimaryButton onClick={handleGetStarted}>
          Get Started
        </PrimaryButton>

        <TextButton>
          Log in
        </TextButton>
      </Stack>

      {/* Footer CTA */}
      <Typography variant="body1" gutterBottom>
        Interested in partnering with us? We'd love to hear from you!
      </Typography>

      <PrimaryButton size="medium">
        Contact Us
      </PrimaryButton>
    </Box>
  );
}
