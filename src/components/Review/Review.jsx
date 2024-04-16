import ReviewHighlighter from "../ReviewHighlighter/ReviewHighlighter";
import "./review.css";
import filledStar from "../../assets/filled-star.svg";
import blankStar from "../../assets/empty-star.svg";
import reactLogo from "../../assets/react.svg";

const processHighlightIndices = (review) => {
  const highlights = review.analytics.flatMap((analytic) =>
    analytic.highlight_indices.map((indice) => ({
      start: indice[0],
      end: indice[1],
      sentiment: indice[2],
      topic: analytic.topic,
    }))
  );
  highlights.sort((a, b) => a.start - b.start);
  return highlights;
};

const createReviewContentComponents = (review) => {
  const highlights = processHighlightIndices(review);
  const { content: reviewContent } = review;
  let lastProcessedIndex = 0;
  const reviewContentComponents = [];
  highlights.forEach((highlight, idx) => {
    const { start, end, sentiment, topic } = highlight;
    const preHighlightContent = reviewContent.substring(
      lastProcessedIndex,
      start
    );
    if (preHighlightContent) {
      reviewContentComponents.push(preHighlightContent);
    }
    reviewContentComponents.push(
      <ReviewHighlighter
        key={idx}
        content={reviewContent.substring(start, end)}
        sentiment={sentiment}
        topic={topic}
      />
    );
    lastProcessedIndex = end;
  });
  reviewContentComponents.push(reviewContent.substring(lastProcessedIndex));
  return reviewContentComponents;
};

const createRatingComponents = (review) => {
  const maximumRating = review.out_of;
  const givenRating = Math.min(review.rating_review_score, maximumRating);
  const filledStarCount = Math.floor(givenRating / (maximumRating / 5));

  return Array(5)
    .fill(null)
    .map((_, i) => (
      <img
        key={i}
        className="star-image"
        src={i < filledStarCount ? filledStar : blankStar}
        alt={i < filledStarCount ? "Filled Star" : "Empty Star"}
      />
    ));
};

const Review = ({ review }) => {
  const reviewContentComponents = createReviewContentComponents(review);

  const ratingStars = createRatingComponents(review);

  return (
    <div className="review-card">
      <img src={reactLogo} className="person-image" alt="Reviewer" />
      <div>
        <div>
          <p>
            <span className="reviewer-name">{review.reviewer_name}</span> wrote
            review on <span className="source-name">{review.source.name}</span>
          </p>
          <p className="rating-and-date">
            <span className="stars-card">{ratingStars}</span> {review.date}
          </p>
        </div>
        <div className="review-content">{reviewContentComponents}</div>
      </div>
    </div>
  );
};

export default Review;
