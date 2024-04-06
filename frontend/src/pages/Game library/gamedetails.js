import React from 'react';
import { useParams } from 'react-router-dom'; // Assuming you're using React Router for navigation

const GameDetailPage = () => {
  const { gameId } = useParams();

  // Hardcoded game details
  const gameDetails = {
    title: "Example Game",
    description: "This is a sample game description. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    ratings: "4.5/5"
    // Add more details here as needed
  };

  return (
    <div>
      <h2>{gameDetails.title}</h2>
      <p>Description: {gameDetails.description}</p>
      <p>Ratings: {gameDetails.ratings}</p>
      {/* Add more details here as needed */}
    </div>
  );
};

export default GameDetailPage;
