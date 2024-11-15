import React, { useState, useEffect } from "react";
import { getUserAccount } from "../services/userService";
import { useHistory } from "react-router-dom";
const UserContext = React.createContext(null);

const UserProvider = ({ children }) => {
    let history = useHistory();
    const userDefault = {
        isLoading: true,
        isAuthenticated: false,
        token: "",
        email: {}
    }
    const [user, setUser] = useState(userDefault);

    const loginContext = (userData) => {
        setUser({...userData, isLoading: false});
    }

    const logout = () => {
        setUser((user) => ({
            name: "",
            auth: false
        }))
    }

    const fetchUser = async() => {
        let response = await getUserAccount();
        if (response && response.EC === 0) {
            let {groupWithRoles, email, username } = response.DT
            let token = response.DT.access_token
            // success
            console.log("[response] = ", response);
            let data = {
                isAuthenticated: true,
                token: token,
                account: {groupWithRoles, email, username},
                isLoading: false
            }
            setUser(data);
        }
        else {
            // history.push("login");
            setUser({...userDefault, isLoading: false})
        }
    }

    useEffect(() => {
        if (window.location.pathname !== "/" || window.location.pathname !== "/login") {
            fetchUser();
        }
    }, [])
    return (
        <UserContext.Provider value={{user, loginContext, logout}}>
            {children}
        </UserContext.Provider>
    );
}

export {
    UserProvider, UserContext
};
