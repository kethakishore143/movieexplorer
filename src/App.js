import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home';
import Moviedetails from './Components/Moviedetails/Moviedetails';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/movieexplorer" element={<Home />} />
          <Route path="/movie/:imdbID" element={<Moviedetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
