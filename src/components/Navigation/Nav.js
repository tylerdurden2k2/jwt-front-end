import "./Nav.scss";
import { NavLink, useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context";

const Nav = (props) => {
    let location = useLocation();
    let { user } = useContext(UserContext);
    return (
        <>
            {(user && user.isAuthenticate) || location.pathname === "/" ? (
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
            ) : (
                <></>
            )}
        </>
    );
};
export default Nav;
