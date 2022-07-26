import React from "react";
import {
  Routes,
  Route,
  Link
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/login";
import Home from "./components/home";
import Cards from "./components/cards/cards";
import EditCard from "./components/cards/edit/edit_card";
import AddCard from "./components/cards/add/add_card";
import AddExpense from "./components/expenses/add_expense";
import EditExpense from "./components/expenses/edit_expense";
import DeleteCards from "./components/cards/delete/delete_card";
import Pantry from "./components/pantry/pantry";
import PantryPlace from "./components/pantry/place/pantry_place";
import AddToPantry from "./components/pantry/add/add_to_pantry";

function App() {
  const [user, setUser] = React.useState(null);
  const [card, setCard] = React.useState(null);
  const [expense, setExpense] = React.useState(null);
  const [place, setPlace] = React.useState(null);
  const [item, setItem] = React.useState(null);


  async function login(user = null) {
    setUser(user);
  }

  // async function logout() {
  //   setUser(null);
  // }

  async function selectCard(card = null) {
    setCard(card);
  }

  async function selectExpense(expense = null) {
    setExpense(expense);
  }
  async function selectPlace(place = null) {
    setPlace(place);
  }
  async function selectItem(item = null) {
    setItem(item);
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
                <Link class="nav-link" to="/pantry">Pantry</Link>
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
          <Route path="/cards" element={<Cards user={user} select={selectCard} />}>
          </Route>
          <Route path="/card/edit" element={<EditCard card={card} select={selectExpense} set={selectCard} />}>
          </Route>
          <Route path="/card/new" element={<AddCard user={user} />}>
          </Route>
          <Route path="/expense_add" element={<AddExpense user={user} card={card} />}>
          </Route>
          <Route path="/expense_edit" element={<EditExpense user={user} expense={expense} />}>
          </Route>
          <Route path="/cards/delete" element={<DeleteCards user={user} />}>
          </Route>
          <Route path="/pantry" element={<Pantry select={selectPlace} />}>
          </Route>
          <Route path="/place" element={<PantryPlace place={place} select={selectItem} />}>
          </Route>
          <Route path="/addToPantry" element={<AddToPantry item={item} place={place} />}>
          </Route>
        </Routes>
      </div>
    </div>

  );
}

export default App;
