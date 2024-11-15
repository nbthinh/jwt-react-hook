import { useEffect, useContext } from "react";
import {
    Route,
} from "react-router-dom";
import { useHistory, Redirect } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const PrivateRoutes = (props) => {
    let history = useHistory();
    const {user} = useContext(UserContext);

    useEffect(() => {
        // let session = sessionStorage.getItem("account");
        // if (!session) {
        //     history.push("/login");
        //     // window.location.reload();
        // }
    }, []);
    if (user && user.isAuthenticated === true) {
        return (
            <>
                <Route path={props.path} component={props.component} />
            </>
        );
    }
    else {
        return <Redirect to="/login"></Redirect>;
    }
}

export default PrivateRoutes;