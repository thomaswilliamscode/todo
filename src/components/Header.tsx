import { Link } from "react-router-dom";
import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import "../Styles/header.css";
export default function Header() {
  const { focus, setFocus } = useContext(TodoContext);
  return (
    <header className="container">
      <nav className="header">
        <ul>
          <li className={`${focus === "home" ? "active-header" : ""}`}>
            <Link to="/" onClick={() => setFocus("home")}>
              Home
            </Link>
          </li>
          <li className={`${focus === "focus" ? "active-header" : ""}`}>
            <Link to="/dripfeed" onClick={() => setFocus("focus")}>
              Focus Mode
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
