import api from '../../ghost';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { slug } = params;
  
  try {
    const post = await api.posts.read({ slug }, {
      include: 'tags,authors'
    });
    return NextResponse.json(post);
  } catch (error) {
    if (error.message.includes('not found')) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    } else {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}