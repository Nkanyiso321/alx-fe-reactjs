import React, { useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import './Pages.css';

const fetchPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) throw new Error('Failed to fetch posts');
  return response.json();
};

const Posts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const searchQuery = searchParams.get('search') || '';
  const [filter, setFilter] = useState('all');

  const { data: posts = [], isLoading, isError } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  const handleSearch = (e) => {
    const value = e.target.value;
    if (value) {
      setSearchParams({ search: value });
    } else {
      setSearchParams({});
    }
  };

  const handlePostClick = (postId) => {
    navigate(`/posts/${postId}`);
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.body.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || 
                         (filter === 'short' && post.body.length < 100) ||
                         (filter === 'long' && post.body.length >= 100);
    return matchesSearch && matchesFilter;
  });

  if (isLoading) {
    return (
      <div className="page posts-page">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading posts...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="page posts-page">
        <div className="error-container">
          <h2>Error Loading Posts</h2>
          <p>Please try again later.</p>
          <button onClick={() => window.location.reload()} className="btn">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page posts-page">
      <header className="page-header">
        <h1>Blog Posts</h1>
        <p className="subtitle">Dynamic routing example with post details</p>
      </header>

      <div className="posts-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={handleSearch}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="filter-buttons">
          <button
            onClick={() => setFilter('all')}
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          >
            All Posts
          </button>
          <button
            onClick={() => setFilter('short')}
            className={`filter-btn ${filter === 'short' ? 'active' : ''}`}
          >
            Short Posts
          </button>
          <button
            onClick={() => setFilter('long')}
            className={`filter-btn ${filter === 'long' ? 'active' : ''}`}
          >
            Long Posts
          </button>
        </div>
      </div>

      <div className="posts-info">
        <p>
          Showing <strong>{filteredPosts.length}</strong> of {posts.length} posts
          {searchQuery && ` matching "${searchQuery}"`}
        </p>
        <p className="route-info-text">
          Each post has a dynamic route: <code>/posts/:id</code>
        </p>
      </div>

      <div className="posts-grid">
        {filteredPosts.slice(0, 20).map((post) => (
          <div
            key={post.id}
            className="post-card"
            onClick={() => handlePostClick(post.id)}
          >
            <div className="post-card-header">
              <span className="post-id">#{post.id}</span>
              <span className="user-id">User {post.userId}</span>
            </div>
            <h3 className="post-title">{post.title}</h3>
            <p className="post-excerpt">
              {post.body.length > 100
                ? `${post.body.substring(0, 100)}...`
                : post.body}
            </p>
            <div className="post-card-footer">
              <span className="post-length">
                {post.body.length > 100 ? 'Long' : 'Short'} post
              </span>
              <Link
                to={`/posts/${post.id}`}
                className="view-post-link"
                onClick={(e) => e.stopPropagation()}
              >
                Read More →
              </Link>
            </div>
            <div className="route-hint">
              Route: <code>/posts/{post.id}</code>
            </div>
          </div>
        ))}
      </div>

      <div className="routing-demo">
        <h3>Dynamic Routing in Action</h3>
        <div className="demo-steps">
          <div className="demo-step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Click any post</h4>
              <p>Observe the URL changing to include the post ID</p>
            </div>
          </div>
          <div className="demo-step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>Check browser history</h4>
              <p>Each post has its own entry in browser history</p>
            </div>
          </div>
          <div className="demo-step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>Try direct access</h4>
              <p>Enter <code>/posts/5</code> directly in the URL bar</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;