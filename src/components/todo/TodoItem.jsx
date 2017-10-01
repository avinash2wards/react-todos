import React from "react";
import { Card, Checkbox, Icon } from "antd";
import "./TodoItem.css";

export const TodoItem = props => (
  <Card.Grid className="todo-item">
    <Checkbox
      type="checkbox"
      onChange={() => props.handleToggleTodo(props.id)}
      checked={props.isComplete}
    />
    <span>{props.name}</span>
    <Icon
      className={"delete-todo"}
      onClick={event => props.handleRemoveTodo(props.id, event)}
      type="delete"
    />
  </Card.Grid>
);
