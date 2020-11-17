import React, { Component } from "react";
import logo from "../logo.svg";
import Ionicon from "react-ionicons";
import PriceList from "../components/PriceList";
import ViewTab from "../components/ViewTab";
import {
  padLeft,
  LIST_VIEW,
  CHART_VIEW,
  TYPE_INCOME,
  TYPE_OUTCOME,
  parseToYearAndMonth,
} from "../utility";
import MonthPicker from "../components/MonthPicker";
import TotalPrice from "../components/TotalPrice";
import CreateBtn from "../components/CreateBtn";
import { Tabs, Tab } from "../components/Tabs";
import { AppContext } from "../AppContext";
import withContext from "../WithContext";
import { withRouter } from "react-router-dom";

const tabsText = [LIST_VIEW, CHART_VIEW];

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: parseToYearAndMonth(),
      tabView: tabsText[0],
    };
  }
  changeView = (index) => {
    this.setState({
      tabView: tabsText[index],
    });
  };
  changeDate = (year, month) => {
    this.setState({
      currentDate: { year, month },
    });
  };
  modifyItem = (item) => {
    this.props.history.push(`/edit/${item.id}`);
  };
  createItem = () => {
    this.props.history.push("/create");
  };
  deleteItem = (item) => {
    this.props.actions.deleteItem(item);
  };
  render() {
    const { data } = this.props;
    const { items, categories } = data;
    const { currentDate, tabView } = this.state;
    const itemsWithCategory = Object.keys(items)
      .map((id) => {
        items[id].category = categories[items[id].cid];
        return items[id];
      })
      .filter((item) => {
        return item.date.includes(
          `${currentDate.year}-${padLeft(currentDate.month)}`
        );
      });
    let totalIncome = 0,
      totalOutcome = 0;
    itemsWithCategory.forEach((item) => {
      if (item.category.type === TYPE_OUTCOME) {
        totalOutcome += item.price;
      } else {
        totalIncome += item.price;
      }
    });
    return (
      <React.Fragment>
        <header className="App-header">
          <div className="row mb-5">
            <img src={logo} className="App-logo" alt="logo" />
          </div>
          <div className="row">
            <div className="col">
              <MonthPicker
                year={currentDate.year}
                month={currentDate.month}
                onChange={this.changeDate}
              />
            </div>
            <div className="col">
              <TotalPrice income={totalIncome} outcome={totalOutcome} />
            </div>
          </div>
        </header>
        <div className="content-area py-3 px-3">
          <Tabs activeIndex={0} onTabChange={this.changeView}>
            <Tab>
              <Ionicon
                className="rounded-circle mr-2"
                fontSize="25px"
                color={"#007bff"}
                icon="ios-paper"
              />
              列表模式
            </Tab>
            <Tab>
              <Ionicon
                className="rounded-circle mr-2"
                fontSize="25px"
                color={"#007bff"}
                icon="ios-pie"
              />
              图表模式
            </Tab>
          </Tabs>
          <ViewTab activeTab={tabView} onTabChange={this.changeView} />
          <CreateBtn onClick={this.createItem} />
          {tabView === LIST_VIEW && (
            <PriceList
              items={itemsWithCategory}
              onModifyItem={this.modifyItem}
              onDeleteItem={this.deleteItem}
            />
          )}
          {tabView === CHART_VIEW && <h1>图表模式</h1>}
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(withContext(Home));
