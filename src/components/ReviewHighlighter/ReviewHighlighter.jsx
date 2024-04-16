import './reviewHighlighter.css'

const ReviewHighlighter = (props) => {
  const { content, sentiment, topic } = props;
  console.log("got content is ", content)
  return (
    <span className={`highlighter ${sentiment.toLowerCase()}`} title={topic}>
      {content}
    </span>
  )
};

export default ReviewHighlighter;
