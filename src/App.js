import React, { Component } from "react";
import "./App.css";
import TodoApp from "./TodoApp.jsx";
import { Button } from "antd";

class App extends Component {
  render() {
    return (
      <div>
        <TodoApp />
      </div>
    );
  }
}

export default App;
