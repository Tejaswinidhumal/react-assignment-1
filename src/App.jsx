import "./App.css";
import reviews from "../reviews_data.json";
import ReviewList from "./components/ReviewList/ReviewList";

function App() {
  return <ReviewList reviews={reviews} />;
}

export default App;
