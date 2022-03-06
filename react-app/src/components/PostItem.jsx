import React from 'react';
import MyButton from './UI/button/MyButton';

const PostItem = props => {
  // function removePost() {
  //   console.log(props.post.id);
  //   deletePost(props.post);
  //   console.log(props.post.id);
  // }

  return (
    <div className="post">
      <div className="post__content">
        <strong>
          {props.index}. {props.post.title}
        </strong>
        <div>{props.post.text}</div>
        <div className="post__btn">
          <MyButton onClick={e => props.deletePost(props.post)}>
            Delete
          </MyButton>
        </div>
      </div>
    </div>
  );
};
export default PostItem;
