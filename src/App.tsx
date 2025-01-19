import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import Content, { NavBar } from "./routes";
import store from "./redux";

import "./App.css";


import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="sjs-client-app">
            <NavBar />
          <main className="sjs-client-app__content">
            <Content />
          </main>
          <footer className="sjs-client-app__footer"></footer>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
