import { NavLink } from "react-router-dom";
import { NAV_GROUPS } from "./navConfig.js";

// render จาก NAV_GROUPS เท่านั้น — ห้าม hardcode รายการเมนูซ้ำที่นี่
export default function SiteNav() {
  return (
    <nav className="site-nav">
      <span className="site-nav-brand">การเพาะเลี้ยงและธุรกิจสัตว์น้ำ</span>
      <ul className="site-nav-groups">
        {NAV_GROUPS.map((group) => (
          <li key={group.id} className="site-nav-group">
            {group.solo ? (
              <NavLink
                to={group.items[0].to}
                end={group.items[0].to === "/"}
                className={({ isActive }) => "site-nav-link" + (isActive ? " is-active" : "")}
                title={group.hint}
              >
                {group.label}
              </NavLink>
            ) : (
              <div className="site-nav-dropdown">
                <span className="site-nav-link" title={group.hint}>
                  {group.label}
                </span>
                <ul className="site-nav-menu">
                  {group.items.map((item) => (
                    <li key={item.to}>
                      <NavLink
                        to={item.to}
                        className={({ isActive }) => (isActive ? "is-active" : "")}
                        title={item.desc}
                      >
                        {item.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
