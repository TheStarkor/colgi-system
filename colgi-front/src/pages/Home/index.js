import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div>
        <Link to="/auto-search">AutoSearch</Link>
      </div>
      <div>
        <Link to="/switch-prompt">SwitchPrompt</Link>
      </div>
      <div>
        <Link to="/rating">Rating</Link>
      </div>
    </>
  )
}

export default Home;
