import React, { createContext, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastContext = createContext();


export const ToastProvider = ({ children }) => {
  // Hàm hiển thị toast
  const addToast = (message, type = "info") => {
    toast[type](message);
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer position="top-right" autoClose={5000} style={{top: "70px", zIndex: 9999999999999 }}/>
    </ToastContext.Provider>
  );
};

// Hook để sử dụng toast ở mọi nơi trong ứng dụng
export const useToast = () => useContext(ToastContext);
