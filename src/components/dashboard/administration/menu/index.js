import React, { Component } from "react";
import "../adminDashboard.css";
import { Link } from "react-router-dom";

function venueIcon () {
    return(
        <svg className="menu-item-svg" width="15" height="20" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.72922 19.5965C1.05352 11.3684 0 10.5239 0 7.5C0 3.35785 3.35785 0 7.5 0C11.6421 0 15 3.35785 15 7.5C15 10.5239 13.9465 11.3684 8.27078 19.5965C7.89832 20.1345 7.10164 20.1345 6.72922 19.5965ZM7.5 10.625C9.2259 10.625 10.625 9.2259 10.625 7.5C10.625 5.7741 9.2259 4.375 7.5 4.375C5.7741 4.375 4.375 5.7741 4.375 7.5C4.375 9.2259 5.7741 10.625 7.5 10.625Z" fill="#005404"/>
        </svg>
    );
}
function userIcon () {
    return (
        <svg className="menu-item-svg" width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 7C7.93437 7 9.5 5.43437 9.5 3.5C9.5 1.56562 7.93437 0 6 0C4.06563 0 2.5 1.56562 2.5 3.5C2.5 5.43437 4.06563 7 6 7ZM8.4 8H8.14062C7.49062 8.3125 6.76875 8.5 6 8.5C5.23125 8.5 4.5125 8.3125 3.85938 8H3.6C1.6125 8 0 9.6125 0 11.6V12.5C0 13.3281 0.671875 14 1.5 14H10.5C11.3281 14 12 13.3281 12 12.5V11.6C12 9.6125 10.3875 8 8.4 8ZM15 7C16.6562 7 18 5.65625 18 4C18 2.34375 16.6562 1 15 1C13.3438 1 12 2.34375 12 4C12 5.65625 13.3438 7 15 7ZM16.5 8H16.3813C15.9469 8.15 15.4875 8.25 15 8.25C14.5125 8.25 14.0531 8.15 13.6187 8H13.5C12.8625 8 12.275 8.18437 11.7594 8.48125C12.5219 9.30312 13 10.3938 13 11.6V12.8C13 12.8688 12.9844 12.9344 12.9812 13H18.5C19.3281 13 20 12.3281 20 11.5C20 9.56563 18.4344 8 16.5 8Z" fill="#005404"/>
        </svg>
    );
}

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
              }}>{this.props.title === "USERS"? userIcon(): this.props.title === "VENUES"? venueIcon(): ""   }{this.props.title}</span>

          </div>
        </Link>
      </div>
    );
  }
}

export default MenuItems;
