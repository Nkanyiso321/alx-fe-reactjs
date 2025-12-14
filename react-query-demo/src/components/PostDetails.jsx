import React from 'react';
import { useQuery } from '@tanstack/react-query';
import './PostDetails.css';

// Fetch single post details
const fetchPostDetails = async ({ queryKey }) => {
  const [_, postId] = queryKey;
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch post details');
  }
  return response.json();
};

// Fetch comments for a post
const fetchPostComments = async ({ queryKey }) => {
  const [_, postId] = queryKey;
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
  if (!response.ok) {
    throw new Error('Failed to fetch comments');
  }
  return response.json();
};

const PostDetails = ({ postId }) => {
  // Fetch post details with React Query
  const {
    data: post,
    isLoading: isLoadingPost,
    isError: isErrorPost,
    error: postError,
  } = useQuery({
    queryKey: ['post', postId],
    queryFn: fetchPostDetails,
    enabled: !!postId, // Only fetch when postId exists
  });

  // Fetch comments with React Query
  const {
    data: comments = [],
    isLoading: isLoadingComments,
    isError: isErrorComments,
    error: commentsError,
  } = useQuery({
    queryKey: ['comments', postId],
    queryFn: fetchPostComments,
    enabled: !!postId, // Only fetch when postId exists
  });

  return (
    <div className="post-details">
      {isLoadingPost ? (
        <div className="loading">Loading post details...</div>
      ) : isErrorPost ? (
        <div className="error">Error: {postError.message}</div>
      ) : (
        <div className="post-content">
          <h4>Full Content:</h4>
          <p className="full-content">{post.body}</p>
          
          <div className="post-meta">
            <div className="meta-item">
              <span className="meta-label">User ID:</span>
              <span className="meta-value">{post.userId}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Post ID:</span>
              <span className="meta-value">{post.id}</span>
            </div>
          </div>
        </div>
      )}

      <div className="comments-section">
        <h4>Comments ({comments.length}):</h4>
        {isLoadingComments ? (
          <div className="loading">Loading comments...</div>
        ) : isErrorComments ? (
          <div className="error">Error loading comments: {commentsError.message}</div>
        ) : (
          <div className="comments-list">
            {comments.slice(0, 3).map((comment) => (
              <div key={comment.id} className="comment-card">
                <div className="comment-header">
                  <strong>{comment.name}</strong>
                  <span className="comment-email">{comment.email}</span>
                </div>
                <p className="comment-body">{comment.body}</p>
              </div>
            ))}
            {comments.length > 3 && (
              <div className="more-comments">
                + {comments.length - 3} more comments...
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetails;