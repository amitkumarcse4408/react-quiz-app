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
  const [showIcons1,setShowIcons1]=useState(false);
  const [newgame, setNewgame] = useState(false);
  const [userAnswers, setUserAnswers] = useState(Array(initialData.length).fill(null));
  const [selectedOption, setSelectedOption] = useState(null);
  const [shareUrl, setShareUrl] = useState(window.location.href);

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

    // Proceed to the next question or show result after a delay
    setTimeout(() => {
      if (index < initialData.length - 1) {
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
    setShowIcons1(false);
    setUserAnswers(Array(initialData.length).fill(null));
    localStorage.removeItem('userAnswers');
  };

  const shareNewGame=async () =>{
    const gameId = Date.now().toString(); // Unique game ID
    await axios.post('http://localhost:5173/save-game', {
      gameId,
      gameData: userAnswers,
    });
    const shareLink = `${window.location.origin}/game/${gameId}`;
    setShareUrl(shareLink);
    setShowIcons1(true);
  }
  // console.log(shareUrl);

  const handleShareClick = () => {
    setShowIcons(!showIcons);
    shareNewGame();
  };

  const shareGame = () => {
    reset();
    setNewgame(true);
    
  };

  const handleCreateAndShareGame = () => {
    shareGame();
  };

  const handleWhatsappShare = () => {
    const message = `🎉 I just scored ${score} out of ${initialData.length} in this amazing quiz! 🏆, don't worry i will get to know more about you slowly 😄 and going to share great bond as a friend 🤝 🌟 Zindagi Zindabad 🤘  *And if you want i can share the screenshot also type Yes or No* `;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleWhatsappShare1 = () => {
    const message = `🎉 Click and play the game created by your friend: ${shareUrl} `;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };
  const handleFacebookShare = () => {
    // Facebook handles sharing via a dialog, no direct URL modification for message
  };

  const handleTelegramShare = () => {
    const message = `🎉 I just scored ${score} out of ${initialData.length} in this amazing quiz! 🏆, don't worry i will get to know more about you slowly 😄 and going to share great bond as a friend 🤝 🌟 Zindagi Zindabad 🤘  *And if you want i can share the screenshot also type Yes or No*  😎🚀`;
    const encodedMessage = encodeURIComponent(message);
    const telegramUrl = `https://t.me/share/url?url=${window.location.href}&text=${encodedMessage}`;
    window.open(telegramUrl, '_blank');
  };
  const handleTelegramShare1 = () => {
    const message = `🎉 Click and play the game created by your friend: ${shareUrl}  😎🚀`;
    const encodedMessage = encodeURIComponent(message);
    const telegramUrl = `https://t.me/share/url?url=${window.location.href}&text=${encodedMessage}`;
    window.open(telegramUrl, '_blank');
  };
  return (
    <div className='main'>
      <div className="mainContainer">
        {result ? (
          <>
            {newgame ? <h4 className='shareNewGAme'>Check how much Your Friends know you</h4> :
              <h4 className='score'>Your score is {score} out of {initialData.length}</h4>
            }
            {newgame ? <button className='ShareGame' onClick={handleShareClick}>Share Your Game
            </button> 
            : <button className='Reset' onClick={handleCreateAndShareGame}>Create Your Own Game</button>
            }
            {showIcons1 && (
              <div className='shareButtons'>
                <FacebookShareButton 
            url={shareUrl} 
            quote={`Click and play the game created by your friend`}
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>
                <button onClick={handleWhatsappShare1}>
                  <WhatsappIcon size={32} round />
                </button>
                <button onClick={handleTelegramShare1}>
                  <TelegramIcon size={32} round />
                </button>
              </div>
            )}
            {newgame?'':
            <button className='createButton' onClick={handleShareClick}>
              {showIcons ? 'Hide Share Options' : 'Share Your Score'}
            </button>}
            {showIcons && (
              <div className='shareButtons'>
                <FacebookShareButton 
            url={shareUrl} 
            quote={`🎉 I just scored ${score} out of ${initialData.length} in this amazing quiz! 🏆, don't worry I will get to know more about you slowly 😄 and going to share a great bond as a friend 🤝 🌟 Zindagi Zindabad 🤘 *And if you want I can share the screenshot also type Yes or No* 😎🚀`}
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>
                <button onClick={handleWhatsappShare}>
                  <WhatsappIcon size={32} round />
                </button>
                <button onClick={handleTelegramShare}>
                  <TelegramIcon size={32} round />
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="container">
              <h5>Q{index + 1}. {question.question}</h5>
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
