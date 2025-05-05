// components/Buttons.tsx
'use client';
import { Button, ButtonProps } from '@mui/material';

export const PrimaryButton = (props: ButtonProps) => (
  <Button
    variant="contained"
    size="large"
    sx={{
      backgroundColor: '#4caf50',
      color: '#fff',
      textTransform: 'none',
      boxShadow: 2,
      '&:hover': {
        backgroundColor: '#43a047',
      },
    }}
    {...props}
  />
);

export const TextButton = (props: ButtonProps) => (
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
    {...props}
  />
);
