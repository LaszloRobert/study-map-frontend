import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBlogPostById } from '../data/blogPosts';

const BlogPost = () => {
  const { id } = useParams();
  const blogPost = getBlogPostById(id);

  // If blog post not found, show error
  if (!blogPost) {
    return (
      <div className="min-h-screen bg-background pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-text mb-4">Articol negăsit</h1>
          <p className="text-muted mb-8">Articolul pe care îl cauți nu există.</p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-primary text-text hover:bg-accent px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            ← Înapoi la Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-muted">
            <li><Link to="/" className="hover:text-primary">Acasă</Link></li>
            <li>/</li>
            <li><Link to="/blog" className="hover:text-primary">Blog</Link></li>
            <li>/</li>
            <li className="text-text">{blogPost.title}</li>
          </ol>
        </nav>

        {/* Article Header */}
        <header className="mb-8">
          <div className="mb-4">
            <span className="inline-block bg-primary text-text text-sm font-semibold px-3 py-1 rounded-full">
              {blogPost.category}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-text mb-4">
            {blogPost.title}
          </h1>
          <p className="text-xl text-muted mb-6">
            {blogPost.excerpt}
          </p>
          <div className="flex items-center justify-between text-sm text-muted">
            <div className="flex items-center space-x-4">
              <span>De {blogPost.author}</span>
              <span>•</span>
              <span>{new Date(blogPost.publishDate).toLocaleDateString('ro-RO')}</span>
              <span>•</span>
              <span>{blogPost.readTime}</span>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <article className="mb-12">
          <div 
            className="bg-surface rounded-lg p-8 text-text [&>h2]:text-white [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mt-8 [&>h2]:mb-4 [&>h3]:text-white [&>h3]:text-xl [&>h3]:font-bold [&>h3]:mt-6 [&>h3]:mb-3 [&>p]:text-muted [&>p]:mb-4 [&>ul]:text-muted [&>ul]:ml-6 [&>ul]:mb-4 [&>li]:mb-2 [&>strong]:text-white [&>strong]:font-bold"
            dangerouslySetInnerHTML={{ __html: blogPost.content }}
            style={{
              lineHeight: '1.8',
              fontSize: '1.1rem'
            }}
          />
        </article>

        {/* Back to Blog */}
        <div className="text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-primary text-text hover:bg-accent px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            ← Înapoi la Blog
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPost; 