import React, { Component } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login.jsx";
import Home from "./components/Home.jsx";
import { useState } from "react";

function App() {

	const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [user, setUser] = useState({});

  return (
      <Router>
        <Routes>
          <Route path="/" element={<Login setUser={setUser} username={username} setUsername={setUsername} setDisplayName={setDisplayName} />} />
          <Route path="/home" element={<Home displayName={displayName} username={username} user={user} />} />
        </Routes>
      </Router>
  );
}

export default App;
