import React, { useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';

const AddUser = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function handleClick(message, type) {
    enqueueSnackbar(message, { variant: type });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    console.log(user);
    axios
      .post('http://localhost:5000/user/register', user)
      .then(res => {
        res.data.status === 'error'
          ? handleClick(res.data.message, 'error')
          : handleClick(res.data.message, 'success');
      })
      .catch(e => handleClick(e.message, 'error'));
    setEmail('');
    setPassword('');
  }

  return (
    <>
      <div className="container">
        <div className="card border-0 shadow my-4">
          <div className="card-body p-3"></div>
          <div>
            <h3 style={{ textAlign: 'center', marginBottom: '15px' }}>
              <img
                src="https://user-images.githubusercontent.com/37651620/142767072-ff777861-7ee9-4355-b48e-a624e8de085b.png"
                alt="Logo"
                style={{ height: '150px' }}
              />
            </h3>
            <form onSubmit={handleSubmit}>
              <div
                className="form-group"
                style={{
                  marginLeft: '20px',
                  marginBottom: '15px',
                  marginRight: '20px',
                }}
              >
                <label>👤 Email:</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  value={email}
                  onChange={handleEmail}
                />
                <label>👤 Password:</label>
                <input
                  type="password"
                  autoComplete="on"
                  required
                  className="form-control"
                  value={password}
                  onChange={handlePassword}
                />
              </div>
              <div
                className="form-group"
                style={{
                  textAlign: 'center',
                }}
              >
                <input
                  type="submit"
                  value="Create User"
                  className="btn "
                  style={{
                    color: 'white',
                    marginBottom: '25px',
                    backgroundColor: '#8661d1',
                  }}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUser;
