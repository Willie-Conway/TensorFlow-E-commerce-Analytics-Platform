// client/src/components/customers/Customers.js
import React, { useState, useMemo } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
} from '@mui/material';

// Sample data — replace with API call or redux state later
const sampleCustomers = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', phone: '555-1234' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', phone: '555-5678' },
  { id: 3, name: 'Charlie Lee', email: 'charlie@example.com', phone: '555-8765' },
  { id: 4, name: 'Diana King', email: 'diana@example.com', phone: '555-4321' },
  // ...more customers
];

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  // Filter customers by search term (name or email)
  const filteredCustomers = useMemo(() => {
    return sampleCustomers.filter(c =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(0); // reset page on new search
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Customers
      </Typography>

      <TextField
        label="Search customers"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ mb: 2, maxWidth: 400 }}
      />

      <Paper elevation={3}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Email</strong></TableCell>
                <TableCell><strong>Phone</strong></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredCustomers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(({ id, name, email, phone }) => (
                  <TableRow key={id}>
                    <TableCell>{name}</TableCell>
                    <TableCell>{email}</TableCell>
                    <TableCell>{phone}</TableCell>
                  </TableRow>
                ))}

              {filteredCustomers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No customers found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={filteredCustomers.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[]}
        />
      </Paper>
    </Box>
  );
};

export default Customers;

