import { notFound } from 'next/navigation';
import api from '../../api/ghost';

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
      <article>
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>
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