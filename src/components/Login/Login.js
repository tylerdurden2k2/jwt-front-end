import "./Login.scss";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { userLogin } from "../../services/userService";

const Login = (props) => {
    const history = useHistory();
    const [keyLogin, setKeyLogin] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        let session = sessionStorage.getItem("account");
        if (session) {
            history.push("/");
        }
    }, [history]);

    const defaultObj = {
        keyLogin: true,
        password: true,
    };

    const [validField, setValidField] = useState(defaultObj);

    const handleLogin = async () => {
        setValidField(defaultObj);
        //valid form
        if (!keyLogin) {
            toast.error("Please enter your email or your phone!");
            setValidField({ ...defaultObj, keyLogin: false });
            return;
        }
        if (!password) {
            toast.error("Please enter your password!");
            setValidField({ ...defaultObj, password: false });
            return;
        }
        let response = await userLogin({ keyLogin, password });
        if (response && response.data && response.data.EC === 0) {
            toast.success(response.data.EM);
            let sessionValue = {
                isAuthenticate: true,
                token: "fake token",
            };
            sessionStorage.setItem("account", JSON.stringify(sessionValue));
            history.push("/users");
            window.location.reload();
        } else {
            toast.error(response.data.EM);
        }
    };

    const enterToLogin = (e) => {
        console.log("checck event: ", e);
        if (e.key === "Enter") {
            handleLogin();
        }
    };

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
                                className={
                                    validField.keyLogin
                                        ? "form-control form-control-lg"
                                        : "form-control is-invalid form-control-lg"
                                }
                                placeholder="Enter your email or your phone..."
                                value={keyLogin}
                                onChange={(e) => setKeyLogin(e.target.value)}
                            />
                        </div>
                        <div className="col-12 my-2">
                            <input
                                type="password"
                                className={
                                    validField.password
                                        ? "form-control form-control-lg"
                                        : "form-control is-invalid form-control-lg"
                                }
                                placeholder="Enter your password..."
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyPress={(e) => enterToLogin(e)}
                            />
                        </div>
                        <div className="col-12 my-2">
                            <button
                                className="btn btn-primary w-100 btn-lg"
                                onClick={() => handleLogin()}
                            >
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
