import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import PostDetails from './PostDetails';
import './PostsComponent.css';

// API call function
const fetchPosts = async ({ pageParam = 1, limit = 10 }) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${pageParam}&_limit=${limit}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  
  // Get total count from headers for pagination
  const totalCount = response.headers.get('x-total-count');
  const data = await response.json();
  
  return {
    posts: data,
    totalPages: Math.ceil(totalCount / limit),
    currentPage: pageParam
  };
};

const PostsComponent = () => {
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  const postsPerPage = 10;

  // React Query hook for fetching posts with all requested configurations
  const {
    data: postsData,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
    isRefetching,
    isPreviousData,
  } = useQuery({
    queryKey: ['posts', page], // Include page in query key for pagination
    queryFn: () => fetchPosts({ pageParam: page, limit: postsPerPage }),
    
    // Configuration options as specified in the requirements
    staleTime: 1000 * 60 * 5, // 5 minutes - Data stays fresh for 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes - Cache persists for 10 minutes after query becomes inactive
    refetchOnWindowFocus: true, // Automatically refetch when window regains focus
    keepPreviousData: true, // Keep previous data while fetching new data
    
    // Additional useful configurations
    retry: 3, // Retry failed requests 3 times
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
    
    // Optional: Only enable query when certain conditions are met
    enabled: true,
  });

  // Handle post selection
  const handlePostSelect = (postId) => {
    setSelectedPostId(postId === selectedPostId ? null : postId);
  };

  // Handle page change with prefetching
  const handlePageChange = (newPage) => {
    if (!isPreviousData && postsData?.totalPages && newPage <= postsData.totalPages) {
      // Prefetch the next page
      queryClient.prefetchQuery({
        queryKey: ['posts', newPage],
        queryFn: () => fetchPosts({ pageParam: newPage, limit: postsPerPage }),
      });
    }
    setPage(newPage);
  };

  // Handle manual refetch
  const handleRefetch = () => {
    refetch({ throwOnError: true });
  };

  // Handle cache invalidation and refetch
  const handleInvalidateCache = () => {
    queryClient.invalidateQueries({ queryKey: ['posts'] });
  };

  // Clear specific cache
  const handleClearCache = () => {
    queryClient.removeQueries({ queryKey: ['posts'] });
  };

  // Get cache statistics
  const getCacheInfo = () => {
    const queries = queryClient.getQueryCache().getAll();
    const postsQueries = queries.filter(q => q.queryKey[0] === 'posts');
    
    return {
      totalQueries: postsQueries.length,
      cachedPages: postsQueries.map(q => q.queryKey[1]).filter(Boolean),
      lastUpdated: postsQueries[0]?.state.dataUpdatedAt,
    };
  };

  // Render loading state
  if (isLoading && !isPreviousData) {
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

  const { posts = [], totalPages = 0, currentPage = 1 } = postsData || {};
  const cacheInfo = getCacheInfo();

  return (
    <div className="posts-container">
      <div className="header-section">
        <h2>Posts from JSONPlaceholder API</h2>
        <div className="stats-section">
          <div className="stat">
            <span className="stat-label">Current Page:</span>
            <span className="stat-value">{currentPage} of {totalPages}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Total Posts:</span>
            <span className="stat-value">{posts.length * totalPages}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Status:</span>
            <span className={`status-indicator ${isFetching ? 'fetching' : 'idle'}`}>
              {isFetching ? 'Fetching...' : 'Idle'}
            </span>
          </div>
          <div className="stat">
            <span className="stat-label">Cached Pages:</span>
            <span className="stat-value">{cacheInfo.cachedPages.length}</span>
          </div>
        </div>
      </div>

      <div className="controls-section">
        <div className="controls-left">
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
              'Refetch Current Page'
            )}
          </button>
          
          <button 
            onClick={handleInvalidateCache} 
            className="control-btn secondary"
          >
            Invalidate Cache
          </button>
          
          <button 
            onClick={handleClearCache} 
            className="control-btn danger"
          >
            Clear Cache
          </button>
        </div>
        
        <div className="cache-info">
          <p>
            <strong>React Query Configuration:</strong>
          </p>
          <ul>
            <li>
              <strong>staleTime:</strong> 5 minutes (data considered fresh)
            </li>
            <li>
              <strong>cacheTime:</strong> 10 minutes (cache retention)
            </li>
            <li>
              <strong>refetchOnWindowFocus:</strong> true
            </li>
            <li>
              <strong>keepPreviousData:</strong> true (smooth pagination)
            </li>
            <li>
              <strong>Cached Pages:</strong> {cacheInfo.cachedPages.join(', ') || 'None'}
            </li>
          </ul>
        </div>
      </div>

      {/* Cache Status Indicator */}
      <div className="cache-status">
        <div className="cache-status-item">
          <span className="cache-label">Stale Time:</span>
          <span className="cache-value">5 minutes</span>
          <div className="cache-visual">
            <div className="stale-visual"></div>
            <span>Fresh for 5m</span>
          </div>
        </div>
        <div className="cache-status-item">
          <span className="cache-label">Cache Time:</span>
          <span className="cache-value">10 minutes</span>
          <div className="cache-visual">
            <div className="cache-visual-bar"></div>
            <span>Stored for 10m</span>
          </div>
        </div>
        <div className="cache-status-item">
          <span className="cache-label">Window Focus:</span>
          <span className="cache-value">Auto-refetch</span>
          <div className="cache-visual">
            <span className="focus-indicator">👁️</span>
          </div>
        </div>
      </div>

      {isRefetching && (
        <div className="refetching-indicator">
          <div className="mini-spinner"></div>
          <span>Refetching data in background...</span>
          <span className="cache-note">(Previous data still visible due to keepPreviousData)</span>
        </div>
      )}

      {isPreviousData && isFetching && (
        <div className="previous-data-indicator">
          <span>Loading new page... Showing previous data</span>
        </div>
      )}

      <div className="posts-grid">
        {posts.map((post) => (
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
                  disabled={isFetching && !isPreviousData && pageNumber === page}
                >
                  {pageNumber}
                  {cacheInfo.cachedPages.includes(pageNumber) && (
                    <span className="cached-indicator" title="This page is cached"> ✓</span>
                  )}
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
          
          <div className="pagination-info">
            <span className="pagination-note">
              {isPreviousData ? 'Showing previous data while loading...' : 'Data up to date'}
            </span>
            <span className="pagination-note">
              {isFetching ? 'Fetching...' : 'Ready'}
            </span>
          </div>
        </div>
      )}

      <div className="demo-instructions">
        <h3>React Query Features Demonstration:</h3>
        <div className="features-grid">
          <div className="feature">
            <h4>🎯 keepPreviousData</h4>
            <p>When enabled, previous data remains visible while new data loads. Try paginating!</p>
          </div>
          <div className="feature">
            <h4>⏰ staleTime & cacheTime</h4>
            <p>Data stays fresh for 5 minutes, cached for 10 minutes after inactivity.</p>
          </div>
          <div className="feature">
            <h4>🔄 refetchOnWindowFocus</h4>
            <p>Data refetches automatically when window regains focus. Try switching tabs!</p>
          </div>
          <div className="feature">
            <h4>💾 Cache Management</h4>
            <p>Use buttons to invalidate or clear cache. Observe cached pages indicator.</p>
          </div>
        </div>
        
        <div className="test-cases">
          <h4>Test Scenarios:</h4>
          <ol>
            <li>Navigate through pages - notice smooth transitions (keepPreviousData)</li>
            <li>Switch browser tabs and return - data refetches (refetchOnWindowFocus)</li>
            <li>Wait 5+ minutes, then interact - data may be stale</li>
            <li>Click "Clear Cache" then navigate - fresh fetch required</li>
            <li>Observe cached pages indicator in pagination</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default PostsComponent;