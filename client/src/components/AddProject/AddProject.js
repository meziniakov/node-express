import axios from 'axios';
import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import useAlert from '../../hooks/alert.hook';
import { useAuth } from '../../hooks/auth.hook';
import { AuthContext } from '../../context/AuthContext';

const AddProject = props => {
  const [title, setTitle] = useState('');
  const [keyword, setKeyword] = useState('');
  const [count, setCount] = useState('');
  const auth = useAuth(AuthContext);
  const owner = auth.userId;
  const alert = useAlert();

  function handleTitle(e) {
    setTitle(e.target.value);
  }

  function handleKeyword(e) {
    setKeyword(e.target.value);
  }

  function handleCount(e) {
    setCount(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const projectData = {
      title,
      keyword,
      count,
      owner,
    };

    axios
      .post('http://localhost:5000/project', projectData)
      .then(res =>
        res.data.status === 'error'
          ? alert(res.data.message, 'error')
          : alert(res.data.message, 'success')
      )
      .catch(e => alert(e.message, 'error'));
    setTitle('');
    setKeyword('');
  }

  return (
    <div className="container">
      <div style={{ textAlign: 'center' }}>
        <h3>Добавить проект</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <TextField
              sx={{ width: '55ch' }}
              margin="normal"
              id="outlined-basic"
              label="Название проекта"
              variant="outlined"
              value={title}
              onChange={handleTitle}
            />
          </div>
          <div>
            <TextField
              sx={{ width: '55ch' }}
              margin="normal"
              id="outlined-basic"
              label="Ключевое слово"
              variant="outlined"
              value={keyword}
              onChange={handleKeyword}
            />
          </div>
          <div>
            <TextField
              sx={{ width: '55ch' }}
              margin="normal"
              id="outlined-basic"
              label="Страниц парсинга"
              variant="outlined"
              value={count}
              onChange={handleCount}
            />
          </div>

          <Button type="submit" variant="contained">
            Создать проект
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddProject;
