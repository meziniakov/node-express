import React, { useEffect, useState } from 'react';
import useAlert from '../../hooks/alert.hook';
import axios from 'axios';
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
      .get('/api/project/')
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
      .delete('/api/project/' + id)
      .then(res => {
        alert(res.data.message);
        setProjects(projects.filter(el => el._id !== id));
      })
      .catch(e => console.log(e));
  }

  function handleParser(e, project) {
    e.preventDefault();
    const postData = {
      projectId: project._id,
      keywords: project.keywords,
      count: project.count,
    };
    console.log(postData);
    axios
      .post('/api/parser', postData)
      .then(res =>
        res.data.status === 'error'
          ? alert(res.data.message, 'error')
          : alert(res.data.message, 'success')
      )
      .catch(e => alert(e.message, 'error'));
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
                <TableCell>👤 Тематика сайтов</TableCell>
                <TableCell align="right">🔥 Ключевые слова</TableCell>
                <TableCell align="right">🔥 Доход на посетителя</TableCell>
                <TableCell align="right">🔥 Страниц выдачи</TableCell>
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
                    <TableCell align="right">
                      {project.keywords.join('\n')}
                    </TableCell>
                    <TableCell align="right">
                      {project.profitPerVisitor}
                    </TableCell>
                    <TableCell align="right">{project.count}</TableCell>
                    <TableCell align="right">
                      {project.date.substring(0, 10)}
                    </TableCell>
                    <TableCell align="right">
                      <Link
                        href={'/project/' + project._id}
                        onClick={e => {
                          handleParser(e, project);
                        }}
                      >
                        Парсинг
                      </Link>
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
