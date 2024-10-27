import "./Login.scss";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { loginUser } from "../../services/userService";
const Login = (props) => {
    const [valueLogin, setValueLogin] = useState("");
    const [password, setPassword] = useState("");
    const defaultObjValidInput = {
        isValidValueLogin: true,
        isValidPassword: true
    };
    const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);
    let history = useHistory();
    const handleCreateNewAccount = () => {
        history.push("register")
    }
    

    const handleLogin = async () => {
        setObjValidInput(defaultObjValidInput);
        if (!valueLogin) {
            setObjValidInput({ ...defaultObjValidInput, isValidValueLogin: false })
            toast.error("Please enter your email address or your phone number");
            return;
        }

        if (!password) {
            setObjValidInput({ ...defaultObjValidInput, isValidPassword: false })
            toast.error("Please enter your password");
            return;
        }
        let response = await loginUser(valueLogin, password);
        console.log("response = ", response);
        if (response && response.data && +response.data.EC === 0) {
            // success
            let data = {
                isAuthenticated: true,
                token: "fake token"
            }
            sessionStorage.setItem("account", JSON.stringify(data));
            history.push("/users");
            window.location.relead();
        }

        if (response && response.data && +response.data.EC !== 0) {
            toast.error(response.data.EM);
        }
    }

    const handlePressEnter = (event) => {
        if (event.charCode === 13 && event.code === "Enter") {
            handleLogin();
        }
    }

    return (
        <div className="login-container">
            <div className="container">
                <div className="row px-3 px-sm-0">
                    <div className="content-left col-12 d-none col-sm-7 d-sm-block">
                        <div className="brand">
                            Hỏi dân IT
                        </div>
                        <div className="detail">
                            Facebook helps you connect and share with the people in your life.
                        </div>
                    </div>
                        
                    <div className="content-right col-sm-5 col-12 d-flex flex-column gap-3 py-3 px-3">
                        <div className="brand d-sm-none">
                            Hỏi dân IT
                        </div>
                        <input
                            type="text"
                            className={ objValidInput.isValidValueLogin ?  "form-control" : "form-control is-invalid"}
                            placeholder="Email address or phone number"
                            value={valueLogin} onChange={(event) => setValueLogin(event.target.value)}
                        />
                        <input
                            type="password"
                            className={ objValidInput.isValidPassword ?  "form-control" : "form-control is-invalid"}
                            placeholder="password"
                            value={password} onChange={(event) => setPassword(event.target.value)}
                            onKeyPress={(event) => handlePressEnter(event)}
                        />
                        <button className="btn btn-primary" onClick={() => handleLogin()}>Login</button>
                        <span className="text-center">
                            <a className="forgot-password" href="#">
                                Forgot your password
                            </a>
                        </span>
                        <hr />
                        <div className="text-center">
                            {/* <Link className="btn btn-success" to="/register">Create new Account</Link> */}
                            <button className="btn btn-success" onClick={() => handleCreateNewAccount()}>Create new Account</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;