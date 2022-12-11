import { Switch, Route } from "react-router-dom";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import User from "../components/ManageUser/User";
import PrivateRoutes from "./PrivateRoutes";
import Project from "../components/Project/Project";
import Role from "../components/Role/Role";
import GroupRole from "../components/GroupRole/GroupRole";

const AppRoutes = (props) => {
    return (
        <>
            <Switch>
                <PrivateRoutes path={"/users"} component={User} />
                <PrivateRoutes path={"/projects"} component={Project} />
                <PrivateRoutes path={"/roles"} component={Role} />
                <PrivateRoutes path={"/group-role"} component={GroupRole} />
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
                <Route path="/" exact={true}>
                    Home
                </Route>
                <Route path="*">404 Not Found</Route>
            </Switch>
        </>
    );
};

export default AppRoutes;
