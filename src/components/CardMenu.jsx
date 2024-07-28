import React, { useState, useRef, useEffect } from 'react';
import '../components/Card.css';
import { data as initialData } from '../components/Question';
import {
  FacebookShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  FacebookIcon,
  WhatsappIcon,
  TelegramIcon,
} from 'react-share';
import axios from 'axios';

const Card = () => {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(initialData[index]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);
  const [showIcons, setShowIcons] = useState(false);
  const [newgame, setNewgame] = useState(false);
  const [userAnswers, setUserAnswers] = useState(Array(initialData.length).fill(null));
  const [selectedOption, setSelectedOption] = useState(null);
  const [shareUrl, setShareUrl] = useState('');

  const option1 = useRef(null);
  const option2 = useRef(null);
  const option3 = useRef(null);
  const option4 = useRef(null);

  const option_array = [option1, option2, option3, option4];

  useEffect(() => {
    const savedAnswers = localStorage.getItem('userAnswers');
    if (savedAnswers) {
      setUserAnswers(JSON.parse(savedAnswers));
    }
  }, []);

  const checkAns = (e, ans) => {
    if (lock === false) {
      if (question.ans === ans) {
        e.target.classList.add('correct');
        setLock(true);
        setScore(score => score + 1);
      } else {
        e.target.classList.add('wrong');
        setLock(true);
        option_array[question.ans - 1].current.classList.add('correct');
      }
    }
  };

  const next = () => {
    if (lock === true) {
      if (index === initialData.length - 1) {
        setResult(true);
        return 0;
      }
      const newIndex = index + 1;
      setIndex(newIndex);
      setQuestion(initialData[newIndex]);
      setLock(false);
      option_array.forEach(option => {
        option.current.classList.remove('wrong');
        option.current.classList.remove('correct');
        // option.current.classList.remove('selected'); // Remove the 'selected' class
      });
      setSelectedOption(null);
    }
  };

  const saveAnswer = (e, ans) => {
    const newAnswers = [...userAnswers];
    newAnswers[index] = ans;
    setUserAnswers(newAnswers);

    // Save to local storage
    localStorage.setItem('userAnswers', JSON.stringify(newAnswers));

    // Log saved answers
    console.log('Saved Answers:', newAnswers);

    

    // Add the 'selected' class to the clicked button
    e.target.classList.add('selected');

    // setTimeout(() => {
    //   option_array.forEach(option => {
    //     if (option.current && option.current !== e.target) {
    //       option.current.classList.remove('selected');
    //     }
    //   });
  
      // Proceed to the next question or show result after a delay
      setTimeout(() => {if (index < initialData.length - 1) {
        const newIndex = index + 1;
        setIndex(newIndex);
        setQuestion(initialData[newIndex]);
        setLock(false);
        option_array.forEach(option => {
          option.current.classList.remove('selected');
        });
      } else {
        setResult(true);
      }
    }, 500); // Delay before moving to next question or showing result
  };
    


  const handleOptionClick = (e, ans) => {
    if (newgame) {
      setSelectedOption(ans);
      saveAnswer(e, ans);
    } else {
      checkAns(e, ans);
    }
  };

  const reset = () => {
    setIndex(0);
    setQuestion(initialData[0]);
    setScore(0);
    setLock(false);
    setResult(false);
    setShowIcons(false);
    setUserAnswers(Array(initialData.length).fill(null));
    localStorage.removeItem('userAnswers');
  };

  const handleShareClick = () => {
    setShowIcons(!showIcons);
  };

  const shareGame = async() => {
    reset();
    setNewgame(true);
    const gameId = Date.now().toString(); // Unique game ID
    await axios.post('http://localhost:5000/save-game', {
      gameId,
      gameData: userAnswers,
    });
    const shareLink = `${window.location.origin}/game/${gameId}`;
    setShareUrl(shareLink);
  };

  const handleCreateAndShareGame = () => {
    shareGame();
    setNewgame(true); // Ensure newgame is set to true

    
  };

  const url = window.location.href;

  return (
    <div className='main'>
      <div className="mainContainer">
        {result ? (
          <>
            { newgame? <h3 className='shareNewGAme'>Check how much Your Friends know you</h3>:
            <h2 className='score'>Your score is {score} out of {initialData.length}</h2>
            }
            {
              newgame? <button className='ShareGame' onClick={handleShareClick} >Share Your Game
              </button>:<button className='Reset' onClick={handleCreateAndShareGame}>Create Your Own Game</button>
            }
            {newgame?'':
            <button className='createButton' onClick={handleShareClick}>
              {showIcons ? 'Hide Share Options' : 'Share Your Score'}
            </button>}
            {showIcons && (
              <div className='shareButtons'>
                <FacebookShareButton url={url}>
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
                <WhatsappShareButton url={url}>
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>
                <TelegramShareButton url={url}>
                  <TelegramIcon size={32} round />
                </TelegramShareButton>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="container">
              <h3>Q{index + 1}. {question.question}</h3>
            </div>
            <div className="container2">
              <button ref={option1} onClick={(e) => handleOptionClick(e, 1)}>{question.option1}</button><br /><br />
              <button ref={option2} onClick={(e) => handleOptionClick(e, 2)}>{question.option2}</button><br /><br />
              <button ref={option3} onClick={(e) => handleOptionClick(e, 3)}>{question.option3}</button><br /><br />
              <button ref={option4} onClick={(e) => handleOptionClick(e, 4)}>{question.option4}</button><br /><br />
            </div>
            <div className="submit">
              {newgame ? '' : <button onClick={next}>Next</button>}
            </div>
            <div className="index">{index + 1} of {initialData.length} questions</div>
          </>
        )}
      </div>
    </div>
  );
};

export default Card;
