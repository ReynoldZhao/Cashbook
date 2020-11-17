import React from "react";
import CategorySelect from "../components/CategorySelect";
import { Tab, Tabs } from "../components/Tabs";
import PriceForm from "../components/PriceForm";
import { testCategories } from "../testData";
import { TYPE_INCOME, TYPE_OUTCOME } from "../utility";
import withContext from "../WithContext";
import { withRouter } from "react-router-dom";

const tabsText = [TYPE_OUTCOME, TYPE_INCOME]

class Create extends React.Component {
  constructor(props) {
    super(props);
    const { id } = props.match.params
    const { categories, items } = props.data
    this.state = {
      selectedTab: (id && items[id]) ? categories[items[id].cid].type : TYPE_OUTCOME,
      selectedCategory: (id && items[id]) ? categories[items[id].cid] : null,
      validationPassed: true,
    };
  }
  tabChange = (index) => {
    this.setState({
      selectedTab: tabsText[index],
    });
  };
  selectCategory = (category) => {
    this.setState({
      selectedCategory: category
    })
  }
  cancelSubmit = () => {
    this.props.history.push("/");
  }
  submitForm = (data, isEditMode) => {
    if (!this.state.selectedCategory) {
      this.setState({
        validationPassed: false
      })
      return 
    }
    if (!isEditMode) {
      //create
      this.props.actions.createItem(data, this.state.selectedCategory.id)
    } else {
      //update
      this.props.actions.updateItem(data, this.state.selectedCategory.id)
    }
    this.props.history.push('/')
  }
  render() {
    const { data } = this.props;
    const { items, categories } = data;
    const { id } = this.props.match.params
    const editItem = ( id && items[id] ) ? items[id] : {}
    const { selectedTab, selectedCategory } = this.state;
    const filterCategories = Object.keys(categories)
      .filter(id => categories[id].type === selectedTab)
      .map(id => categories[id]);
    const tabIndex = tabsText.findIndex(text => text === selectedTab )
    return (
      <div
        className="create-page py-3 px-3 rounded mt-3"
        style={{ background: "#fff" }}
      >
        <Tabs activeIndex={tabIndex} onTabChange={this.tabChange}>
          <Tab>支出</Tab>
          <Tab>收入</Tab>
        </Tabs>
        <CategorySelect
          categories={filterCategories}
          onSelectCategory={this.selectCategory}
          selectedCategory={selectedCategory}
        />
        <PriceForm 
          onFormSubmit={this.submitForm} 
          onCancelSubmit={this.cancelSubmit} 
          item={editItem}  
        />
      </div>
    );
  }
}

export default withRouter(withContext(Create));
