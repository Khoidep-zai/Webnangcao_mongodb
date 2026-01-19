import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class MenuComponent extends Component {
  static contextType = MyContext;

  render() {
    const { username, logout } = this.context;

    return (
      <div className="App-header">
        <h1>Admin Dashboard</h1>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Welcome, {username}!</span>
          <button
            onClick={logout}
            style={{
              padding: '8px 16px',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      </div>
    );
  }
}

export default MenuComponent;
