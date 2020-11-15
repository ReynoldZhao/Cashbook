import React from "react";
import PropTypes from "prop-types";
import Ionicon from "react-ionicons";
import { isValidDate } from "../utility";

class PriceFrom extends React.Component {
  static propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
    onCancelSubmit: PropTypes.func.isRequired,
    item: PropTypes.object,
  };
  static defaultProps = {
    item: {},
  };
  state = {
    validatePass: true,
    errorMessage: "",
  };
  subFrom = (event) => {
    const { item, onFormSubmit } = this.props;
    const edieMode = !!item.id;
    const price = this.priceInput.value.trim() * 1;
    const date = this.dateInput.value.trim();
    const title = this.titleInput.value.trim();
    if (price && date && title) {
      if (price < 0) {
        this.setState({
          validatePass: false,
          errorMessage: "价格数字必须大于0",
        });
      } else if (!isValidDate(date)) {
        this.setState({
          validatePass: false,
          errorMessage: "请填写正确的日期格式",
        });
      } else {
        this.setState({
          validatePass: true,
          errorMessage: "",
        });
        if (editMode) {
          onFormSubmit({ ...item, title, price, date }, editMode);
        } else {
          onFormSubmit({ title, price, date }, editMode);
        }
      }
    } else {
      this.setState({
        validatePass: false,
        errorMessage: "请输入所有必选项",
      });
    }
    event.preventDefault();
  };
  render() {
    const { title, price, date } = this.props.item;
    return (
      <form
        onSubmit={(event) => {
          this.subFrom(event);
        }}
        noValidate
      >
        <div class="form-group">
          <label htmlFor="title">标题 *</label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="请输入标题"
            defaultValue={title}
            ref={(input) => {
              this.titleInput = input;
            }}
          />
          <small id="emailHelp" class="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div class="form-group">
          <label htmlFor="price">价格 *</label>
          <input
            type="number"
            className="form-control"
            defaultValue={price}
            id="price"
            placeholder="请输入价格"
            ref={(input) => {
              this.priceInput = input;
            }}
          />
        </div>
        <div class="form-group form-check">
          <label htmlFor="date">日期 *</label>
          <input
            type="date"
            className="form-control"
            id="date"
            placeholder="请输入日期"
            defaultValue={date}
            ref={(input) => {
              this.dateInput = input;
            }}
          />
        </div>
        <button type="submit" className="btn btn-primary mr-3">
          提交
        </button>
        <button className="btn btn-secondary" onClick={}>
          取消
        </button>
        {!this.state.validatePass && (
          <div className="alert alert-danger mt-5" role="alert">
            {this.state.errorMessage}
          </div>
        )}
      </form>
    );
  }
}

export default PriceFrom;
