import { useState } from "react";
import "./DanceMove.css";
import "./DanceMove-responsive.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

export default function DanceMove() {
  const [selectedMove, setSelectedMove] = useState(null);

  const danceMoves = [
    { id: 1, name: "Moonwalk", src: require("../../assets/photo/dance/moonwalk.gif") },
    { id: 2, name: "Antigravity Lean", src: require("../../assets/photo/dance/antigravity-lean.gif") },
    { id: 3, name: "Shuffle", src: require("../../assets/photo/dance/shuffle.gif") },
    { id: 4, name: "Crotch Grab", src: require("../../assets/photo/dance/crotch-cb.gif") },
    { id: 5, name: "Kick", src: require("../../assets/photo/dance/kick.gif") },
    { id: 6, name: "Spin", src: require("../../assets/photo/dance/spin.gif") },
    { id: 7, name: "Side walk", src: require("../../assets/photo/dance/side-walk.gif") },
    { id: 8, name: "Circle slide", src: require("../../assets/photo/dance/circle-slide.gif") },
    { id: 9, name: "Toe Stand", src: require("../../assets/photo/dance/toe-stand.gif") },
  ];

  return (
    <div className="dance-move">
        <div className="dance-box ">
          <h2 className = "dance-title title">Iconic dance</h2>
        </div>
        <div className="old-tv-screen dance-display">
          {selectedMove && (
            <div
              style={{
                backgroundImage: `url("${selectedMove.src}")`,
              }}
              className="dance-animation"
            ></div>
          )}
          {!selectedMove && <FontAwesomeIcon icon={faMusic} />}
        </div>

        <div className="button-group">
          {danceMoves.map((move) => (
            <button
              key={move.id}
              className={`button ${selectedMove?.id === move.id ? "active" : ""}`}
              onClick={() => setSelectedMove(move)}
            >
              {move.name}
            </button>
          ))}
        </div>
      </div>
  );
}
