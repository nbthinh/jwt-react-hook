import {
    Switch,
    Route,
} from "react-router-dom";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import Users from "../components/ManageUsers/Users";
import PrivateRoutes from "./PrivateRoutes";
import Role from "../components/Role/Role";
import GroupRole from "../components/GroupRole/GroupRole";

const Projects = (props) => {
    return (
        <>
            <span>Hello Project component in AppRoutes</span>
        </>
    );
}

const AppRoutes = (props) => {
    return (
        <>
            <Switch>
                {/* <Route path="/project">
                    Project
                </Route>
                <Route path="/users">
                    <Users />            
                </Route> */}
                <PrivateRoutes path="/users" component={Users} />
                <PrivateRoutes path="/projects" component={Projects} />
                <PrivateRoutes path="/roles" component={Role} />
                <PrivateRoutes path="/group-role" component={GroupRole} />
                <Route path="/login">
                    <Login />
                </Route>

                <Route path="/register">
                    <Register />
                </Route>

                <Route path="/" exact>
                    Home
                </Route>
                <Route path="*" >
                    404 Not Found
                </Route>
            </Switch>
        </>
    );
}
export default AppRoutes;