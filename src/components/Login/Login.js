import "./Login.scss";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Login = (props) => {
    const history = useHistory();
    const handleToRegisterPage = () => {
        history.push("/register");
    };
    return (
        <div className="login-container container-fluid pt-md-5 px-md-5">
            <div className="row px-md-5">
                <div className="login-introduce col-md-7 d-flex flex-column">
                    <div className="brand text-center text-primary d-none d-md-block">
                        react js
                    </div>
                    <div className="description d-none d-md-block text-dark-50 ">
                        If you change your mind, click the lock to give Chrome
                        permission to send you desktop notifications.
                    </div>
                </div>
                <div className="login-form container py-5 px-3 col-md-5">
                    <div className="row">
                        <div className="col-md-12 d-md-none text-center fs-1 fw-bold text-primary">
                            Register
                        </div>
                        <div className="col-12 my-2">
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Enter your user name..."
                            />
                        </div>
                        <div className="col-12 my-2">
                            <input
                                type="password"
                                className="form-control form-control-lg"
                                placeholder="Enter your password..."
                            />
                        </div>
                        <div className="col-12 my-2">
                            <button className="btn btn-primary w-100 btn-lg">
                                Login
                            </button>
                        </div>
                        <div className="col-12 text-center my-3">
                            <Link className="forgot-password" exact to="/">
                                Forgot you password
                            </Link>
                        </div>
                        <div className="line col-12 mb-2" />
                        <div className="col-12 my-2 text-center">
                            <button
                                className="btn btn-lg btn-success"
                                onClick={() => handleToRegisterPage()}
                            >
                                Create your account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Login;
