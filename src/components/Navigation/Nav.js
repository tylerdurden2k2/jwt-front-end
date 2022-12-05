import "./Nav.scss";
import { NavLink } from "react-router-dom";

const Nav = (props) => {
    return (
        <div className="topnav">
            <NavLink activeClassName="active" to="/" exact={true}>
                Home
            </NavLink>
            <NavLink activeClassName="active" to="/news">
                News
            </NavLink>
            <NavLink activeClassName="active" to="/contact">
                Contact
            </NavLink>
            <NavLink activeClassName="active" to="/about">
                About
            </NavLink>
        </div>
    );
};
export default Nav;
