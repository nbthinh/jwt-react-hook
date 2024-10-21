import "./Login.scss";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Login = (props) => {
    let history = useHistory();
    const handleCreateNewAccount = () => {
        history.push("register")
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
                        <input type="text" className="form-control" placeholder="Email address or phone number" />
                        <input type="password" className="form-control" placeholder="password" />
                        <button className="btn btn-primary">Login</button>
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