import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Stack,
  Typography,
  Paper,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TableDeleteButton from '../../components/Buttons/TableDeleteButton';
import TableEditButton from '../../components/Buttons/TableEditButton';

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const DataGridTable = ({ data }) => {
  const [filteredData, setFilteredData] = useState(data);
  const [searchText, setSearchText] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  
  // Extract unique categories for filter dropdown
  const categories = ['all', ...new Set(data.map(item => item.category))];

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  useEffect(() => {
    applyFilters();
  }, [searchText, categoryFilter, dateFrom, dateTo, data]);

  const applyFilters = () => {
    let result = [...data];
    
    // Apply search filter
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      result = result.filter(item =>
        item.name.toLowerCase().includes(searchLower) ||
        item.category.toLowerCase().includes(searchLower) ||
        (item.price && item.price.toString().includes(searchLower))
      );
    }
    
    // Apply category filter
    if (categoryFilter !== 'all') {
      result = result.filter(item => item.category === categoryFilter);
    }
    
    // Apply date range filter
    if (dateFrom) {
      result = result.filter(item => new Date(item.date) >= new Date(dateFrom));
    }
    
    if (dateTo) {
      // Include the entire day selected in "dateTo"
      const endOfDay = new Date(dateTo);
      endOfDay.setHours(23, 59, 59, 999);
      result = result.filter(item => new Date(item.date) <= endOfDay);
    }
    
    setFilteredData(result);
  };

  const handleResetFilters = () => {
    setSearchText('');
    setCategoryFilter('all');
    setDateFrom(null);
    setDateTo(null);
  };

  const columns = [
    { 
      field: 'actions', 
      headerName: 'Actions', 
      width: 150,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <TableEditButton onClick={() => handleEdit(params.row.id)} />
          <TableDeleteButton onClick={() => handleDelete(params.row.id)} />
        </Stack>
      ),
      sortable: false,
      filterable: false,
    },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'price', headerName: 'Price', width: 120, type: 'number' },
    { field: 'category', headerName: 'Category', width: 150 },
    { 
      field: 'date', 
      headerName: 'Date', 
      width: 150,
      type: 'date',
      valueGetter: (params) => new Date(params.row.date),
      valueFormatter: (params) => {
        if (!params.value) return '';
        return params.value.toLocaleDateString();
      },
    },
  ];

  const handleEdit = (id) => {
    console.log('Edit item with id:', id);
    // Implement your edit logic here
  };

  const handleDelete = (id) => {
    console.log('Delete item with id:', id);
    // Implement your delete logic here
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
        Lenders Management
      </Typography>
      
      {/* Filter Controls */}
      <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ minWidth: 250 }}
        />
        
        <TextField
          select
          label="Category"
          size="small"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          sx={{ minWidth: 150 }}
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </TextField>
        
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Date From"
            value={dateFrom}
            onChange={(newValue) => setDateFrom(newValue)}
            renderInput={(params) => (
              <TextField {...params} size="small" sx={{ minWidth: 150 }} />
            )}
          />
          <DatePicker
            label="Date To"
            value={dateTo}
            onChange={(newValue) => setDateTo(newValue)}
            renderInput={(params) => (
              <TextField {...params} size="small" sx={{ minWidth: 150 }} />
            )}
          />
        </LocalizationProvider>
        
        <Button
          variant="outlined"
          onClick={handleResetFilters}
          sx={{ height: 40 }}
        >
          Reset Filters
        </Button>
      </Box>
      
      {/* DataGrid */}
      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={filteredData}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5, 10, 25, 50]}
          checkboxSelection
          disableSelectionOnClick
          components={{
            Toolbar: CustomToolbar,
          }}
          sx={{
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f5f5f5',
            },
            '& .MuiDataGrid-cell': {
              borderRight: '1px solid #f0f0f0',
            },
          }}
        />
      </Box>
    </Paper>
  );
};

export default DataGridTable;