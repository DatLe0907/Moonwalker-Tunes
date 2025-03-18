import React, { useState } from "react";
import "./Achievement.css";

const achievements = [
  { title: "Record-Breaking Tours", description: "Bad World Tour (1987-1989) was the highest-grossing solo tour at the time.", image: "record-breaking-tours.jpg" },
  { title: "Humanitarian Efforts", description: "Donated over $500 million to charity throughout his lifetime.", image: "humanitarian-efforts.jpg" },
  { title: "Moonwalk Dance", description: "Popularized the Moonwalk, a signature dance move that amazed the world.", image: "moonwalk-dance.jpg" },
  { title: "Hollywood Walk of Fame", description: "Honored twice with a star on the Hollywood Walk of Fame.", image: "hollywood-walk-of-fame.jpg" },
  { title: "Best-Selling Album", description: "Thriller remains the best-selling album of all time, with over 70 million copies sold.", image: "best-seller album.jpg" },
  { title: "Grammy Awards", description: "Michael Jackson won 13 Grammy Awards, including the Grammy Legend Award.", image: "grammy-awards.jpg" },
  { title: "Music Video Pioneer", description: "Revolutionized music videos with 'Thriller', 'Bad', and 'Smooth Criminal'.", image: "music-video-pioneer.jpg" },
  { title: "Most Charitable Pop Star", description: "Guinness World Record for supporting 39 charities in his lifetime.", image: "charitable-pop-star.jpg" },
  { title: "Super Bowl Halftime Show", description: "His 1993 Super Bowl performance set the standard for future halftime shows.", image: "super-bowl-halftime.jpg" },
  { title: "King of Pop", description: "Michael Jackson's influence in music, dance, and fashion remains unparalleled.", image: "king-of-pop.jpg" },
];

const Achievement = () => {
  const [index, setIndex] = useState(0);
  let touchStartX = 0;
  let touchEndX = 0;

  const handleTouchStart = (e) => {
    touchStartX = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX - touchEndX > 50) {
      setIndex((prev) => (prev + 1) % achievements.length); // Vuốt trái -> Next
    }
    if (touchEndX - touchStartX > 50) {
      setIndex((prev) => (prev - 1 + achievements.length) % achievements.length); // Vuốt phải -> Previous
    }
  };

  return (
    <div className="achievement-container row">
      <div className="achievement-title title">MJ Award</div>
      <div className="cards"
           onTouchStart={handleTouchStart}
           onTouchMove={handleTouchMove}
           onTouchEnd={handleTouchEnd}
      >
        {achievements.map((item, i) => {
          let position = "card";
          if (i === index) position += " center";
          else if (i === (index - 1 + achievements.length) % achievements.length) position += " left";
          else if (i === (index + 1) % achievements.length) position += " right";
          else position += " hidden";

          return (
            <div 
              key={i} 
              className={position} 
              onClick={() => setIndex(i)}
            >
              <img src={`${process.env.PUBLIC_URL}/assets/photo/achievement/${item.image}`} alt={item.title} className="card-bg"/>
              <div className="card-content">
                <h2>{item.title}</h2>
                <p>{item.description}</p>
              </div>
              <div className="card-overlay"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Achievement;
