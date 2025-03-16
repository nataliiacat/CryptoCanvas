import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage/HomePage";
import WalletPage from "./pages/WalletPage/WalletPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="wallet/:address" element={<WalletPage />} />
      </Route>
    </Routes>
  );
}

export default App;