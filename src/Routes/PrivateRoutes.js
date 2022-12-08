import { useContext } from "react";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { UserContext } from "../context";

const PrivateRoutes = (props) => {
    let { user } = useContext(UserContext);
    return (
        <>
            {user && user.isAuthenticate ? (
                <Route path={props.path} component={props.component} />
            ) : (
                <Redirect to="/login" />
            )}
        </>
    );
};

export default PrivateRoutes;
