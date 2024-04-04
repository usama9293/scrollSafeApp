import React, { useEffect, createContext, useReducer } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "../components/screen/Home";
import Login from "../components/screen/Login";
import Signup from "../components/screen/Signup";
import Profile from "../components/screen/Profile";
import CreatePost from "../components/screen/Createpost";
import UserProfile from "../components/screen/userProfile";
import Navbar from "../components/Navbar";
import { initialState, reducer } from "../reducers/userReducer";
import ExploreComponent from "../components/screen/explore";
import "./App.css";

export const UserContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user && window.location.pathname !== "/login") {
      // If no user is authenticated and the current URL is not the login page,
      // navigate to the login page
      window.location.href = "/login";
    } else if (user) {
      dispatch({ type: "USER", payload: user });
    }
  }, []);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/createpost" element={<CreatePost />} />
          {/* Define the specific route for user profiles */}
          <Route path="/profile/:id" element={<UserProfile />} />
          <Route path="/explore" element={<ExploreComponent />} />
          {/* Redirect to Login if no user is authenticated */}
          <Route path="*" element={<Navigate to="/login" />} />

        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
