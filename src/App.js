import "./App.scss";
// import Nav from "./components/Navigation/Nav";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./components/Register/Register";

function App() {
    return (
        <Router>
            <div className="app-container">
                {/* <Nav /> */}
                <Switch>
                    <Route path="/news">News</Route>
                    <Route path="/contact">Contact</Route>
                    <Route path="/about">About</Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/register">
                        <Register />
                    </Route>
                    <Route exact path="/">
                        Home
                    </Route>
                    <Route path="*">404 Not Found</Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
