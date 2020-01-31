import React, { Component } from "react";
import "../adminDashboard.css";
import { Link } from "react-router-dom";


class MenuItems extends Component {
  state = {
    name: this.props.title
  };

  render() {
    return (
      <div>
        <Link to={this.props.link}>
          <div className="menu-item-container">
              <span className="menu-item-title"
               style={{
                color: this.props.selected ? "#005404" : ""
              }}>{this.props.title}</span>

          </div>
        </Link>
      </div>
    );
  }
}

export default MenuItems;
