import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Card from './components/CardMenu.jsx'
import SharedGame from './components/SharedGame';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact component={Card} />
        <Route path="/game/:gameId" component={SharedGame} />
      </Routes>
    </Router>
  );
};

export default App;
