import React, { useState } from 'react';
import MyButton from './UI/button/MyButton';
import MyInput from './UI/input/MyInput';

function PostForm({ create }) {
  let [post, setPost] = useState({ title: '', text: '' });

  function addNewPost(event) {
    event.preventDefault();
    let newPost = { ...post, id: Date.now() };
    create(newPost);
    // setPosts([...posts, { ...post, id: Date.now() }]);
    setPost({ title: '', text: '' });
  }

  return (
    <form>
      <MyInput
        type="text"
        value={post.title}
        placeholder="Название поста"
        onChange={e => setPost({ ...post, title: e.target.value })}
      ></MyInput>
      <MyInput
        type="text"
        value={post.text}
        placeholder="Текст поста"
        onChange={e => setPost({ ...post, text: e.target.value })}
      ></MyInput>
      <MyButton onClick={addNewPost}>Добавить</MyButton>
    </form>
  );
}
export default PostForm;
