import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MealList from "./components/MealList";

function App() {
  return (
    <Router>
      <Route exact path="/">
        <h1>Meal Sharing App</h1>
        <h2>Our Menu</h2>
        <MealList />
      </Route>
    </Router>
  );
}

export default App;
