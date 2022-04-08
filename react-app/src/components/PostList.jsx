import React from 'react';
import PostItem from './PostItem';

const PostList = ({ posts, children, deletePost }) => {
  return (
    <div>
      <h2>{children}</h2>
      {posts.map((post, index) => (
        <PostItem
          deletePost={deletePost}
          index={index + 1}
          post={post}
          key={post.id}
        />
      ))}
    </div>
  );
};
export default PostList;
