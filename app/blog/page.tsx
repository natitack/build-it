import Link from 'next/link';
import api from '../api/ghost';
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import Nav from '../components/Nav';

export default async function BlogPage() {
  const posts = await api.posts.browse({
    limit: 'all',
    include: 'tags,authors'
  });

  return (
    <>
      <Nav />
      <div style={{
        maxWidth: 1000,
        margin: '2.5rem auto',
        padding: '2.5rem 2rem',
        background: '#fff',
        borderRadius: 16,
        boxShadow: '0 2px 16px rgba(0,0,0,0.10)',
        fontFamily: 'Stratum2, Open Sans, system-ui, sans-serif',
      }}>
        <h1 style={{
          marginBottom: '2rem',
          fontSize: '2rem',
          textAlign: 'center',
          fontWeight: 600,
          letterSpacing: '0.01em',
        }}>Blog Posts</h1>
        {posts.map(post => (
          <Card key={post.id} sx={{ marginBottom: 2 }}>
            <CardActionArea
              component={Link}
              href={`/blog/${post.slug}`}
              sx={{
                '&:hover': {
                  backgroundColor: '#95f098'
                }
              }}
            >
              <CardContent>
                <Typography variant="h5" component="div">
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.excerpt}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </div>
    </>
  );
}