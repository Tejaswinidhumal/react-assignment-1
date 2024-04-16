import Review from "../Review/Review";

const ReviewList = (props) => {
  const { reviews } = props;

  const reviewsComponents = reviews.map((review, idx) => (
    <Review review={review} key={idx} />
  ));

  return <>{reviewsComponents}</>;
};

export default ReviewList;
