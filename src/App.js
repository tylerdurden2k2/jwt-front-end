import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import NavHeader from "./components/Navigation/NavHeader";
import AppRoutes from "./Routes/AppRoutes";
import RiseLoader from "react-spinners/RiseLoader";
import { useContext } from "react";
import { UserContext } from "./context";

function App() {
    let { user } = useContext(UserContext);
    return (
        <>
            <Router>
                {user && user.isLoading ? (
                    <div className="loading">
                        <RiseLoader
                            color={"#365ed6"}
                            loading={true}
                            cssOverride={{}}
                            size={20}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>
                ) : (
                    <>
                        <div className="app-header">
                            <NavHeader />
                        </div>
                        <div className="app-container">
                            <AppRoutes />
                        </div>
                    </>
                )}
            </Router>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
}

export default App;
