import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { useEffect, useState } from "react";

export const Navbar = () => {
    const location = useLocation();
    const [isCollapsed, setIsCollapsed] = useState(true);

    // When navigating to a different page, collapse the menu automatically
    useEffect(() => setIsCollapsed(true), [location]);

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/" className="navbar-item">
                    <img src={logo} width="112" height="28" />
                </Link>

                <a className={`navbar-burger ${isCollapsed ? "" : "is-active"}`} onClick={() => setIsCollapsed(!isCollapsed)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </a>
            </div>

            <div className={`navbar-menu ${isCollapsed ? "" : "is-active"}`}>
                <div className="navbar-start">
                    <Link to="/" className="navbar-item">
                        Overview
                    </Link>

                    <Link to="/documentation" className="navbar-item">
                        Documentation
                    </Link>

                    <div className="navbar-item has-dropdown is-hoverable">
                        <span className="navbar-link">
                            Tools
                        </span>

                        <div className="navbar-dropdown">
                            <Link to="/tools/topics/explore" className="navbar-item">
                                Explore topics
                            </Link>
                            <Link to="/tools/events/produce" className="navbar-item">
                                Produce events
                            </Link>
                            <Link to="/tools/events/query" className="navbar-item">
                                Query events
                            </Link>
                            <hr className="navbar-divider" />
                            <Link to="/tools/settings" className="navbar-item">
                                Settings
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};
