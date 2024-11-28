import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import Page1 from './Pages/Page';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/page" element={<Page1 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
