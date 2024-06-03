import React from "react";
import { Route, Routes } from "react-router-dom";
import App from "../App";
import { Chat } from "../pages/Chat";

const AppRoutes: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/chat" element={<Chat />} />
        <Route />
      </Routes>
    </>
  );
};

export default AppRoutes;
