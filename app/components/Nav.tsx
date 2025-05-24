import { AppBar, Box, Button, Toolbar } from '@mui/material';
import Link from 'next/link';
import { BuiltItLogo } from './BuiltItLogo';

export default function Nav() {
  return (
    <AppBar position="static" color="default" elevation={1} sx={{ backgroundColor: '#e8f5e9' }}>
      <Toolbar sx={{ minHeight: '64px !important', display: 'flex', alignItems: 'center' }}>
        
        {/* Container for logo + links with flexGrow */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1 }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Box
              sx={{
                flexShrink: 0,               // Prevent shrinking
                width: 175,                 // Fixed width matching logo size
                height: 70,                 // Fixed height
                display: 'flex',
                alignItems: 'center',
                // Removed transform: scale() for safer sizing
              }}
            >
              <BuiltItLogo height={70} width={175} />
            </Box>
          </Link>

          {/* Navigation links right next to the logo with margin-left */}
          <Box sx={{ display: 'flex', gap: 2, ml: 2 }}>
            <Button color="inherit" href="/questionnaire">
              New Report
            </Button>
            <Button color="inherit" href="/dashboard">
              Dashboard
            </Button>
          </Box>
        </Box>

        {/* Logout button on the far right */}
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
