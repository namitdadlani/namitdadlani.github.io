import { Route, Routes } from 'react-router-dom';
import './App.css';
import WebDevProgress from './pages/WebDevProgress';
import Projects from './pages/Projects'
import Homepage from './pages/Homepage'

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <h2>~ Hello! ~</h2>
        <h3>
          This website is under construction and will be up soon!
        </h3>
        <p>Till then you can check out my <a href="https://www.linkedin.com/in/namit-dadlani" className='App-link'>Linkedin</a>.</p>
      </header> */}
      {/* <WebDevProgress /> */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </div>
  );
}

export default App;
