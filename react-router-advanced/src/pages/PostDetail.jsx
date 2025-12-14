import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import './Pages.css';

const fetchPost = async ({ queryKey }) => {
  const [_, postId] = queryKey;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );
  if (!response.ok) throw new Error('Failed to fetch post');
  return response.json();
};

const fetchComments = async ({ queryKey }) => {
  const [_, postId] = queryKey;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
  );
  if (!response.ok) throw new Error('Failed to fetch comments');
  return response.json();
};

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const postId = parseInt(id);

  const {
    data: post,
    isLoading: isLoadingPost,
    isError: isErrorPost,
  } = useQuery({
    queryKey: ['post', postId],
    queryFn: fetchPost,
    enabled: !!postId,
  });

  const {
    data: comments = [],
    isLoading: isLoadingComments,
  } = useQuery({
    queryKey: ['comments', postId],
    queryFn: fetchComments,
    enabled: !!postId,
  });

  if (isLoadingPost) {
    return (
      <div className="page post-detail-page">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading post details...</p>
        </div>
      </div>
    );
  }

  if (isErrorPost || !post) {
    return (
      <div className="page post-detail-page">
        <div className="error-container">
          <h2>Post Not Found</h2>
          <p>The post you're looking for doesn't exist.</p>
          <button onClick={() => navigate('/posts')} className="btn">
            Back to Posts
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page post-detail-page">
      <div className="post-detail-header">
        <button onClick={() => navigate('/posts')} className="back-btn">
          ← Back to Posts
        </button>
        <div className="post-meta">
          <span className="post-id-label">Post #{post.id}</span>
          <span className="user-label">User {post.userId}</span>
        </div>
      </div>

      <article className="post-content">
        <h1>{post.title}</h1>
        <div className="post-body">
          <p>{post.body}</p>
        </div>
      </article>

      <div className="post-sidebar">
        <div className="sidebar-section">
          <h3>Dynamic Route Info</h3>
          <div className="route-details">
            <p><strong>Current URL:</strong></p>
            <code className="route-url">/posts/{post.id}</code>
            <p><strong>Route Pattern:</strong></p>
            <code>/posts/:id</code>
            <p><strong>Parameter Value:</strong></p>
            <div className="param-value">{post.id}</div>
          </div>
        </div>

        <div className="sidebar-section">
          <h3>Navigation Demo</h3>
          <div className="nav-demo">
            <button
              onClick={() => navigate(`/posts/${Math.max(1, post.id - 1)}`)}
              className="nav-btn"
              disabled={post.id <= 1}
            >
              ← Previous Post
            </button>
            <button
              onClick={() => navigate(`/posts/${post.id + 1}`)}
              className="nav-btn"
              disabled={post.id >= 100}
            >
              Next Post →
            </button>
          </div>
          <p className="nav-hint">
            Try changing the post ID in the URL manually!
          </p>
        </div>
      </div>

      <section className="comments-section">
        <h2>Comments ({comments.length})</h2>
        {isLoadingComments ? (
          <div className="loading-comments">Loading comments...</div>
        ) : (
          <div className="comments-list">
            {comments.slice(0, 5).map((comment) => (
              <div key={comment.id} className="comment-card">
                <div className="comment-header">
                  <strong>{comment.name}</strong>
                  <span className="comment-email">{comment.email}</span>
                </div>
                <p className="comment-body">{comment.body}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <div className="dynamic-routing-demo">
        <h3>💡 Dynamic Routing Test</h3>
        <div className="test-cases">
          <p>Try these URLs directly in your browser:</p>
          <ul>
            <li>
              <code>/posts/1</code> - Should show post #1
            </li>
            <li>
              <code>/posts/50</code> - Should show post #50
            </li>
            <li>
              <code>/posts/999</code> - Should show error (post doesn't exist)
            </li>
            <li>
              <code>/posts/abc</code> - Should show error (invalid ID)
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;