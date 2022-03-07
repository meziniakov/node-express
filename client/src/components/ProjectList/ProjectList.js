import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAlert from '../../hooks/alert.hook';
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

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
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
      .get('/project/')
      .then(response => {
        setProjects(response.data);
        // console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  function handleDelete(id) {
    axios
      .delete('/project/' + id)
      .then(res => {
        alert(res.data.message);
        setProjects(projects.filter(el => el._id !== id));
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
                <TableCell>👤 Title</TableCell>
                <TableCell align="right">🔥 Keyword</TableCell>
                <TableCell align="right">🔥 Count</TableCell>
                <TableCell align="right">📅 Date</TableCell>
                <TableCell align="right">Edit/Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(project => (
                  <TableRow
                    key={project._id}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      <Link href={project._id}>{project.title}</Link>
                    </TableCell>
                    <TableCell align="right">{project.keyword}</TableCell>
                    <TableCell align="right">{project.count}</TableCell>
                    <TableCell align="right">
                      {project.date.substring(0, 10)}
                    </TableCell>
                    <TableCell align="right">
                      <Link
                        href="#"
                        onClick={() => {
                          handleDelete(project._id);
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
          count={projects.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Container>
  );
};

export default ProjectList;
