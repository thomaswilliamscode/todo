import { Link } from "react-router-dom";
import { useTodoContext } from "../context/TodoContext";
import "../Styles/header.css";
export default function Header() {
  const { focus, setFocus } = useTodoContext();
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
        </ul>
      </nav>
    </header>
  );
}
