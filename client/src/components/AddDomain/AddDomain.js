import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Button, TextField } from '@mui/material';
import 'react-datepicker/dist/react-datepicker.css';
import useAlert from '../../hooks/alert.hook';

const AddDomain = () => {
  const [domain, setDomain] = useState('');
  const [traffic, setTraffic] = useState('');
  const [organic, setOrganic] = useState('');
  const [date, setDate] = useState(new Date());
  const alert = useAlert();
  // const [users, setUsers] = useState([]);
  const userInputRef = useRef('userInput');

  function handleDomain(e) {
    setDomain(e.target.value);
  }

  function handleTraffic(e) {
    setTraffic(e.target.value);
  }

  function handleOrganic(e) {
    setOrganic(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const domainInfo = {
      domain,
      traffic,
      organic,
    };
    axios
      .post('/api/domain', domainInfo)
      .then(res =>
        res.data.status === 'error'
          ? alert(res.data.message, 'error')
          : alert(res.data.message, 'success')
      )
      .catch(e => alert(e.message, 'error'));
    setDomain('');
    setTraffic('');
    setOrganic('');
  }

  // useEffect(() => {
  //   axios
  //     .get('/user/')
  //     .then(response => {
  //       if (response.data.length > 0) {
  //         console.log(response.data);
  //         setUsers(response.data.map(user => user));
  //         setEmail(response.data[0].email);
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }, []);
  // console.log(users);

  function handleDate(date) {
    setDate(date);
  }

  return (
    <>
      <div className="container">
        <div className="card border-0 shadow my-4">
          <div className="card-body p-3"></div>
          <div style={{ textAlign: 'center' }}>
            <h3>Добавить домен</h3>
            <form onSubmit={handleSubmit}>
              <div>
                <TextField
                  sx={{ width: '55ch' }}
                  margin="normal"
                  id="outlined-basic"
                  label="Домен"
                  ref={userInputRef}
                  required
                  variant="outlined"
                  value={domain}
                  onChange={handleDomain}
                />
              </div>
              <div>
                <TextField
                  sx={{ width: '55ch' }}
                  margin="normal"
                  id="outlined-basic"
                  label="Траффик"
                  variant="outlined"
                  required
                  value={traffic}
                  onChange={handleTraffic}
                />
              </div>
              <div>
                <TextField
                  sx={{ width: '55ch' }}
                  margin="normal"
                  id="outlined-basic"
                  label="Траффик"
                  variant="outlined"
                  required
                  value={organic}
                  onChange={handleOrganic}
                />
              </div>
              <div>
                <TextField
                  id="date"
                  label="Birthday"
                  type="date"
                  sx={{ width: 220 }}
                  selected={date}
                  onChange={handleDate}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              <Button type="submit" variant="contained">
                Создать проект
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddDomain;
