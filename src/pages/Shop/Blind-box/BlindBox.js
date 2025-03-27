import React, { useState } from "react";
import { useGame } from "../../context/PointsContext";
import "./BlindBox.css";

const rarityLevels = [
  { name: "Common", color: "#fff", chance: 60 },  // 60%
  { name: "Rare", color: "#D8DDD8", chance: 30 },    // 30%
  { name: "Legendary", color: "#FCDCF1", chance: 10 }, // 10%
];

const items = {
  sticker: [
    { name: "sticker1.jpg", rarity: "Common" },
    { name: "sticker2.jpg", rarity: "Common" },
    { name: "sticker3.jpg", rarity: "Common" },
    { name: "sticker4.jpg", rarity: "Common" },
    { name: "sticker5.jpg", rarity: "Common" },
    { name: "sticker6.jpg", rarity: "Common" },
    { name: "sticker7.jpg", rarity: "Common" },
    { name: "sticker8.jpg", rarity: "Common" },
    { name: "sticker9.jpg", rarity: "Common" },
    { name: "sticker10.jpg", rarity: "Common" },
    { name: "sticker11.jpg", rarity: "Common" },
    { name: "sticker12.jpg", rarity: "Common" },
    { name: "sticker13.jpg", rarity: "Common" },
    { name: "sticker14.jpg", rarity: "Common" },
    { name: "sticker15.jpg", rarity: "Common" },
    { name: "sticker16.jpg", rarity: "Rare" },
    { name: "sticker17.jpg", rarity: "Rare" },
    { name: "sticker18.jpg", rarity: "Rare" },
    { name: "sticker19.jpg", rarity: "Rare" },
    { name: "sticker20.jpg", rarity: "Rare" },
    { name: "sticker21.jpg", rarity: "Rare" },
    { name: "sticker22.jpg", rarity: "Rare" },
    { name: "sticker23.jpg", rarity: "Rare" },
    { name: "sticker24.jpg", rarity: "Rare" },
    { name: "sticker25.jpg", rarity: "Rare" },
    { name: "sticker26.jpg", rarity: "Legendary" },
    { name: "sticker27.jpg", rarity: "Legendary" },
    { name: "sticker28.jpg", rarity: "Legendary" },
    { name: "sticker29.jpg", rarity: "Legendary" },
    { name: "sticker30.jpg", rarity: "Legendary" },
    { name: "sticker31.jpg", rarity: "Legendary" },
  ],
  wallpaper: [
    { name: "wallpaper1.jpg", rarity: "Common" },
    { name: "wallpaper2.jpg", rarity: "Common" },
    { name: "wallpaper3.jpg", rarity: "Common" },
    { name: "wallpaper4.jpg", rarity: "Common" },
    { name: "wallpaper5.jpg", rarity: "Common" },
    { name: "wallpaper6.jpg", rarity: "Common" },
    { name: "wallpaper7.jpg", rarity: "Common" },
    { name: "wallpaper8.jpg", rarity: "Common" },
    { name: "wallpaper9.jpg", rarity: "Common" },
    { name: "wallpaper10.jpg", rarity: "Common" },
    { name: "wallpaper11.jpg", rarity: "Rare" },
    { name: "wallpaper12.jpg", rarity: "Rare" },
    { name: "wallpaper13.jpg", rarity: "Rare" },
    { name: "wallpaper14.jpg", rarity: "Rare" },
    { name: "wallpaper15.jpg", rarity: "Rare" },
    { name: "wallpaper16.jpg", rarity: "Rare" },
    { name: "wallpaper17.jpg", rarity: "Rare" },
    { name: "wallpaper18.jpg", rarity: "Rare" },
    { name: "wallpaper19.jpg", rarity: "Rare" },
    { name: "wallpaper20.jpg", rarity: "Rare" },
    { name: "wallpaper21.jpg", rarity: "Legendary" },
    { name: "wallpaper22.jpg", rarity: "Legendary" },
    { name: "wallpaper23.jpg", rarity: "Legendary" },
    { name: "wallpaper24.jpg", rarity: "Legendary" },
    { name: "wallpaper25.jpg", rarity: "Legendary" },
    { name: "wallpaper26.jpg", rarity: "Legendary" },
    { name: "wallpaper27.jpg", rarity: "Legendary" },
    { name: "wallpaper28.jpg", rarity: "Legendary" },
    { name: "wallpaper29.jpg", rarity: "Legendary" },
    { name: "wallpaper30.jpg", rarity: "Legendary" },
  ],
};

const getRandomItem = (type) => {
  // Xác định độ hiếm theo tỉ lệ %  
  let rand = Math.random() * 100;
  let selectedRarity = rarityLevels.find((r) => (rand -= r.chance) < 0).name;

  // Lọc danh sách item theo độ hiếm đã chọn
  let filteredItems = items[type].filter((item) => item.rarity === selectedRarity);

  // Chọn ngẫu nhiên 1 ảnh trong danh sách đã lọc
  let randomImage = filteredItems[Math.floor(Math.random() * filteredItems.length)];

  return { image: randomImage.name, rarity: selectedRarity };
};


const BlindBox = () => {
  const { points, addPoints } = useGame();
  const [boxState, setBoxState] = useState({
    sticker: { flipped: false, reward: null },
    wallpaper: { flipped: false, reward: null },
  });

  const cost = 8;

  const openBox = (type) => {
    if (points < cost) {
      alert("Not enough tokens!");
      return;
    }

    setBoxState((prev) => ({
      ...prev,
      [type]: { flipped: true },
    }));

    setTimeout(() => {
      const reward = getRandomItem(type);
      setBoxState((prev) => ({
        ...prev,
        [type]: { flipped: true, reward },
      }));
      addPoints(-cost);
    }, 500);
  };

  const tryAgain = (type) => {
    setBoxState((prev) => ({
      ...prev,
      [type]: { flipped: false, reward: null },
    }));
  };

  return (
    <div className="Shop" >
      <div className="parallax">

        <div className="bg" style = {{
      backgroundImage: `url(${process.env.PUBLIC_URL}/assets/photo/shop/background.jpg)`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",}}></div>

        <div className="content">
          <div className="Shop-content">Spend {cost} tokens per attempt to receive a Michael Jackson-themed sticker or wallpaper.</div>
          <div className="blind-box-container">
            {["sticker", "wallpaper"].map((type) => (
              <div key={type} className="blind-box-wrapper">
                <div
                  className={`blind-box ${boxState[type].flipped ? "flipped" : ""}`}
                  onClick={!boxState[type].flipped ? () => openBox(type) : undefined}
                >
                  <div className="blind-box-front">{type === "sticker" ? "Sticker" : "Wallpaper"}</div>
                  <div
                    className="blind-box-back"
                    style={{ backgroundColor: rarityLevels.find(r => r.name === boxState[type].reward?.rarity)?.color || "#fff" }}
                  >
                    {boxState[type].reward ? (
                      <div className="blind-box-reward">
                        <img
                          src={`${process.env.PUBLIC_URL}/assets/photo/${type}/${boxState[type].reward.image}`}
                          alt=""
                          className="reward-image"
                        />
                        <a href={`${process.env.PUBLIC_URL}/assets/photo/${type}/${boxState[type].reward.image}`} download className="btn">Download</a>
                        <button onClick={() => tryAgain(type)} className="btn">Try Again</button>
                      </div>
                    ) : (
                      <p> </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div> 
        </div>
      </div>
    </div>
  );
};

export default BlindBox;
