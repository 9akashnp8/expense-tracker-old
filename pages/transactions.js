import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { supabase } from '@/lib/supabaseClient';

export default function BasicTable({transactions}) {
  return (
    <Paper sx={{maxWidth: 650, margin: 'auto'}} >
        <TableContainer component={Paper}>
        <Table aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>Payee/Item</TableCell>
                <TableCell align="right">Amount</TableCell>
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
                <TableCell align="right">{row.amount}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </Paper>
  );
}

export async function getServerSideProps() {
    const { data } = await supabase.from('transaction').select();

    return {
        props: {
            transactions: data
        }
    }
}