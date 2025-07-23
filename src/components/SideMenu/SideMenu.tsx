import { Link, useLocation } from "react-router-dom";
import "./SideMenu.scss";

const cocktailCodes = ["margarita", "mojito", "a1", "kir"];

export function SideMenu() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="sidebar">
      {cocktailCodes.map((code) => (
        <Link
          key={code}
          to={`/${code}`}
          className={`sidebar-item ${currentPath === `/${code}` ? "active" : ""}`}
        >
          {code.charAt(0).toUpperCase() + code.slice(1)}
        </Link>
      ))}
    </nav>
  );
}
