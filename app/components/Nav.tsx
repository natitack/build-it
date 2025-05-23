// app/components/Nav.tsx
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
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
        
        <Box sx={{flexGrow: 15}}>
          <Link href="/dashboard" style={{color: "black", textDecoration: 'none'}}>
            <Typography
                variant="h6"
                noWrap
                sx={{
                mr: 2,
                fontWeight: 400,
                
                }}
            >
                Dashboard
            </Typography>
        </Link>
        </Box>

        <Box>
          <Button
            variant="outlined"
            href="/auth/logout"
            sx={{
              color: 'black',
              borderColor: 'black',
              '&:hover': {
                backgroundColor: '#f5f5f5',
                borderColor: 'black',
              },
            }}
          >
            Log Out
          </Button>
        </Box>

      </Toolbar>
    </AppBar>
  );
}
