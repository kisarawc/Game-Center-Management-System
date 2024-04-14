// GameTable.js
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const GameTable = ({ games, handleUpdate, handleDelete }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Game ID</TableCell>
                        <TableCell>Game Name</TableCell>
                        <TableCell>Game Description</TableCell>
                        <TableCell>Genre</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {games.map((game) => (
                        <TableRow key={game.id}>
                            <TableCell>{game.id}</TableCell>
                            <TableCell>{game.name}</TableCell>
                            <TableCell>{game.description}</TableCell>
                            <TableCell>{game.genre}</TableCell>
                            <TableCell>
                                <Button variant="contained" color="primary" onClick={() => handleUpdate(game.id)}>Update</Button>
                                <Button variant="contained" color="secondary" onClick={() => handleDelete(game.id)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default GameTable;
