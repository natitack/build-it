'use client';

import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  IconButton, 
  Box, 
  Typography,
  CircularProgress,
  useTheme,
  useMediaQuery
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from 'react';

interface GhostPost {
  id: string;
  title: string;
  html: string;
  excerpt: string;
  feature_image?: string;
  published_at: string;
}

interface GhostPostPopupProps {
  open: boolean;
  onClose: () => void;
  slug: string;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
}

export default function GhostPostPopup({ 
  open, 
  onClose, 
  slug, 
  maxWidth = 'md',
  fullWidth = true 
}: GhostPostPopupProps) {
  const [post, setPost] = useState<GhostPost | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (open && slug) {
      setLoading(true);
      setError(null);
      
      const fetchPost = async () => {
        try {
          const response = await fetch(`/api/posts/${slug}`);
          if (response.ok) {
            const postData = await response.json();
            setPost(postData);
          } else {
            setError('Post not found');
          }
        } catch (err) {
          console.error('Error fetching post:', err);
          setError('Failed to load post');
        } finally {
          setLoading(false);
        }
      };

      fetchPost();
    }
  }, [open, slug]);

  const handleClose = () => {
    onClose();
    // Reset state when closing
    setTimeout(() => {
      setPost(null);
      setError(null);
    }, 200);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      fullScreen={isMobile}
      scroll="paper"
      PaperProps={{
        sx: {
          borderRadius: isMobile ? 0 : 2,
          maxHeight: isMobile ? '100vh' : '90vh',
        }
      }}
    >
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {loading ? 'Loading...' : post?.title || 'Blog Post'}
        </Typography>
        <IconButton
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'grey.500',
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent
        sx={{
          p: 0,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {loading && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: 200,
              p: 3,
            }}
          >
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography color="error" variant="body1">
              {error}
            </Typography>
          </Box>
        )}

        {post && !loading && (
          <Box sx={{ p: 3 }}>
            {/* Feature Image */}
            {post.feature_image && (
              <Box sx={{ mb: 3 }}>
                <img
                  src={post.feature_image}
                  alt={post.title}
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: 8,
                    maxHeight: 300,
                    objectFit: 'cover',
                  }}
                />
              </Box>
            )}

            {/* Post Content */}
            <Box
              dangerouslySetInnerHTML={{ __html: post.html }}
              sx={{
                '& p': { 
                  mb: 2, 
                  lineHeight: 1.7,
                  fontSize: '1rem',
                },
                '& h1': { 
                  mt: 4, 
                  mb: 2, 
                  fontSize: '2rem',
                  fontWeight: 600,
                },
                '& h2': { 
                  mt: 3, 
                  mb: 2, 
                  fontSize: '1.5rem',
                  fontWeight: 600,
                },
                '& h3': { 
                  mt: 3, 
                  mb: 2, 
                  fontSize: '1.25rem',
                  fontWeight: 600,
                },
                '& ul, & ol': { 
                  mb: 2, 
                  pl: 3,
                  '& li': {
                    mb: 0.5,
                  }
                },
                '& img': { 
                  maxWidth: '100%', 
                  height: 'auto',
                  borderRadius: 1,
                  my: 2,
                },
                '& blockquote': {
                  borderLeft: '4px solid',
                  borderColor: 'primary.main',
                  pl: 2,
                  py: 1,
                  my: 2,
                  fontStyle: 'italic',
                  backgroundColor: 'grey.50',
                },
                '& code': {
                  backgroundColor: 'grey.100',
                  padding: '2px 4px',
                  borderRadius: 1,
                  fontSize: '0.875rem',
                },
                '& pre': {
                  backgroundColor: 'grey.900',
                  color: 'white',
                  p: 2,
                  borderRadius: 1,
                  overflow: 'auto',
                  my: 2,
                },
                '& a': {
                  color: 'primary.main',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                },
              }}
            />

            {/* Published Date */}
            {post.published_at && (
              <Box sx={{ mt: 4, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                <Typography variant="caption" color="text.secondary">
                  Published on {new Date(post.published_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </Typography>
              </Box>
            )}
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}