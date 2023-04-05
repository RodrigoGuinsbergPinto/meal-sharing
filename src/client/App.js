import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { MealsProvider } from "./components/MealsContext";
import MealList from "./components/MealList";
import Home from "./components/Home";
import MealDetails from "./components/MealDetails";
import Navbar from "./components/Navbar";
import Reviews from "./components/Reviews";
import Footer from "./components/Footer";

function App() {
  return (
    <MealsProvider>
      <div className="app-container">
        <Router>
          <Route exact path="/">
            <Navbar />
            <Home />
          </Route>

          <Route exact path="/meals">
            <Navbar />
            <MealList />
          </Route>

          <Route exact path="/meals/:id">
            <Navbar />
            <MealDetails />
          </Route>

          <Route exact path="/reviews">
            <Navbar />
            <Reviews />
          </Route>
        </Router>
        <Footer />
      </div>
    </MealsProvider>
  );
}

export default App;
