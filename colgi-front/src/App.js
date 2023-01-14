import axios from "axios"
import { BrowserRouter } from "react-router-dom";

import Router from "./router";
import 'antd/dist/antd.css';

function App() {
  axios.defaults.baseURL = "https://75ee-2001-e60-a014-d40-497d-80d9-31bb-cb63.jp.ngrok.io";

  return (
    <div className="App"
      //style={{padding: '30px'}}
    >
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
