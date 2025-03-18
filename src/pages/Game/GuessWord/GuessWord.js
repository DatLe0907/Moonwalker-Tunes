import { useState, useEffect, useCallback, useMemo } from "react";
import { useGame } from "../../context/PointsContext";
import "./GuessWord.css";
import "./GuessWord-responsive.css";
import confetti from "canvas-confetti";


export default function GuessWord({ onClose, autoStart }) {
  const wordList = useMemo(() => [
      { word: "Thriller", hint: "Best-selling album of all time" },
      { word: "Moonwalk", hint: "Signature dance move" },
      { word: "Beat It", hint: "Hit song with a famous guitar solo" },
      { word: "Neverland", hint: "Michael Jackson's ranch name" },
      { word: "Glove", hint: "Iconic fashion accessory" },
      { word: "Bad", hint: "1987 album with hit songs like 'Smooth Criminal'" },
      { word: "Dangerous", hint: "1991 album featuring 'Black or White'" },
      { word: "Billie Jean", hint: "Hit song about a girl claiming he’s the father of her son" },
      { word: "Off The Wall", hint: "Album released before 'Thriller'" },
      { word: "This Is It", hint: "Final concert tour that was never completed" },
      { word: "MJ", hint: "His initials" },
      { word: "Heal The World", hint: "Song promoting global peace" },
      { word: "Black Or White", hint: "Song about racial harmony" },
      { word: "We Are The World", hint: "Charity song co-written with Lionel Richie" },
      { word: "HIStory", hint: "1995 double album with past hits and new songs" },
      { word: "Ghosts", hint: "1996 short film featuring Michael as multiple characters" },
      { word: "Smooth Criminal", hint: "Song featuring the iconic anti-gravity lean" },
      { word: "MJ One", hint: "Cirque du Soleil show inspired by his music" },
      { word: "Thriller Dance", hint: "Famous dance routine from the 'Thriller' video" },
      { word: "King Of Pop", hint: "His famous nickname" },
      { word: "Jackson Five", hint: "Group he started in with his brothers" },
      { word: "ABC", hint: "Jackson 5 song about learning the basics" },
      { word: "Ben", hint: "Early solo song about a pet rat" },
      { word: "Invincible", hint: "Last studio album released in 2001" },
      { word: "Jam", hint: "Song featuring Michael Jordan in the music video" },
      { word: "Earth Song", hint: "Song about environmental issues" },
      { word: "Dangerous Tour", hint: "Tour that was cut short due to health issues" },
      { word: "Morphine", hint: "Song discussing painkiller addiction" },
      { word: "Michael", hint: "His first name" },
      { word: "Jackson", hint: "His last name" },
      { word: "Sony", hint: "Music label he was associated with" },
      { word: "Joseph", hint: "His father’s first name" },
      { word: "Janet", hint: "His famous sister" },
      { word: "Lisa Marie", hint: "First name of his first wife" },
      { word: "Prince", hint: "First name of his eldest son" },
      { word: "Paris", hint: "First name of his daughter" },
      { word: "Blanket", hint: "Nickname of his youngest son" },
      { word: "Man In The Mirror", hint: "Song about self-reflection and change" },
      { word: "You Are Not Alone", hint: "Song written by R. Kelly" },
      { word: "One Glove", hint: "His unique stage fashion choice" },
      { word: "Spike Lee", hint: "Director of 'They Don’t Care About Us' video" },
      { word: "Hollywood Walk", hint: "He has a star on this Walk of Fame" },
      { word: "Motown", hint: "Record label where he started his career" },
      { word: "Guitar", hint: "Eddie Van Halen played this instrument in 'Beat It'" },
      { word: "Pepsi", hint: "Brand involved in his famous commercial accident" },
      { word: "Grammy", hint: "Award he won multiple times" },
      { word: "MJ The Musical", hint: "Broadway show based on his life" }
  ], []);
  const { addPoints } = useGame();
  const [gameStarted, setGameStarted] = useState(false);
  const [currentWord, setCurrentWord] = useState("");
  const [hint, setHint] = useState("");
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [showGameOver, setShowGameOver] = useState(false);
  const [showWin, setShowWin] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [maxWrongGuesses, setMaxWrongGuesses] = useState(6);

  const startGame = useCallback(() => {
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    setCurrentWord(randomWord.word);
    setHint(randomWord.hint);
    setGuessedLetters([]);
    setWrongGuesses(0);
    setMaxWrongGuesses(randomWord.word.length >= 6 ? randomWord.word.length : 6);
    setShowGameOver(false);
    setShowWin(false);
    setGameStarted(true);
  }, [wordList]);

  const exitGame = useCallback(() => {
    setGameStarted(false);
    setShowGameOver(false);
    setShowWin(false);
    setShowExitConfirm(false);
    setCurrentWord("");
    setHint("");
    setGuessedLetters([]);
    setWrongGuesses(0);
  }, []);

  useEffect(() => {
    if (autoStart) {
      startGame();
    }
  }, [autoStart, startGame]);

  const handleGuess = useCallback(
    (letter) => {
      if (!gameStarted || guessedLetters.includes(letter.toLowerCase())) return;

      setGuessedLetters((prevLetters) => {
        const newGuessedLetters = [...prevLetters, letter.toLowerCase()];

        if (currentWord.toLowerCase().includes(letter.toLowerCase())) {
          const allLettersGuessed = currentWord
            .toLowerCase()
            .split("")
            .filter((char) => char !== " ")
            .every((char) => newGuessedLetters.includes(char));

          if (allLettersGuessed) {
            setShowWin(true);
            addPoints(3);
            setGameStarted(false);
            confetti({ particleCount: 150, spread: 70, origin: { y: 1 } });
          }
        } else {
          setWrongGuesses((prev) => {
            if (prev + 1 >= maxWrongGuesses) {
              setShowGameOver(true);
              setGameStarted(false);
            }
            return prev + 1;
          });
        }

        return newGuessedLetters;
      });
    },
    [gameStarted, currentWord, addPoints, maxWrongGuesses]
  );

  useEffect(() => {
    const handleKeyPress = (e) => {
      const letter = e.key.toLowerCase();
      if (/^[a-z]$/.test(letter)) {
        handleGuess(letter);
      }
    };

    if (gameStarted) {
      document.addEventListener("keydown", handleKeyPress);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [gameStarted, handleGuess]);

  const renderModal = () => {
    if (!showGameOver && !showWin && !showExitConfirm) return null;

    return (
      <div className="game__modal show">
        <div className="modal__content mj-modal">
          <div className="modal__content-title">
            <h4>{showGameOver ? "Game Over" : showWin ? "Congratulations!" : "Exit Game"}</h4>
            <p>
              {showGameOver
                ? `The correct word was: ${currentWord}`
                : showWin
                ? `You guessed the word: ${currentWord}`
                : "Are you sure you want to exit?"}
            </p>
          </div>
          <div className="modal__content-button-list">
            {showExitConfirm ? (
              <>
                <button className="btn mj-button" onClick={exitGame}>Yes, Exit</button>
                <button className="btn mj-button" onClick={() => setShowExitConfirm(false)}>Cancel</button>
              </>
            ) : (
              <>
                <button className="btn mj-button" onClick={startGame}>
                  {showGameOver ? "Try Again" : "Next Question"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="guess-word">
      {!gameStarted ? (
        <button className="start-game mj-button" onClick={startGame}>Play</button>
      ) : (
        <div className="game__box mj-container">
          <h4 className="game-hint">Hint: <b>{hint}</b></h4>
          <ul className="word-display">
            {currentWord.split("").map((char, index) => {
              const lowerChar = char.toLowerCase();
              return (
                <li key={index} className={`letter ${char === " " ? "space" : guessedLetters.includes(lowerChar) ? "guessed" : ""}`}>
                  {char === " " ? " " : guessedLetters.includes(lowerChar) ? char : <span>&nbsp;</span>}
                </li>
              );
            })}
          </ul>
          <h4 className="guesses-text">Wrong Guesses: <b>{wrongGuesses}/{maxWrongGuesses}</b></h4>
          <div className="keyboard">
            {"abcdefghijklmnopqrstuvwxyz".split("").map((letter) => (
              <button
                key={letter}
                className="btn mj-button"
                onClick={() => handleGuess(letter)}
                disabled={guessedLetters.includes(letter)}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>
      )}
      {renderModal()}
    </div>
  );
}
