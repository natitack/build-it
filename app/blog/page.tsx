import Link from 'next/link';
import api from '../api/ghost';
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";

export default async function BlogPage() {
  const posts = await api.posts.browse({
    limit: 'all',
    include: 'tags,authors'
  });

  return (
    <div>
      <h1>Blog Posts</h1>
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
  );
}