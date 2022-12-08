import { createContext, useState, useEffect } from "react";
import { getUserAccount } from "../services/userService";

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        isAuthenticate: false,
        token: "",
        account: {},
        isLoading: true,
    });

    const login = (userData) => {
        setUser({ ...userData, isLoading: false });
    };

    const logout = () => {
        setUser((user) => ({
            name: "",
            auth: false,
        }));
    };

    const fetchUser = async () => {
        let response = await getUserAccount();
        if (response && response.EC === 0) {
            let { roles, username, email, access_token } = response.DT;
            let data = {
                isAuthenticate: true,
                token: access_token,
                account: {
                    email,
                    username,
                    roles,
                },
                isLoading: false,
            };
            setTimeout(() => {
                setUser(data);
            }, 3000);
        } else {
            setUser({
                isAuthenticate: false,
                token: "",
                account: {},
                isLoading: false,
            });
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);
    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
