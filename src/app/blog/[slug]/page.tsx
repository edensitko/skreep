import { notFound } from 'next/navigation';
import { blogPosts, getPostBySlug } from '@/data/blogPosts';
import BlogPostContent from '@/components/Blog/BlogPostContent';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return <BlogPostContent post={post} />;
}

// Generate static params for all blog posts
export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}
