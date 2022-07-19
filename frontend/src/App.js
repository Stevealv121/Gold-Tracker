import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/login";
import Home from "./components/home";
import Cards from "./components/cards/cards";

function App() {
  const [user, setUser] = React.useState(null);


  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null);
  }


  return (
    <div className="App">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <Link class="navbar-brand" to="/home">Gold Tracker</Link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link class="nav-link active" aria-current="page" to="/home">Home</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/cards">Cards</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/">Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container-fluid">
        <Routes>
          <Route exact path="/" element={<Login login={login} />}>
          </Route>
          <Route path="/home" element={<Home user={user} />}>
          </Route>
          <Route path="/cards" element={<Cards user={user} />}>
          </Route>
        </Routes>
      </div>
    </div>

  );
}

export default App;
