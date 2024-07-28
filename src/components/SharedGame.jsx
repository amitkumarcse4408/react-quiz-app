import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../components/Card.css';

const SharedGame = () => {
  const { gameId } = useParams();
  const [gameData, setGameData] = useState(null);
  const [index, setIndex] = useState(0);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/game/${gameId}`);
        setGameData(response.data);
      } catch (error) {
        console.error('Error fetching game data:', error);
      }
    };

    fetchGameData();
  }, [gameId]);

  const handleOptionClick = (e, ans) => {
    if (!lock) {
      if (gameData[index].ans === ans) {
        e.target.classList.add('correct');
        setScore(score + 1);
      } else {
        e.target.classList.add('wrong');
      }
      setLock(true);
      setTimeout(() => {
        if (index < gameData.length - 1) {
          setIndex(index + 1);
          setLock(false);
        } else {
          setResult(true);
        }
      }, 500);
    }
  };

  if (!gameData) {
    return <div>Loading...</div>;
  }

  return (
    <div className='main'>
      <div className="mainContainer">
        {result ? (
          <h2 className='score'>Your score is {score} out of {gameData.length}</h2>
        ) : (
          <>
            <div className="container">
              <h3>Q{index + 1}. {gameData[index].question}</h3>
            </div>
            <div className="container2">
              <button onClick={(e) => handleOptionClick(e, 1)}>{gameData[index].option1}</button><br /><br />
              <button onClick={(e) => handleOptionClick(e, 2)}>{gameData[index].option2}</button><br /><br />
              <button onClick={(e) => handleOptionClick(e, 3)}>{gameData[index].option3}</button><br /><br />
              <button onClick={(e) => handleOptionClick(e, 4)}>{gameData[index].option4}</button><br /><br />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SharedGame;
