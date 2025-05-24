import api from '../ghost';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const posts = await api.posts.browse({
      limit: 'all',
      include: 'tags,authors'
    });
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}