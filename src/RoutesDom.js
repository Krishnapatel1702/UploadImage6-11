import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./LoginPage";
import Home from "./Home";
import SignUp from "./Signup";
import RecentlyAdded from "./RecentlyAdded";
import TopRated from "./TopRated";

export default function RoutesDom() {
  const [email, setEmail] = useState();
  useEffect(() => {
    const email = localStorage.getItem("email");
    setEmail(email);
  }, []);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            email === null || email === "null" ? <LoginPage /> : <Home />
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/recently_added" element={<RecentlyAdded />} />
        <Route path="/top_rated" element={<TopRated />} />
      </Routes>
    </>
  );
}
