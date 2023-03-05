import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import Link from 'next/link';

import { supabase } from '@/lib/supabaseClient';

export default function BasicTable({transactions}) {
  return (
    <Paper sx={{maxWidth: 650, margin: 'auto'}} >
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Transactions
                </Typography>
                <Button 
                    color="inherit"
                    component={Link}
                    href='/transactions/add/'
                >
                    Add New
                </Button>
                </Toolbar>
            </AppBar>
        </Box>
        <TableContainer component={Paper}>
        <Table aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>Payee/Item</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Account</TableCell>
                <TableCell>labels</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {transactions.map((row) => (
                <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row">
                        {row.item}
                    </TableCell>
                    <TableCell>{row.amount}</TableCell>
                    <TableCell>{row.category.name}</TableCell>
                    <TableCell>{row.account.name}</TableCell>
                    <TableCell>{row.label}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </Paper>
  );
}

export async function getServerSideProps() {
    const { data } = await supabase
        .from('transaction')
        .select(`
            item,
            amount,
            category ( name ),
            account ( name ),
            label,
            notes
        `);

    return {
        props: {
            transactions: data
        }
    }
}