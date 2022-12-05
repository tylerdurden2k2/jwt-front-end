import "./Register.scss";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

const Register = (props) => {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");

    const handleValidateForm = () => {
        const regex = /^\S+@\S+\.\S+$/;
        if (!email) {
            toast.error("You need to input email");
            return false;
        }
        if (!phone) {
            toast.error("You need to input email");
            return false;
        }
        if (!username) {
            toast.error("You need to input username");
            return false;
        }
        if (!password) {
            toast.error("You need to input password");
            return false;
        }
        if (password !== rePassword) {
            toast.error("You re-password error");
            return false;
        }
        if (!regex.test(email)) {
            toast.error("Your email invalid");
            return false;
        }
        toast.success("Success!");
        return true;
    };

    const handleConfirm = () => {
        handleValidateForm();
    };
    const handleToLoginPage = () => {
        history.push("/login");
    };
    return (
        <div className="register-container container-fluid pt-md-5 px-md-5">
            <div className="row px-md-5">
                <div className="register-introduce col-md-7 d-flex flex-column">
                    <div className="brand text-center text-primary d-none d-md-block">
                        react js
                    </div>
                    <div className="description d-none d-md-block text-dark-50 ">
                        If you change your mind, click the lock to give Chrome
                        permission to send you desktop notifications.
                    </div>
                </div>
                <div className="register-form container py-2 px-3 col-md-5">
                    <div className="row">
                        <div className="col-md-12 d-md-none text-center fs-1 fw-bold text-primary">
                            Register
                        </div>
                        <div className="col-12 my-1">
                            <div className="form-group">
                                <label className="fs-6">Your email</label>
                                <input
                                    type="email"
                                    className="form-control "
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-12 my-1">
                            <div className="form-group">
                                <label className="fs-6">Phone</label>
                                <input
                                    type="text"
                                    className="form-control "
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-12 my-1">
                            <div className="form-group">
                                <label className="fs-6">User name</label>
                                <input
                                    type="text"
                                    className="form-control "
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <div className="col-12 my-1">
                            <div className="form-group">
                                <label className="fs-6">Password</label>
                                <input
                                    type="password"
                                    className="form-control "
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <div className="col-12 my-1">
                            <div className="form-group">
                                <label className="fs-6">
                                    Re-enter password
                                </label>
                                <input
                                    type="password"
                                    className="form-control "
                                    value={rePassword}
                                    onChange={(e) =>
                                        setRePassword(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <div className="col-12 my-2">
                            <button
                                className="btn btn-primary w-100 btn-lg"
                                onClick={() => handleConfirm()}
                            >
                                Done
                            </button>
                        </div>
                        <div className="line col-12 mb-2" />
                        <div className="col-12 my-2 text-center">
                            <button
                                className="btn btn-lg btn-success"
                                onClick={() => handleToLoginPage()}
                            >
                                Turn Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Register;
