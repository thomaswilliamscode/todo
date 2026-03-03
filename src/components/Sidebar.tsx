import SidebarFoldersAndLists from "./SidebarFoldersAndLists";
import { Link } from "react-router-dom";
import "../Styles/sidebar.css";

import { useState } from "react";

export default function Sidebar() {
  const [isActive, setisActive] = useState(false);

  function toggleActive() {
    if (isActive) {
      setisActive(false);
    } else {
      setisActive(true);
    }
  }

  return (
    <div id="sidebar">
      <SidebarFoldersAndLists />
    </div>
  );
}
