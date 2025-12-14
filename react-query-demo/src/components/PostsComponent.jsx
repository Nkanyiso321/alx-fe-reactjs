import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import PostDetails from './PostDetails';
import './PostsComponent.css';

// API call function
const fetchPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  return response.json();
};

const PostsComponent = () => {
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [page, setPage] = useState(1);
  const postsPerPage = 10;

  // React Query hook for fetching posts
  const {
    data: posts = [],
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
    isRefetching,
  } = useQuery({
    queryKey: ['posts'], // Unique key for caching
    queryFn: fetchPosts,
  });

  // Calculate pagination
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const startIndex = (page - 1) * postsPerPage;
  const paginatedPosts = posts.slice(startIndex, startIndex + postsPerPage);

  // Handle post selection
  const handlePostSelect = (postId) => {
    setSelectedPostId(postId === selectedPostId ? null : postId);
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // Handle manual refetch
  const handleRefetch = () => {
    refetch();
  };

  // Handle cache invalidation and refetch
  const handleForceRefetch = () => {
    queryClient.invalidateQueries(['posts']);
    refetch();
  };

  // Render loading state
  if (isLoading) {
    return (
      <div className="posts-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading posts...</p>
        </div>
      </div>
    );
  }

  // Render error state
  if (isError) {
    return (
      <div className="posts-container">
        <div className="error-state">
          <h3>Error Loading Posts</h3>
          <p>{error.message}</p>
          <button onClick={handleRefetch} className="refetch-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="posts-container">
      <div className="header-section">
        <h2>Posts from JSONPlaceholder API</h2>
        <div className="stats-section">
          <div className="stat">
            <span className="stat-label">Total Posts:</span>
            <span className="stat-value">{posts.length}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Current Page:</span>
            <span className="stat-value">{page} of {totalPages}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Status:</span>
            <span className={`status-indicator ${isFetching ? 'fetching' : 'idle'}`}>
              {isFetching ? 'Fetching...' : 'Idle'}
            </span>
          </div>
        </div>
      </div>

      <div className="controls-section">
        <button 
          onClick={handleRefetch} 
          className="control-btn"
          disabled={isRefetching}
        >
          {isRefetching ? (
            <>
              <span className="btn-spinner"></span>
              Refetching...
            </>
          ) : (
            'Refetch Posts'
          )}
        </button>
        
        <button 
          onClick={() => {
            setPage(1);
            handleRefetch();
          }} 
          className="control-btn secondary"
          disabled={isRefetching}
        >
          Reset & Refetch
        </button>
        
        <div className="cache-info">
          <p>
            <strong>React Query Features:</strong>
          </p>
          <ul>
            <li>Automatic caching of fetched data</li>
            <li>Background refetching</li>
            <li>Pagination support</li>
            <li>Error handling and retries</li>
            <li>Loading states management</li>
          </ul>
        </div>
      </div>

      {isRefetching && (
        <div className="refetching-indicator">
          <div className="mini-spinner"></div>
          <span>Refetching data in background...</span>
        </div>
      )}

      <div className="posts-grid">
        {paginatedPosts.map((post) => (
          <div 
            key={post.id} 
            className={`post-card ${selectedPostId === post.id ? 'selected' : ''}`}
            onClick={() => handlePostSelect(post.id)}
          >
            <div className="post-header">
              <span className="post-id">#{post.id}</span>
              <h3 className="post-title">{post.title}</h3>
            </div>
            <p className="post-body">{post.body.substring(0, 100)}...</p>
            <div className="post-footer">
              <span className="user-id">User ID: {post.userId}</span>
              <button 
                className="view-details-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePostSelect(post.id);
                }}
              >
                {selectedPostId === post.id ? 'Hide Details' : 'View Details'}
              </button>
            </div>
            
            {selectedPostId === post.id && (
              <PostDetails postId={post.id} />
            )}
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination">
          <button 
            onClick={() => handlePageChange(page - 1)} 
            disabled={page === 1}
            className="pagination-btn"
          >
            Previous
          </button>
          
          <div className="page-numbers">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNumber;
              if (totalPages <= 5) {
                pageNumber = i + 1;
              } else if (page <= 3) {
                pageNumber = i + 1;
              } else if (page >= totalPages - 2) {
                pageNumber = totalPages - 4 + i;
              } else {
                pageNumber = page - 2 + i;
              }
              
              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`pagination-btn ${page === pageNumber ? 'active' : ''}`}
                >
                  {pageNumber}
                </button>
              );
            })}
          </div>
          
          <button 
            onClick={() => handlePageChange(page + 1)} 
            disabled={page === totalPages}
            className="pagination-btn"
          >
            Next
          </button>
        </div>
      )}

      <div className="demo-instructions">
        <h3>Demo Instructions:</h3>
        <ol>
          <li>Observe the initial fetch - loading spinner appears</li>
          <li>Click "Refetch Posts" to manually trigger a refetch</li>
          <li>Navigate away and come back - data loads from cache instantly</li>
          <li>Click on posts to view detailed information</li>
          <li>Use pagination to navigate through posts</li>
          <li>Check the React Query Devtools (bottom-right) to see cache state</li>
        </ol>
      </div>
    </div>
  );
};

export default PostsComponent;