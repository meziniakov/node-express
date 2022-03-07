import React, { useEffect, useState } from 'react';
import {
  Table,
  TablePagination,
  Link,
  Container,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableContainer,
} from '@mui/material';
import axios from 'axios';
import useAlert from '../../hooks/alert.hook';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const alert = useAlert();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    axios
      .get('/api/user')
      .then(response => {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch(error => console.log(error));
  }, []);

  function handleDelete(id) {
    axios
      .delete('/api/user/' + id)
      .then(res => {
        console.log(res);
        alert(res.data.message);
        setUsers(users.filter(el => el._id !== id));
      })
      .catch(e => console.log(e));
  }

  return (
    <Container className="mt-4">
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table
            stickyHeader
            sx={{ minWidth: 650 }}
            size="small"
            aria-label="sticky table"
          >
            <TableHead>
              <TableRow>
                <TableCell>👤 Email</TableCell>
                <TableCell align="right">📅 Date</TableCell>
                <TableCell align="right">Edit/Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(user => (
                  <TableRow
                    key={user.email}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {user.email}
                    </TableCell>
                    <TableCell align="right">
                      {user.date.substring(0, 10)}
                    </TableCell>
                    <TableCell align="right">
                      <Link
                        href="#"
                        onClick={() => {
                          handleDelete(user._id);
                        }}
                      >
                        Удалить
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 100]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Container>
  );
};

export default UserList;
