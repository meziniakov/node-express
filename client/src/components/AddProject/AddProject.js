import axios from 'axios';
import React, { useState } from 'react';
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import useAlert from '../../hooks/alert.hook';
import { useAuth } from '../../hooks/auth.hook';
import { AuthContext } from '../../context/AuthContext';

const AddProject = props => {
  const [title, setTitle] = useState('');
  const [keywords, setKeywords] = useState({ value: '', list: [] });
  const [count, setCount] = useState(3);
  // const [stage, setStage] = useState(6);
  const [profitPerVisitor, setProfitPerVisitor] = useState(0.1);
  const auth = useAuth(AuthContext);
  const owner = auth.userId;
  const alert = useAlert();

  function handleTitle(e) {
    setTitle(e.target.value);
  }

  function handleKeywords(e) {
    setKeywords({ value: e.target.value, list: [] });
  }

  function handleCount(e) {
    setCount(e.target.value);
  }

  // function handleStage(e) {
  //   setStage(e.target.value);
  // }
  function handleProfitPerVisitor(e) {
    setProfitPerVisitor(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const projectData = {
      title,
      keywords: keywords.value.split('\n'),
      profitPerVisitor,
      count,
      // stage,
      owner,
    };

    axios
      .post('/api/project', projectData)
      .then(res =>
        res.data.status === 'error'
          ? alert(res.data.message, 'error')
          : alert(res.data.message, 'success')
      )
      .catch(e => alert(e.message, 'error'));
    setTitle('');
    setKeywords('');
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
              label="Тематика сайтов"
              variant="outlined"
              value={title}
              required={true}
              onChange={handleTitle}
            />
          </div>
          <div>
            <TextField
              sx={{ width: '55ch' }}
              margin="normal"
              id="outlined-multiline-static"
              multiline
              maxRows={10}
              label="Ключевые слова (с новой строки)"
              variant="outlined"
              value={keywords.value}
              onChange={handleKeywords}
            />
          </div>
          <div>
            <FormControl sx={{ m: 1, minWidth: 180 }}>
              <InputLabel id="demo-simple-select-helper-label">
                Страниц выдачи Google
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={count}
                label="Страниц выдачи Google"
                onChange={handleCount}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={10}>10</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 180 }}>
              <InputLabel id="demo-simple-select-helper-label">
                Доход на посетителя
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={profitPerVisitor}
                label="Доход на посетителя"
                onChange={handleProfitPerVisitor}
              >
                <MenuItem value={0.1}>0.1</MenuItem>
                <MenuItem value={0.2}>0.2</MenuItem>
                <MenuItem value={0.3}>0.3</MenuItem>
                <MenuItem value={0.4}>0.4</MenuItem>
                <MenuItem value={0.5}>0.5</MenuItem>
                <MenuItem value={0.6}>0.6</MenuItem>
                <MenuItem value={0.7}>0.7</MenuItem>
              </Select>
            </FormControl>
            {/* <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-helper-label">
                Стадия
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={stage}
                label="Стадия"
                onChange={handleStage}
              >
                <MenuItem value={6}>6 - умирание</MenuItem>
                <MenuItem value={10}>10 - пик</MenuItem>
                <MenuItem value={12}>12 - стагнация</MenuItem>
                <MenuItem value={18}>18 - рост</MenuItem>
              </Select>
            </FormControl> */}
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
