import { useEffect } from "react";
import { useGame } from "../../context/PointsContext";
import { useToast } from "../../context/ToastContext";



export default function SnakeGame() {
  const { addToast } = useToast();
  const { addPoints } = useGame();

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data?.type === "SNAKE_SCORE") {
        addPoints(event.data.score);
        if(event.data.score > 0)  addToast(`You scored ${event.data.score} points!`, "success");
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [addPoints, addToast]);

  return (
    <iframe
      style={{ width: "100%", height: "100%" }}
      src={`${process.env.PUBLIC_URL}/assets/game/neon-snake/index.html`}
      frameBorder="0"
      title="Snake Game"
    ></iframe>
  );
}
