import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context";

const Home = (props) => {
    let { user } = useContext(UserContext);
    useEffect(() => {
        console.log("user: ", user);
    }, [user]);

    return <h1 className="text-primary text-center">HOME PAGE</h1>;
};
export default Home;
