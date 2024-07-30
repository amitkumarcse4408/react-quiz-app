import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Card from './components/CardMenu.jsx'
//import SharedGame from './components/SharedGame';
import GamePage from './components/GamePage.jsx';
import Navbar from './components/Nav.jsx';

const App = () => {
  return (
    <>
    <Navbar/>
    <Router>
      <Routes>
        <Route path="/" exact component={Card} />
        <Route path="/game/:gameId" component={GamePage} />
      </Routes>
    </Router>
    </>
  );
};

export default App;
