import React, { Component } from 'react';
import './App.css';
import MyContext from './contexts/MyContext';
import LoginComponent from './components/LoginComponent';
import MenuComponent from './components/MenuComponent';
import MainComponent from './components/MainComponent';

class App extends Component {
  static contextType = MyContext;

  render() {
    const { token } = this.context;
    
    if (!token) {
      return <LoginComponent />;
    }

    return (
      <div className="App">
        <MenuComponent />
        <MainComponent />
      </div>
    );
  }
}

export default App;
