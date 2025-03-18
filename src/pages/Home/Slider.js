import { useState, useEffect } from "react";
import './Slider.css'
import './Slider-responsive.css'

const slider = [
  { index: 1, text: "I'm happy to be alive, I'm happy to be who I am." },
  { index: 2, text: "To live is to be musical, starting with the blood dancing in your veins. Everything living has a rhythm. Do you feel your music?" },
  { index: 3, text: "Lies run sprints, but the truth runs marathons." },
  { index: 4, text: "The greatest education in the world is watching the masters at work." },
  { index: 5, text: "If you enter this world knowing you are loved and you leave this world knowing the same, then everything that happens in between can be dealt with." },
  { index: 6, text: "Before you judge me, try hard to love me, look within your heart then ask, have you seen my childhood?" },
  { index: 7, text: "I'm never pleased with anything, I'm a perfectionist, it's part of who I am." },
  { index: 8, text: "In a world filled with hate, we must still dare to hope." },
  { index: 9, text: "Let us dream of tomorrow where we can truly love from the soul, and know love as the ultimate truth at the heart of all creation." },
  { index: 10, text: "No matter what you do, give it everything you have. Be the best, not second best." }
];



export default function AutoImageSlider() {
  const [index, setIndex] = useState(0); // Bắt đầu từ 0
  const [fade, setFade] = useState(false);

  useEffect(() => {
    setFade(true);
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % slider.length);
        setFade(true);
      }, 300); // Delay để fade-out trước khi đổi ảnh
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slider">
      <div className="slider-img" 
        style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/photo/wallpaper/wallpaper${index + 1}.jpg)` }}>
      </div>
      <div className={`slider-text ${fade ? "fade-in" : "fade-out"}`}>
        <p>{slider[index].text}</p>
        <span>~Michael Jackson~</span>
      </div>
    </div>
  );
}

