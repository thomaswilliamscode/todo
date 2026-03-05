import { Link } from "react-router-dom";
import { useContext } from "react"; 
import { TodoContext } from "../context/TodoContext";
import "../Styles/header.css";
export default function Header() {
  const {focus} from useContext(TodoContext)
  return (
    <header className="container">
      <nav className="header">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/dripfeed">Focus Mode</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
