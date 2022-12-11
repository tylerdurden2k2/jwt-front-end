import "./NavHeader.scss";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { logoutUser } from "../../services/userService";
import { toast } from "react-toastify";

const NavHeader = (props) => {
    let history = useHistory();
    let location = useLocation();
    let { user, logout } = useContext(UserContext);
    const handleToLoginPage = () => {
        history.push("/login");
    };
    const handleLogout = async () => {
        let response = await logoutUser();
        if (response && response.EC === 0) {
            toast.success(response.EM);
        } else {
            toast.error(response.EM);
        }
        localStorage.removeItem("jwt");
        logout();
    };
    return (
        <>
            {(user && user.isAuthenticate) || location.pathname === "/" ? (
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Container>
                        <NavLink to="/" exact={true}>
                            Home
                        </NavLink>

                        {user && user.isAuthenticate ? (
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="me-auto">
                                    <NavLink to="/users">User</NavLink>
                                    <NavLink to="/projects">Project</NavLink>
                                    <NavLink to="/roles">Role</NavLink>
                                    <NavLink to="/group-role">
                                        Group-Role
                                    </NavLink>
                                </Nav>
                                <Nav>
                                    <Nav.Link>
                                        <span className="welcome">Welcome</span>
                                        {user.account.email}
                                    </Nav.Link>
                                    <NavDropdown
                                        title="Options"
                                        id="collasible-nav-dropdown"
                                    >
                                        <NavDropdown.Item>
                                            Settings
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item>
                                            <span
                                                onClick={() => handleLogout()}
                                            >
                                                Log out
                                            </span>
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </Navbar.Collapse>
                        ) : (
                            <Navbar.Collapse
                                id="responsive-navbar-nav"
                                className="login"
                            >
                                <Nav.Link onClick={() => handleToLoginPage()}>
                                    Login
                                </Nav.Link>
                            </Navbar.Collapse>
                        )}
                    </Container>
                </Navbar>
            ) : (
                <></>
            )}
        </>
    );
};
export default NavHeader;
