'use client';

import { Box, Button, Typography, Stack, ButtonProps } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { BuiltItLogo } from './components/BuiltItLogo';
import { PrimaryButton, TextButton } from './components/Buttons';
import GhostPostPopup from './components/GhostPostPopup';

export default function HomePage() {
  const router = useRouter();
  const [postPopupOpen, setPostPopupOpen] = useState(false);

  const handleGetStarted = () => {
    router.push('/auth/login?returnTo=/questionnaire');
  };

  const handleOpenPost = () => {
    setPostPopupOpen(true);
  };

  const handleClosePost = () => {
    setPostPopupOpen(false);
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
        {/* <TextButton onClick={handleOpenPost}>
          Learn More
        </TextButton> */}
      </Stack>

      {/* Footer CTA */}
      {/* <Typography variant="body1" gutterBottom>
        {"Interested in partnering with us? We'd love to hear from you!"}
      </Typography> */}

      {/* <PrimaryButton size="medium">
        Contact Us
      </PrimaryButton> */}

      {/* Ghost Post Popup */}
      <GhostPostPopup
        open={postPopupOpen}
        onClose={handleClosePost}
        slug="this-is-a-test-post" // Replace with your actual post slug
        maxWidth="md"
      />
    </Box>
  );
}