import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import Home from "../src/containers/Home";
import Create from "../src/containers/Create";
import { flattenArray, ID, parseToYearAndMonth } from "./utility";
import { AppContext } from "./AppContext";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      categories: {},
      isLoading: false,
      currentDate: parseToYearAndMonth(),
    };
    this.actions = {
      getInitialData: async () => {
        this.setState({
          isLoading: true,
        });
        const { currentDate } = this.state;
        const getURLWithData = `/items?monthCategory=${currentDate.year}-${currentDate.month}&_sort=timestamp&_order=desc`;
        const results = await Promise.all([
          axios.get("./categories"),
          axios.get(getURLWithData),
        ]);
        const [categories, items] = results;
        this.setState({
          items: flattenArray(items.data),
          categories: flattenArray(categories.data),
          isLoading: false,
        });
      },
      selectNewMonth: async (year, month) => {
        const getURLWithData = `/items?monthCategory=${year}-${month}&_sort=timestamp&_order=desc`;
        const items = await axios.get(getURLWithData);
        this.setState({
          items: flattenArray(items.data),
          currentDate: { year, month },
        });
      },
      deleteItem: async (item) => {
        const deleteItems = await axios.delete(`/items/${item.id}`);
        delete this.state.items[item.id];
        this.setState({
          items: this.state.items,
        });
      },
      createItem: (data, categoryId) => {
        const newId = ID();
        const parsedDate = parseToYearAndMonth(data.date);
        data.monthCategory = `${parsedDate.year}-${parsedDate.month}`;
        data.timestamp = new Date(data.date).getTime();
        const newItem = { ...data, id: newId, cid: categoryId };
        this.setState({
          items: { ...this.state.items, [newId]: newItem },
        });
      },
      updateItem: (item, updatedCategoryId) => {
        const modifiedItem = {
          ...item,
          cid: updatedCategoryId,
          timestamp: new Date(item.date).getTime(),
        };
        this.setState({
          items: { ...this.state.items, [modifiedItem.id]: modifiedItem },
        });
      },
    };
  }
  render() {
    return (
      <AppContext.Provider
        value={{
          state: this.state,
          actions: this.actions,
        }}
      >
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
    );
  }
}

export default App;
