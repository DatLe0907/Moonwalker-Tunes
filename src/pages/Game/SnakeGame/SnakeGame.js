import { useEffect } from "react";
import { useGame } from "../../context/PointsContext";

export default function TriviaChallenge() {
  const { addPoints } = useGame();

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data?.type === "SNAKE_SCORE") {
        addPoints(event.data.score);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [addPoints]);

  return (
    <iframe
      style={{ width: "100%", height: "100%" }}
      src={`${process.env.PUBLIC_URL}/assets/game/neon-snake/index.html`}
      frameBorder="0"
      title="Snake Game"
    ></iframe>
  );
}
