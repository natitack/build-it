// app/components/Nav.tsx
import { AppBar, Box, Toolbar } from '@mui/material';
import Link from 'next/link';
import { BuiltItLogo } from './BuiltItLogo';

// This is our navigation bar at the top of the website.
export default function Nav() {
  return (
    <AppBar position="static" color="default" elevation={1} sx={{ backgroundColor: '#e8f5e9' }}>
      <Toolbar sx={{ minHeight: '64px !important' }}>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Box
              sx={{
                transform: 'scale(1.3)',       // Scale the logo up
                transformOrigin: 'left center', // Anchor the scale to the left
                height: '70px',                 // Restrict height so toolbar stays stable
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <BuiltItLogo height={75} width={175}/>
            </Box>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
