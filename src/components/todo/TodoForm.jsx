import React from "react";
import { Input, Button } from "antd";
import "./TodoForm.css";

export const TodoForm = props => (
  <form className="example-input" onSubmit={props.handleSubmit}>
    <Input
      size="large"
      placeholder="Enter a todo name here.."
      className="todo-input"
      type="text"
      autoFocus={true}
      value={props.currentTodo}
      onInput={props.handleInputChange}
    />
    <Button
      onClick={props.handleSubmit}
      type="submit"
      size="large"
      type="primary"
    >
      Add
    </Button>
  </form>
);
