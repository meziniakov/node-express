import React, { useCallback, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import useAlert from '../hooks/alert.hook';
import { AuthContext } from '../context/AuthContext';
import { Box, TextField } from '@mui/material';

export const AuthPage = () => {
  const auth = useContext(AuthContext);
  const alert = useAlert();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);

  const changeHandler = event => {
    event.preventDefault();
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const clearError = useCallback(() => setError(null), []);

  useEffect(() => {
    if (error) {
      alert(error);
    }
    clearError();
  }, [error, alert, clearError]);

  const register = async event => {
    event.preventDefault();
    await axios
      .post('/api/user/register', {
        email: form.email,
        password: form.password,
      })
      .then(res => {
        console.log(res.data.message);
        setError(res.data.message);
      })
      .catch(e => {
        setError(e);
        // console.log(e.map(e => e.message));
      });
  };

  const login = event => {
    event.preventDefault();
    axios
      .post('/api/user/login', {
        email: form.email,
        password: form.password,
      })
      .then(res => {
        // console.log(res.data.message);
        auth.login(res.data.token, res.data.userId);
        if (res.data.message) return setError(res.data.message);
      })
      .catch(e => {
        console.log(e);
        setError(e);
      });
  };

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="email"
          label="email"
          variant="outlined"
          type="text"
          name="email"
          value={form.email}
          onChange={changeHandler}
        />
        <TextField
          id="password"
          label="password"
          variant="outlined"
          type="password"
          name="password"
          autoComplete="on"
          value={form.password}
          onChange={changeHandler}
        />
        <button
          className="waves-effect waves-light btn"
          style={{ margin: 10 }}
          onClick={login}
        >
          Войти
        </button>
        <button onClick={register} className="waves-effect waves-light btn">
          Регистрация
        </button>
      </div>
    </Box>
  );
};
