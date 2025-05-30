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
  { id: 5, name: 'Ethan White', email: 'ethan@example.com', phone: '555-0005' },
  { id: 6, name: 'Fiona Adams', email: 'fiona@example.com', phone: '555-0006' },
  { id: 7, name: 'George Hall', email: 'george@example.com', phone: '555-0007' },
  { id: 8, name: 'Hannah Scott', email: 'hannah@example.com', phone: '555-0008' },
  { id: 9, name: 'Ian Moore', email: 'ian@example.com', phone: '555-0009' },
  { id: 10, name: 'Julia Brown', email: 'julia@example.com', phone: '555-0010' },
  { id: 11, name: 'Kevin Green', email: 'kevin@example.com', phone: '555-0011' },
  { id: 12, name: 'Laura Perez', email: 'laura@example.com', phone: '555-0012' },
  { id: 13, name: 'Michael Long', email: 'michael@example.com', phone: '555-0013' },
  { id: 14, name: 'Nina Hughes', email: 'nina@example.com', phone: '555-0014' },
  { id: 15, name: 'Oscar Barnes', email: 'oscar@example.com', phone: '555-0015' },
  { id: 16, name: 'Paula Ross', email: 'paula@example.com', phone: '555-0016' },
  { id: 17, name: 'Quinn Rivera', email: 'quinn@example.com', phone: '555-0017' },
  { id: 18, name: 'Rachel Cox', email: 'rachel@example.com', phone: '555-0018' },
  { id: 19, name: 'Sam Ward', email: 'sam@example.com', phone: '555-0019' },
  { id: 20, name: 'Tina Price', email: 'tina@example.com', phone: '555-0020' },
  { id: 21, name: 'Ulysses Stone', email: 'ulysses@example.com', phone: '555-0021' },
  { id: 22, name: 'Vanessa Diaz', email: 'vanessa@example.com', phone: '555-0022' },
  { id: 23, name: 'Wesley Ford', email: 'wesley@example.com', phone: '555-0023' },
  { id: 24, name: 'Xena Hunter', email: 'xena@example.com', phone: '555-0024' },
  { id: 25, name: 'Yara Kim', email: 'yara@example.com', phone: '555-0025' },
  { id: 26, name: 'Zack Bell', email: 'zack@example.com', phone: '555-0026' },
  { id: 27, name: 'Amber Lane', email: 'amber@example.com', phone: '555-0027' },
  { id: 28, name: 'Bryce Newton', email: 'bryce@example.com', phone: '555-0028' },
  { id: 29, name: 'Carmen Olsen', email: 'carmen@example.com', phone: '555-0029' },
  { id: 30, name: 'Derek Pope', email: 'derek@example.com', phone: '555-0030' },
  { id: 31, name: 'Ella Quinn', email: 'ella@example.com', phone: '555-0031' },
  { id: 32, name: 'Felix Reid', email: 'felix@example.com', phone: '555-0032' },
  { id: 33, name: 'Gloria Shaw', email: 'gloria@example.com', phone: '555-0033' },
  { id: 34, name: 'Harvey Tran', email: 'harvey@example.com', phone: '555-0034' },
  { id: 35, name: 'Isla Underwood', email: 'isla@example.com', phone: '555-0035' },
  { id: 36, name: 'Jake Vega', email: 'jake@example.com', phone: '555-0036' },
  { id: 37, name: 'Kylie Watson', email: 'kylie@example.com', phone: '555-0037' },
  { id: 38, name: 'Liam Xu', email: 'liam@example.com', phone: '555-0038' },
  { id: 39, name: 'Maya Young', email: 'maya@example.com', phone: '555-0039' },
  { id: 40, name: 'Nolan Zimmerman', email: 'nolan@example.com', phone: '555-0040' },
  { id: 41, name: 'Olivia Allen', email: 'olivia@example.com', phone: '555-0041' },
  { id: 42, name: 'Peter Burke', email: 'peter@example.com', phone: '555-0042' },
  { id: 43, name: 'Queenie Clarke', email: 'queenie@example.com', phone: '555-0043' },
  { id: 44, name: 'Ray Daniels', email: 'ray@example.com', phone: '555-0044' },
  { id: 45, name: 'Sophie Evans', email: 'sophie@example.com', phone: '555-0045' },
  { id: 46, name: 'Travis Fields', email: 'travis@example.com', phone: '555-0046' },
  { id: 47, name: 'Ursula Grant', email: 'ursula@example.com', phone: '555-0047' },
  { id: 48, name: 'Victor Hayes', email: 'victor@example.com', phone: '555-0048' },
  { id: 49, name: 'Wendy Irwin', email: 'wendy@example.com', phone: '555-0049' },
  { id: 50, name: 'Xander Jones', email: 'xander@example.com', phone: '555-0050' },
  { id: 51, name: 'Yvonne Kelly', email: 'yvonne@example.com', phone: '555-0051' },
  { id: 52, name: 'Zane Lopez', email: 'zane@example.com', phone: '555-0052' },
  { id: 53, name: 'Abigail Martin', email: 'abigail@example.com', phone: '555-0053' },
  { id: 54, name: 'Brandon Neal', email: 'brandon@example.com', phone: '555-0054' }
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

