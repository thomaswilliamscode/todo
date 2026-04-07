import { Link } from "react-router-dom";
import { useTodoContext } from "../context/TodoContext";
import "../Styles/header.css";
import { useState } from 'react'

import { stateData } from "../data/sidebar-state";
import type { StateData } from "../types/state-data";

export default function Header() {
  const { focus, setFocus } = useTodoContext();
  const [sidebarState, setSidebarState] = useState<StateData>(() => {
      const saved = localStorage.getItem("sidebarState");
      const parsed = JSON.parse(saved || "null");
      if (parsed && Array.isArray(parsed.data)) {
        return parsed;
      } else return stateData;
    });
  return (
    <header className="container">
      <nav className="header">
        <ul>
          <li
            className={` header-btn ${focus === "home" ? "active-header" : ""}`}
          >
            <Link to="/" onClick={() => setFocus("home")}>
              Home
            </Link>
          </li>
          <li
            className={` header-btn ${
              focus === "focus" ? "active-header" : ""
            }`}
          >
            <Link to="/dripfeed" onClick={() => setFocus("focus")}>
              Focus Mode
            </Link>
          </li>
          <li>Reset State</li>
        </ul>
      </nav>

    </header>
  );
}
