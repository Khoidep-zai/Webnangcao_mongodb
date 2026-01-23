import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class MenuComponent extends Component {
  static contextType = MyContext;

  render() {
    const { username, logout } = this.context;

    return (
      <div className="border-bottom">
        <div className="float-left">
          <ul className="menu">
            <li className="menu"><a href="/admin/home">HOME</a></li>
            <li className="menu"><a href="/admin/category">CATEGORY</a></li>
            <li className="menu"><a href="/admin/product">PRODUCT</a></li>
            <li className="menu"><a href="/admin/order">ORDER</a></li>
            <li className="menu"><a href="/admin/customer">CUSTOMER</a></li>
          </ul>
        </div>
        <div className="float-right">
          <span style={{ marginRight: '10px' }}>Hello <b>{username}</b> | </span>
          <a href="#" onClick={(e) => { e.preventDefault(); logout(); }} style={{ color: '#0066cc' }}>Logout</a>
        </div>
        <div className="float-clear"></div>
      </div>
    );
  }
}

export default MenuComponent;
