import React, { Component } from 'react';
import * as Babel from 'babel-standalone';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '/* Add your React Code Here */',
      err: '',
      output: ''
    }
  }

  update(e) {
    let code = e.target.value;
    let transpiledCode = Babel.transform(code, { presets: ['react', 'es2015'] })
      .code
      .replace('"use strict";', '');
    try {
      this.setState({
        output: transpiledCode,
        err: ''
      });
      eval(transpiledCode);
    } catch (err) {
      this.setState({
        err: err.message
      });
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <header>{this.state.err}</header>
        <div className="container">
          <textarea
            onChange={this.update.bind(this)}
            defaultValue={this.state.input}
            />
          <pre>{this.state.output}</pre>
          <div id="output"></div>
        </div>
      </div>
    );
  }
}

export default App;
