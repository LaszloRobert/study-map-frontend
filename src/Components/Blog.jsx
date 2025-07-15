import React from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';

const Blog = () => {

  return (
    <div className="min-h-screen bg-background pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-text mb-4">
            Blog Geografie România
          </h1>
          <p className="text-xl text-muted max-w-3xl mx-auto">
            Descoperă articole educaționale despre geografia României, județe, regiuni și atracții turistice
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-surface rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-primary to-accent">
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-block bg-primary text-text text-xs font-semibold px-2 py-1 rounded">
                    {post.category}
                  </span>
                  <span className="text-muted text-sm">{post.readTime}</span>
                </div>
                <h2 className="text-xl font-bold text-text mb-3">
                  {post.title}
                </h2>
                <p className="text-muted mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted">
                    {new Date(post.publishDate).toLocaleDateString('ro-RO')}
                  </span>
                  <Link 
                    to={`/blog/${post.id}`}
                    className="text-primary hover:text-accent font-semibold text-sm transition-colors"
                  >
                    Citește mai mult →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog; 