import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './Card.css'; // Make sure you have the corresponding CSS for styling

const GamePage = ({ match }) => {
  const { gameId } = match.params; // Get the gameId from the route params
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [lock, setLock] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const optionRefs = useRef([]);

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/game/${gameId}`);
        const data = response.data;
        setUserAnswers(data); // Set the user answers or questions, adjust if needed
        setQuestion(data[index]); // Set the initial question
      } catch (error) {
        console.error('Error fetching game data:', error);
      }
    };

    fetchGameData();
  }, [gameId, index]);

  useEffect(() => {
    if (userAnswers.length > 0 && index < userAnswers.length) {
      setQuestion(userAnswers[index]);
    }
  }, [index, userAnswers]);

  const checkAnswer = (ans) => {
    if (!lock) {
      if (question.ans === ans) {
        optionRefs.current[ans - 1].classList.add('correct');
        setScore(score + 1);
      } else {
        optionRefs.current[question.ans - 1].classList.add('correct');
        optionRefs.current[ans - 1].classList.add('wrong');
      }
      setLock(true);
    }
  };

  const nextQuestion = () => {
    if (lock) {
      if (index < userAnswers.length - 1) {
        setIndex(index + 1);
        setLock(false);
      } else {
        // End of quiz
        alert(`Quiz complete! Your score is ${score}/${userAnswers.length}`);
      }
    }
  };

  return (
    <div className='main'>
      <div className="mainContainer">
        {question ? (
          <>
            <div className="container">
              <h3>Q{index + 1}. {question.question}</h3>
            </div>
            <div className="container2">
              {question.option1 && (
                <button
                  ref={el => optionRefs.current[0] = el}
                  onClick={() => checkAnswer(1)}
                >
                  {question.option1}
                </button>
              )}
              {question.option2 && (
                <button
                  ref={el => optionRefs.current[1] = el}
                  onClick={() => checkAnswer(2)}
                >
                  {question.option2}
                </button>
              )}
              {question.option3 && (
                <button
                  ref={el => optionRefs.current[2] = el}
                  onClick={() => checkAnswer(3)}
                >
                  {question.option3}
                </button>
              )}
              {question.option4 && (
                <button
                  ref={el => optionRefs.current[3] = el}
                  onClick={() => checkAnswer(4)}
                >
                  {question.option4}
                </button>
              )}
            </div>
            <div className="submit">
              <button onClick={nextQuestion}>Next</button>
            </div>
            <div className="index">{index + 1} of {userAnswers.length} questions</div>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default GamePage;
