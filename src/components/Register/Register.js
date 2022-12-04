import "./Register.scss";
import { useHistory } from "react-router-dom";

const Register = (props) => {
    const history = useHistory();
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
                                    placeholder="Enter your user name..."
                                />
                            </div>
                        </div>
                        <div className="col-12 my-1">
                            <div className="form-group">
                                <label className="fs-6">Phone</label>
                                <input
                                    type="text"
                                    className="form-control "
                                    placeholder="Enter your user name..."
                                />
                            </div>
                        </div>
                        <div className="col-12 my-1">
                            <div className="form-group">
                                <label className="fs-6">User name</label>
                                <input
                                    type="text"
                                    className="form-control "
                                    placeholder="Enter your user name..."
                                />
                            </div>
                        </div>
                        <div className="col-12 my-1">
                            <div className="form-group">
                                <label className="fs-6">Password</label>
                                <input
                                    type="password"
                                    className="form-control "
                                    placeholder="Enter your user name..."
                                />
                            </div>
                        </div>
                        <div className="col-12 my-2">
                            <button className="btn btn-primary w-100 btn-lg">
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
