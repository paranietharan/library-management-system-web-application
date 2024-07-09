import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function FineTable({ fineHistory }) {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Fine ID</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Paid Status</TableCell>
                        <TableCell>Resource Issue Date</TableCell>
                        <TableCell>Member ID</TableCell>
                        <TableCell>Resource ID</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {fineHistory.map((fine) => (
                        <TableRow key={fine.fineId}>
                            <TableCell>{fine.fineId}</TableCell>
                            <TableCell>${fine.amount.toFixed(2)}</TableCell>
                            <TableCell>{fine.paidStatus ? 'Paid' : 'Unpaid'}</TableCell>
                            <TableCell>{new Date(fine.resourceIssueDate).toLocaleDateString()}</TableCell>
                            <TableCell>{fine.memberId}</TableCell>
                            <TableCell>{fine.resourceId}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default FineTable;