import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotesPage from "./pages/NotesPage";
import CreateNotePage from "./pages/CreateNotePage";
import EditNotePage from "./pages/EditNotePage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NotesPage />} />
        <Route path="/create" element={<CreateNotePage />} />
        <Route path="/edit/:id" element={<EditNotePage />} />
      </Routes>
    </Router>
  );
}

export default App;
