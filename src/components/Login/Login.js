import "./Login.scss";
const Login = (props) => {
    return (
        <div className="login-container mt-3">
            <div className="container">
                <div className="row">
                    <div className="content-left col-7 red">
                        <div className="brand">
                            Hỏi dân IT
                        </div>
                        <div className="detail">
                            Facebook helps you connect and share with the people in your life.
                        </div>
                    </div>
                    <div className="content-right col-5 d-flex flex-column gap-3 py-3">
                        <input type="text" className="form-control" placeholder="Email address or phone number" />
                        <input type="password" className="form-control" placeholder="password" />
                        <button className="btn btn-primary">Login</button>
                        <span className="text-center">Forgot your password</span>
                        <hr />
                        <div className="text-center">
                            <button className="btn btn-success">Create new Account</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;