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
        <div className="login-box">
          <h2 className="login-title">ADMIN LOGIN</h2>
          <form onSubmit={this.handleSubmit}>
            <table className="login-table">
              <tbody>
                <tr>
                  <td>Username</td>
                  <td>
                    <input
                      type="text"
                      name="username"
                      value={this.state.username}
                      onChange={this.handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Password</td>
                  <td>
                    <input
                      type="password"
                      name="password"
                      value={this.state.password}
                      onChange={this.handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <input type="submit" value="LOGIN" className="login-button" />
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
          {this.state.error && (
            <div className="error-message">{this.state.error}</div>
          )}
        </div>
      </div>
    );
  }
}

export default LoginComponent;
