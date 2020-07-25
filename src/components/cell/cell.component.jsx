import React, { Component } from "react";
import "./cell.styles.css";
class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.toggle(this.props.index);
  }
  render() {
    const lightState = this.props.on ? "#00bcd4" : "#263238";
    const hoverState = this.props.on ? "#0096AA" : "#2b2668";
    return (
      <div
        className="Cell"
        style={{ backgroundColor: lightState }}
        onClick={this.handleClick}
      ></div>
    );
  }
}

export default Cell;
