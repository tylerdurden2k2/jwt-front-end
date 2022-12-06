import "./Nav.scss";
import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Nav = (props) => {
    const [showNav, SetShowNav] = useState(true);
    let location = useLocation();
    useEffect(() => {
        if (
            location.pathname === "/login" ||
            location.pathname === "register"
        ) {
            SetShowNav(false);
        }
    }, [location]);

    return (
        <>
            {showNav && (
                <div className="topnav">
                    <NavLink activeClassName="active" to="/" exact={true}>
                        Home
                    </NavLink>
                    <NavLink activeClassName="active" to="/users">
                        Users
                    </NavLink>
                    <NavLink activeClassName="active" to="/projects">
                        Project
                    </NavLink>
                    <NavLink activeClassName="active" to="/about">
                        About
                    </NavLink>
                </div>
            )}
        </>
    );
};
export default Nav;
