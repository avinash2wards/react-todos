import React from "react";
import { TodoItem } from "./TodoItem";
import { Spin, Card } from "antd";

export const TodoList = props => {
  if (props.todos.length === 0) {
    return <Spin />;
  }
  return (
    <Card noHovering>
      {props.todos.map(todo => (
        <TodoItem
          handleRemoveTodo={props.handleRemoveTodo}
          handleToggleTodo={props.handleToggleTodo}
          key={todo.id}
          {...todo}
        />
      ))}
    </Card>
  );
};
