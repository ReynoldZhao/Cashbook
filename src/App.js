import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap'
import Home from '../src/containers/Home'
import Create from '../src/containers/Create'

function App() {
  return (
    <Router>
      <div className="App">
        <ul>
          <Link to="/">Home</Link>
          <Link to="/create">Create</Link>
          <Link to="/edit/10">Edit</Link>
        </ul>
        <Route path="/" exact component={Home} />
        <Route path="/create" component={Create} />
        <Route path="/edit/:id" component={Create} />
      </div>
    </Router>
  );
}

export default App;
