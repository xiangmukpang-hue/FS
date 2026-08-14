import { NavLink } from "react-router-dom";
import { NAV_GROUPS } from "./navConfig.js";

// render จาก NAV_GROUPS เท่านั้น — ห้าม hardcode รายการเมนูซ้ำที่นี่
export default function Sidebar() {
  return (
    <aside className="sidebar">
      {NAV_GROUPS.map((group) => (
        <div key={group.id} className="sidebar-group">
          {!group.solo && <div className="sidebar-group-label">{group.label}</div>}
          <ul className="sidebar-items">
            {group.items.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) => "sidebar-link" + (isActive ? " is-active" : "")}
                  title={item.desc}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
}
