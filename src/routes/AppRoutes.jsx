import { Routes, Route } from "react-router-dom";
import DetailTodo from "../pages/DetailTodo";
import Detail from "../pages/Detail";
import Home from "../pages/Home";
import LandingPage from "../pages/LandingPage";
import SignupPage from "../pages/SignupPage";
import LoginPage from "../pages/LoginPage";
import Store from "../pages/Store";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/store" element={<Store />} />
      <Route path="/project/:id" element={<Detail />} />
      <Route path="/project/:id/:id2" element={<DetailTodo />} />
    </Routes>
  );
}

export default AppRoutes;