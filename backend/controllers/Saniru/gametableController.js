import React from 'react';
import GameTable from './GameTable';

const GameTableController = () => {
    const games = [
        { id: 1, name: 'Game 1', description: 'Description 1', genre: 'Action' },
        { id: 2, name: 'Game 2', description: 'Description 2', genre: 'Adventure' },
        { id: 3, name: 'Game 3', description: 'Description 3', genre: 'Puzzle' },
    ];

    const handleUpdate = (id) => {
        console.log(`Update game with ID: ${id}`);
    };

    const handleDelete = (id) => {
        console.log(`Delete game with ID: ${id}`);
    };

    return <GameTable games={games} handleUpdate={handleUpdate} handleDelete={handleDelete} />;
};

export default GameTableController;
