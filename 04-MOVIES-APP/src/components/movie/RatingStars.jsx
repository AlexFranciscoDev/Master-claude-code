import { formatRating } from '../../utils/formatters';
import './RatingStars.css';

export function RatingStars({ voteAverage }) {
  return (
    <span className="rating-stars">
      <span className="rating-stars__icon" aria-hidden="true">
        ★
      </span>
      {formatRating(voteAverage)}
    </span>
  );
}
