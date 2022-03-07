import React, { useState, useEffect, useCallback } from 'react';
import { Box, Button } from '@mui/material';
import {
  DataGrid,
  GridToolbar,
  StyledGridOverlay,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
  ruRU,
} from '@mui/x-data-grid';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const currencyFormatter = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
});

const rubPrice = {
  type: 'number',
  width: 130,
  valueFormatter: ({ value }) =>
    value ? currencyFormatter.format(Number(value)) : '-',
  cellClassName: 'font-tabular-nums',
};

const columns = [
  // { field: '_id', headerName: 'ID', width: 200 },
  { field: 'domain', headerName: 'Адрес сайта', minWidth: 150, maxWidth: 350 },
  {
    field: 'title',
    headerName: 'Заголовок сайта',
    minWidth: 150,
    maxWidth: 250,
  },
  {
    field: 'traffic',
    headerName: 'Траффик',
    type: 'number',
  },
  {
    field: 'direct',
    headerName: 'Прямые заходы',
    type: 'number',
  },
  {
    field: 'organic',
    headerName: 'Орг. траффик',
    type: 'number',
  },
  {
    field: 'evaluate_max',
    headerName: 'Макс стоимость',
    ...rubPrice,
  },
  {
    field: 'evaluate_middle',
    headerName: 'Ср. стоимость',
    ...rubPrice,
  },
  {
    field: 'evaluate_min',
    headerName: 'Мин стоимость',
    ...rubPrice,
  },
  {
    field: 'profit_await',
    headerName: 'Ожидаемый доход',
    ...rubPrice,
  },
  {
    field: 'traffic_season',
    headerName: 'Сезонный',
    type: 'number',
  },
  // {
  //   field: 'actions',
  //   headerName: 'Действия',
  //   getActions: params => [
  //     <GridActionsCellItem label="Delete" />,
  //     <GridActionsCellItem label="Print" showInMenu />,
  //   ],
  // },
  {
    field: 'actions',
    headerName: 'Действия',
    getActions: params => [<button>Fff</button>],
  },
  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   valueGetter: params =>
  //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  // },
];

const DomainGrid = () => {
  const { id } = useParams();
  const [domains, setDomains] = useState([]);
  const [domainsArray, setDomainsArray] = useState([]);

  const getDomains = useCallback(() => {
    axios
      .get('http://localhost:5000/project/' + id)
      .then(res => {
        // console.log(res.data);
        setDomains(res.data);
      })
      .catch(e => console.log(e));
  }, [id]);

  useEffect(() => {
    getDomains();
  }, [getDomains, id]);

  const nahdleSelectRow = rows => {
    const dom = domains.map(el => {
      return { _id: el._id, domain: el.domain };
    });
    // console.log('dom', dom);
    const domainsArray = dom.filter(
      el => el._id === rows.find(item => item === el._id)
    );
    // console.log('domainsArray', domainsArray);
    setDomainsArray(domainsArray);
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/megaindex', domainsArray)
      .then(res => {
        console.log('handleSubmit', res.data);
        getDomains();
      })
      .catch(e => console.log(e));
  };

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
        <Button>Спарсить</Button>
        <Button>В черный список</Button>
        <Button>Удалить</Button>
      </GridToolbarContainer>
    );
  }

  return (
    <Box
      sx={{
        height: '100vh',
        width: 1,
        '& .super-app-theme--Yes': {
          bgcolor: '#d2d2d2',
          // '&:hover': {
          //   bgcolor: 'red',
          // },
        },
      }}
    >
      <DataGrid
        components={{
          Toolbar: CustomToolbar,
        }}
        loading={domains.length === 0}
        localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
        rows={domains}
        columns={columns}
        pageSize={25}
        rowHeight={25}
        getRowId={row => row._id}
        rowsPerPageOptions={[5, 25]}
        checkboxSelection
        onSelectionModelChange={nahdleSelectRow}
        getRowClassName={params =>
          `super-app-theme--${params.row.traffic == null ? 'Yes' : 'No'}`
        }
      />
      <button type="submit" onClick={handleSubmit}>
        Спарсить
      </button>
    </Box>
  );
};

export default DomainGrid;
