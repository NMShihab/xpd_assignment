import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import SubmitForm from "./pages/SubmitForm";
import UpdateForm from "./pages/UpdateForm";
import "./App.css";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/get-form" element={<SubmitForm />} />
        <Route path="/update-form" element={<UpdateForm />} />
      </Routes>
    </Router>
  );
}

export default App;
