import {  BrowserRouter as Router} from "react-router-dom";
import './css/App.css';
import './css/login.css';
import './css/admin.css';
import DieuHuongURL from './router/DieuHuongURL';

function App() {
    return (
      <Router>
        <DieuHuongURL />
      </Router>
    );
}

export default App;