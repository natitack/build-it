// app/components/Nav.tsx
import { AppBar, Box, Toolbar } from '@mui/material';
import Link from 'next/link';
import { BuiltItLogo } from './BuiltItLogo';

// This is our navigation bar at the top of the website.
export default function Nav() {
  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <BuiltItLogo width={125} height={50} />
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
