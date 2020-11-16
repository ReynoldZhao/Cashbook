import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap'
import Home from '../src/containers/Home'
import Create from '../src/containers/Create'
import { testItems, testCategories } from './testData'
import { flattenArray } from "./utility";
import { AppContext } from "./AppContext"

class App extends Component {
  constructor(props) {
    super(props)
    this.setState = {
      items: flattenArray(testItems),
      categories: flattenArray(testCategories)
    }
  }
  render() {
    return (
      <AppContext.Provider value={{
        state: this.state,
        actions: this.actions,
      }}>
      <Router>
        <div className="App">
          <div className="container pb-5">
            <Route path="/" exact component={Home} />
            <Route path="/create" component={Create} />
            <Route path="/edit/:id" component={Create} />
          </div>
        </div>
      </Router>
      </AppContext.Provider>
    )
  }
}

export default App;
