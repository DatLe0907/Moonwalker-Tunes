import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useGame } from "../../context/PointsContext";
import { useToast } from "../../context/ToastContext";
import "./GuessWord.css";
import "./GuessWord-responsive.css";
import confetti from "canvas-confetti";



export default function GuessWord({ onClose, autoStart }) {
  const wordList = useMemo(() => [
    { hint: "What is the best-selling album of all time by Michael Jackson?", word: "Thriller" },
    { hint: "What is Michael Jackson's signature dance move called?", word: "Moonwalk" },
    { hint: "Which Michael Jackson song features a famous guitar solo by Eddie Van Halen?", word: "Beat It" },
    { hint: "What is the name of Michael Jackson's famous ranch?", word: "Neverland" },
    { hint: "What iconic fashion accessory is Michael Jackson known for wearing on stage?", word: "Glove" },
    { hint: "Which 1987 album includes hits like 'Smooth Criminal' and 'Man in the Mirror'?", word: "Bad" },
    { hint: "Which 1991 album features the song 'Black or White'?", word: "Dangerous" },
    { hint: "Which hit song tells the story of a girl claiming Michael Jackson is the father of her child?", word: "Billie Jean" },
    { hint: "What is the name of the album Michael Jackson released before 'Thriller'?", word: "Off The Wall" },
    { hint: "What is Michael Jackson's famous nickname?", word: "King of Pop" },
    { hint: "Which Michael Jackson song promotes global peace and unity?", word: "Heal The World" },
    { hint: "Which song by Michael Jackson addresses racial harmony?", word: "Black White" },
    { hint: "What is the name of the charity song co-written by Michael Jackson and Lionel Richie?", word: "We Are The World" },
    { hint: "What is the name of Michael Jackson's 1995 double album featuring past hits and new songs?", word: "HIStory" },
    { hint: "Which song features Michael Jackson's iconic anti-gravity lean?", word: "Smooth Criminal" },
    { hint: "What is the name of the Cirque du Soleil show inspired by Michael Jackson's music?", word: "MJ The One" },
    { hint: "What was the name of Michael Jackson's family group?", word: "Jackson Five" },
    { hint: "Which Jackson 5 song teaches the basics of learning?", word: "ABC Song" },
    { hint: "What is the name of Michael Jackson's early solo hit about a pet rat?", word: "Ben" },
    { hint: "What is the name of Michael Jackson's final studio album released in 2001?", word: "Invincible" },
    { hint: "Which Michael Jackson song features basketball legend Michael Jordan in the music video?", word: "Jam" },
    { hint: "Which Michael Jackson song addresses environmental issues?", word: "Earth Song" },
    { hint: "Which Michael Jackson tour was cut short due to health issues?", word: "Dangerous Tour" },
    { hint: "Which Michael Jackson song discusses painkiller addiction?", word: "Morphine" },
    { hint: "What is Michael Jackson's first name?", word: "Michael" },
    { hint: "What is Michael Jackson's last name?", word: "Jackson" },
    { hint: "Which record label was Michael Jackson associated with during his career?", word: "Sony Music" },
    { hint: "What is the name of Michael Jackson's father?", word: "Joseph" },
    { hint: "What is the name of Michael Jackson's famous sister?", word: "Janet Jackson" },
    { hint: "What is thet name of Michael Jackson's first wife?", word: "Lisa Marie" },
    { hint: "What is the name of Michael Jackson's eldest son?", word: "Prince Jackson" },
    { hint: "What is the name of Michael Jackson's daughter?", word: "Paris Jackson" },
    { hint: "What is the nickname of Michael Jackson's youngest son?", word: "Blanket" },
    { hint: "Which Michael Jackson song is about self-reflection and social change?", word: "Man In The Mirror" },
    { hint: "Which song written by R. Kelly was performed by Michael Jackson?", word: "You Are Not Alone" },
    { hint: "Who directed Michael Jackson's 'They Don’t Care About Us' music video?", word: "Spike Lee" },
    { hint: "Where does Michael Jackson have a star on the Walk of Fame?", word: "Hollywood" },
    { hint: "Which record label did Michael Jackson start his career with?", word: "Motown" },
    { hint: "Who played the guitar solo in Michael Jackson's 'Beat It'?", word: "Van Halen" },
    { hint: "Which brand was involved in Michael Jackson's famous commercial accident?", word: "Pepsi" },
    { hint: "What major music award did Michael Jackson win multiple times?", word: "Grammy Award" },
    { hint: "What is the name of the Broadway show based on Michael Jackson's life?", word: "MJ Musical" },
    { hint: "What is the title of the TV miniseries about the Jackson family?", word: "American Dream" },
    { hint: "What is the name of the movie where Michael Jackson starred as the Scarecrow?", word: "The Wiz" },
    { hint: "Which duet song did Michael Jackson perform with his sister Janet?", word: "Scream" },
    { hint: "What is the name of Michael Jackson's famous pet chimpanzee?", word: "Bubbles Chimp" },
    { hint: "What is the name of the 1984 tour Michael Jackson performed with his brothers?", word: "Victory" },
    { hint: "What is the name of the 1988 movie featuring Michael Jackson's music videos and short films?", word: "Moonwalker" },
    { hint: "What is the name of Michael Jackson's short film released in 1996?", word: "Ghosts Film" },
    { hint: "Who was one of Michael Jackson's choreographers?", word: "Wade Robson" },
    { hint: "What is the name of Michael Jackson's live TV special celebrating Motown?", word: "Motown Special" },
    { hint: "What genre of music is Michael Jackson most associated with?", word: "Pop Music" },
    { hint: "Which Michael Jackson music video revolutionized the industry?", word: "Thriller Video" },
    { hint: "What is Michael Jackson's famous exclamation during performances?", word: "Hee Hee" },
    { hint: "What is the name of the Smooth Criminal dance?", word: "Anti Gravity" }
  ], []);


  



  const { addPoints } = useGame();
  const { addToast } = useToast();
  const [gameStarted, setGameStarted] = useState(false);
  const [currentWord, setCurrentWord] = useState("");
  const [hint, setHint] = useState("");
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [showGameOver, setShowGameOver] = useState(false);
  const [showWin, setShowWin] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [maxWrongGuesses, setMaxWrongGuesses] = useState(6);

  const winRef = useRef(false);  // Track if the win has already been handled
  const gameOverRef = useRef(false);  // Track if game over has been handled

  
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

    // Reset refs
    winRef.current = false;
    gameOverRef.current = false;
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
    startGame(); // Tự động bắt đầu trò chơi khi component được render
  }, [startGame]);

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

          if (allLettersGuessed && !winRef.current) {  // Check if win is already handled
            winRef.current = true;  // Mark win as handled
            setShowWin(true);
            addPoints(10);
            addToast("You guessed the word! +10 tokens", "success");
            setGameStarted(false);
            confetti({ particleCount: 150, spread: 70, origin: { y: 1},  zIndex: 10000});
          }
        } else {
          setWrongGuesses((prev) => {
            if (prev + 1 >= maxWrongGuesses && !gameOverRef.current) {  // Check if game over is already handled
              gameOverRef.current = true;  // Mark game over as handled
              setShowGameOver(true);
              setGameStarted(false);
            }
            return prev + 1;
          });
        }

        return newGuessedLetters;
      });
    },
    [gameStarted, currentWord, addPoints, maxWrongGuesses, guessedLetters, addToast]
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
    if (!(showGameOver || showWin || showExitConfirm)) return null;

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
                  {showGameOver ? "Try Again" : "Next question"}
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
      {renderModal()}
    </div>
  );
}