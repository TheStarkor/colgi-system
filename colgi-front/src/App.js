import axios from "axios"
import { BrowserRouter } from "react-router-dom";

import Router from "./router";
import 'antd/dist/antd.css';

function App() {
  axios.defaults.baseURL = "http://localhost:5001";

  return (
    <div className="App" style={{padding: '30px'}}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
