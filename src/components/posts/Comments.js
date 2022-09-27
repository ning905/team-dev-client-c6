import React, { useEffect, useState } from 'react';
import CommentItem from './CommentItem';
import FilterMenu from './utils/filterMenu';

const Comments = ({
  userId,
  post,
  setUser,
  showingAll,
  setShowingAll,
  setPostResponse,
}) => {
  const [sortType, setSortType] = useState('Most Recent');
  const [comments, setComments] = useState(post.comments);
  useEffect(() => {
    setComments(post.comments);
    handleSorting();
    // eslint-disable-next-line
  }, [sortType, post]);

  const handleSorting = () => {
    if (sortType === 'Most Recent') {
      setComments(
        [...post.comments].sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        })
      );
    }
    if (sortType === 'Oldest') {
      setComments(
        [...post.comments].sort((a, b) => {
          return new Date(a.createdAt) - new Date(b.createdAt);
        })
      );
    }
  };

  const handleShowAll = () => {
    setShowingAll(!showingAll);
  };

  return (
    <div className="comments-section">
      {showingAll && (
        <div className="comment-filter">
          <FilterMenu setSortType={setSortType} />
        </div>
      )}
      <ul className="comments-list">
        {!showingAll
          ? comments.length >= 1 && (
              <CommentItem
                userId={userId}
                post={post}
                comment={comments[0]}
                setUser={setUser}
                showingAll={showingAll}
                setPostResponse={setPostResponse}
              />
            )
          : comments.length > 0 &&
            comments.map((comment, index) => (
              <CommentItem
                showingAll={showingAll}
                userId={userId}
                post={post}
                comment={comment}
                key={index}
                setUser={setUser}
                setPostResponse={setPostResponse}
              />
            ))}
      </ul>
      {comments.length > 1 && (
        <p className="comments-show-all" onClick={handleShowAll}>
          {!showingAll
            ? `Show All Comments (${comments.length})`
            : 'Hide Comments'}
        </p>
      )}
    </div>
  );
};

export default Comments;
