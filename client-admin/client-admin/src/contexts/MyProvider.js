import React, { Component } from 'react';
import MyContext from './MyContext';

class MyProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      username: ''
    };
  }

  componentDidMount() {
    const token = sessionStorage.getItem('token');
    const username = sessionStorage.getItem('username');
    if (token && username) {
      this.setState({ token, username });
    }
  }

  setToken = (token) => {
    this.setState({ token });
    sessionStorage.setItem('token', token);
  };

  setUsername = (username) => {
    this.setState({ username });
    sessionStorage.setItem('username', username);
  };

  logout = () => {
    this.setState({ token: '', username: '' });
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
  };

  render() {
    const value = {
      token: this.state.token,
      username: this.state.username,
      setToken: this.setToken,
      setUsername: this.setUsername,
      logout: this.logout
    };

    return (
      <MyContext.Provider value={value}>
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

export default MyProvider;
