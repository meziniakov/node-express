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
import { useMessage } from '../../hooks/message.hook';

const BasicTable = () => {
  const [domains, setDomains] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const message = useMessage();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    axios
      .get('http://localhost:5000/domain/')
      .then(response => {
        // console.log(response.data);
        setDomains(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  function handleDelete(id) {
    axios
      .delete('http://localhost:5000/domain/' + id)
      .then(res => {
        // console.log(res);
        message(res.data.message);
        setDomains(domains.filter(el => el._id !== id));
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
                <TableCell>👤 Domain</TableCell>
                <TableCell align="right">📙 Traffic</TableCell>
                <TableCell align="right">🔥 Direct</TableCell>
                <TableCell align="right">🔥 Organic</TableCell>
                <TableCell align="right">📅 Date</TableCell>
                <TableCell align="right">Edit/Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {domains
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(domain => (
                  <TableRow
                    key={domain.domain}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {domain.domain}
                    </TableCell>
                    <TableCell align="right">{domain.traffic}</TableCell>
                    <TableCell align="right">{domain.direct}</TableCell>
                    <TableCell align="right">{domain.organic}</TableCell>
                    <TableCell align="right">
                      {domain.date.substring(0, 10)}
                    </TableCell>
                    <TableCell align="right">
                      <Link
                        href="#"
                        onClick={() => {
                          handleDelete(domain._id);
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
          count={domains.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Container>
  );
};

export default BasicTable;
