import { createContext, useContext, useState, useEffect } from "react";
import CryptoJS from "crypto-js";

const GameContext = createContext();
const SECRET_KEY = "mySuperSecretKey"; // Nên đặt vào env file nếu deploy

export const GameProvider = ({ children }) => {
  const [points, setPoints] = useState(0);

  // Hàm mã hóa AES
  const encrypt = (data) => {
    return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
  };

  // Hàm giải mã AES
  const decrypt = (data) => {
    try {
      const bytes = CryptoJS.AES.decrypt(data, SECRET_KEY);
      return bytes.toString(CryptoJS.enc.Utf8) || "0";
    } catch {
      return "0"; // Nếu lỗi, trả về 0 điểm
    }
  };

  useEffect(() => {
    const savedPoints = localStorage.getItem("gamePoints");
    if (savedPoints) {
      setPoints(parseInt(decrypt(savedPoints), 10));
    }
  }, []);

  const addPoints = (amount) => {
    const newPoints = points + amount;
    setPoints(newPoints);
    localStorage.setItem("gamePoints", encrypt(newPoints.toString()));
  };

  return (
    <GameContext.Provider value={{ points, addPoints }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
