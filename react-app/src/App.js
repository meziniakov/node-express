import { useState } from 'react';
import './styles/App.css';
import Counter from './components/Counter';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import MySelect from './components/UI/select/MySelect';

function App() {
  let [posts, setPosts] = useState([
    {
      id: 1,
      title: 'Javascript',
      text: 'Javascript - it is language programming',
    },
    {
      id: 2,
      title: 'Javascript 2',
      text: 'Javascript 2 - it is language programming',
    },
    {
      id: 3,
      title: 'Javascript 3',
      text: 'Javascript 3 - it is language programming',
    },
  ]);

  function createPost(newPost) {
    setPosts([...posts, newPost]);
  }

  function deletePost(post) {
    setPosts(posts.filter(p => p.id !== post.id));
  }

  return (
    <div className="App">
      <h2>Добавить пост</h2>
      <hr></hr>
      <PostForm create={createPost} />
      <MySelect
        defaultValue={'Выбор сортировки'}
        options={[
          { value: 'title', name: 'По названию' },
          { value: 'text', name: 'По тексту' },
        ]}
      />
      {posts.length ? (
        <PostList deletePost={deletePost} posts={posts}>
          Список постов
        </PostList>
      ) : (
        'Постов больше нет'
      )}
      <Counter />
    </div>
  );
}

export default App;
