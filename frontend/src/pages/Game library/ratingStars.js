import React from 'react';
import { Star, StarBorder } from '@mui/icons-material';

const RatingStars = ({ rating }) => {
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - filledStars - (hasHalfStar ? 1 : 0);

  const starIcon = (filled) => (
    filled ? <Star style={{ color: 'yellow' }} /> : <StarBorder style={{ color: 'yellow' }} />
  );

  return (
    <div>
      {[...Array(filledStars)].map((_, index) => (
        <span key={index}>{starIcon(true)}</span>
      ))}
      {hasHalfStar && <span>{starIcon(false)}</span>}
      {[...Array(emptyStars)].map((_, index) => (
        <span key={index}>{starIcon(false)}</span>
      ))}
    </div>
  );
};

export default RatingStars;
