import { useState } from "react";
import "./Game.css";

import GuessWord from "./GuessWord/GuessWord";
import SnakeGame from "./SnakeGame/SnakeGame";
import MoonwalkRunner from "./MoonwalkRunner/MoonwalkRunner";
import MJTheExperience from "./MJTheExperience/MJTheExperience"


const games = [
  {
    id: "game1",
    title: "Guess the Word",
    description: "Test your knowledge of Michael Jackson by guessing words related to his life and career.",
    tokenRewards: true,
    image: `${process.env.PUBLIC_URL}/assets/photo/game/guess-word/guessword.webp`,
    component: GuessWord,
  },
  {
    id: "game2",
    title: "Snake Game",
    description: "Control the snake, collect musical notes to score points, and avoid collisions with yourself and the borders.",
    tokenRewards: true,
    image: `${process.env.PUBLIC_URL}/assets/photo/game/snake/snake.webp`,
    component: SnakeGame,
  },
  {
    id: "game3",
    title: "Moonwalk Runner",
    description: "Run, jump, and fight in this exciting game inspired by Michael Jackson's moves.",
    image: `${process.env.PUBLIC_URL}/assets/photo/game/moonwalker-fight/moonwalker-fight.webp`,
    component: MoonwalkRunner,
  },
  {
    id: "game4",
    title: "MJ The Experience",
    description: "Relive Michael Jackson’s greatest performances by dancing to his iconic songs in a rhythm-based game.",
    image: `${process.env.PUBLIC_URL}/assets/photo/game/mj-the-experience/mj-the-experience.jpg`,
    component: MJTheExperience,
  },
];




function Game() {

  const [selectedGame, setSelectedGame] = useState(null);

  const startGame = (game) => {
    setSelectedGame(game);
  };

  const closeGame = () => {
    setSelectedGame(null);
  };

  return (
    <div className="game-container">
      <div className="game-list">
        {games.map((game) => (
          <div key={game.id} className="game-card" onClick={() => startGame(game)}>
            <img src={game.image} alt={game.title} className="game-image" />
            <div className="game-info">
              <h2>{game.title}</h2>
              <p>{game.description}</p>
              <p>{game.tokenRewards?"💎 Token Rewards": ""}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal hiển thị game */}
      {selectedGame && (
        <div className="game-modal">
          <div className="game-modal-content">
            <span className="btn close-button" onClick={closeGame}>&times;</span>
            <selectedGame.component onClose={closeGame} autoStart={true} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Game;
