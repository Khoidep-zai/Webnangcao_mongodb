import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import axios from 'axios';

class LoginComponent extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: ''
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = this.state;

    if (!username || !password) {
      this.setState({ error: 'Please input username and password' });
      return;
    }

    try {
      const response = await axios.post('/api/admin/login', {
        username,
        password
      });

      if (response.data.success) {
        this.context.setToken(response.data.token);
        this.context.setUsername(username);
        this.setState({ error: '' });
      } else {
        this.setState({ error: response.data.message });
      }
    } catch (error) {
      this.setState({ error: 'Login failed. Please try again.' });
    }
  };

  render() {
    return (
      <div className="login-container">
        <form className="login-form" onSubmit={this.handleSubmit}>
          <h2>Admin Login</h2>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <button type="submit" className="btn-login">
            Login
          </button>
          {this.state.error && (
            <div className="error-message">{this.state.error}</div>
          )}
        </form>
      </div>
    );
  }
}

export default LoginComponent;
