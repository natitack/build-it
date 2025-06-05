import { notFound } from 'next/navigation';
import api from '../../api/ghost';
import Nav from '../../components/Nav';

export async function generateMetadata({ params }) {
  const { slug } = params;
  
  try {
    const post = await api.posts.read({ slug });
    return {
      title: post.title,
      description: post.excerpt,
    };
  } catch (error) {
    return {
      title: 'Post Not Found',
    };
  }
}

export default async function PostPage({ params }) {
  const { slug } = params;
  
  try {
    const post = await api.posts.read({ slug }, {
      include: 'tags,authors'
    });

    return (
      <>
        <Nav />
        <article style={{
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
          }}>{post.title}</h1>
          <div
            style={{
              padding: '0 0.5rem',
              fontSize: '1.08rem',
              lineHeight: 1.7,
              color: '#222',
            }}
            dangerouslySetInnerHTML={{ __html: post.html }}
            className="blog-content"
          />
        </article>
      </>
    );
  } catch (error) {
    notFound();
  }
}

// Generate static params for better performance
export async function generateStaticParams() {
  const posts = await api.posts.browse({ limit: 'all' });
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}