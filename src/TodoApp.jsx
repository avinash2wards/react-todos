import React, { Component } from "react";
import "./TodoApp.css";
import { TodoForm } from "./components/todo/TodoForm";
import { TodoList } from "./components/todo/TodoList";
import {
  addNewTodo,
  generateId,
  findTodoById,
  toggleTodo,
  updateTodo,
  removeTodo
} from "./lib/TodoHelper.js";
import { toDoService } from "./lib/TodoService.js";
import { Layout, Menu, Row, Col, message, Alert } from "antd";

const { Header, Content, Footer } = Layout;

class TodoApp extends Component {
  constructor() {
    super();

    this.state = {
      todos: [],
      currentTodo: "",
      errorMessage: "",
      message: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleToggleTodo = this.handleToggleTodo.bind(this);
    this.handleRemoveTodo = this.handleRemoveTodo.bind(this);
  }

  componentDidMount() {
    toDoService.loadTodos().then(todos => this.setState({ todos }));
  }

  handleInputChange(event) {
    this.setState({
      currentTodo: event.target.value,
      errorMessage: ""
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!this.state.currentTodo) {
      this.setState({
        errorMessage: "Please enter a todo name.."
      });
      return;
    }
    let newId = generateId(this.state.todos);
    let newTodo = {
      id: newId,
      name: this.state.currentTodo,
      isComplete: false
    };
    let newList = addNewTodo(this.state.todos, newTodo);
    this.setState({
      todos: newList,
      currentTodo: ""
    });

    toDoService
      .createTodo(newTodo)
      .then(todo => this.showTempMessage("Todo added successfully."));
  }

  handleToggleTodo(id) {
    let selectedTodo = findTodoById(id, this.state.todos);
    let toggled = toggleTodo(selectedTodo);
    let updatedTodos = updateTodo(this.state.todos, toggled);
    this.setState({
      todos: updatedTodos
    });

    toDoService
      .updateTodo(toggled)
      .then(() => this.showTempMessage("Todo updated successfully."));
  }

  handleRemoveTodo(id, event) {
    event.preventDefault();
    let updatedTodos = removeTodo(this.state.todos, id);
    this.setState({
      todos: updatedTodos
    });
    toDoService
      .deleteTodo(id)
      .then(() => this.showTempMessage("Todo deleted successfully."));
  }

  showTempMessage(msg) {
    message.config({
      top: 90
    });
    message.success(msg);
  }

  render() {
    return (
      <Layout>
        <Header style={{ position: "fixed", width: "100%" }}>
          <div className="logo">
            <h2>React Todos</h2>
          </div>
        </Header>
        <Content style={{ padding: "0 50px", marginTop: 64 }}>
          <div style={{ margin: "12px 0" }} />
          <div
            style={{
              background: "#fff",
              padding: 24,
              minHeight: 495,
              textAlign: "center"
            }}
          >
            <Row>
              <Col xs={2} sm={4} md={6} lg={8} xl={10} />
              <Col xs={20} sm={16} md={12} lg={8} xl={4}>
                <TodoForm
                  handleSubmit={this.handleSubmit}
                  handleInputChange={this.handleInputChange}
                  currentTodo={this.state.currentTodo}
                />
              </Col>
              <Col xs={2} sm={4} md={6} lg={8} xl={10} />
            </Row>
            <Row>
              <Col xs={2} sm={4} md={6} lg={8} xl={10} />
              <Col xs={20} sm={16} md={12} lg={8} xl={4}>
                {this.state.errorMessage && (
                  <Alert
                    className="error"
                    message={this.state.errorMessage}
                    type="error"
                    showIcon
                  />
                )}
              </Col>
              <Col xs={2} sm={4} md={6} lg={8} xl={10} />
            </Row>
            <Row>
              <Col xs={2} sm={4} md={6} lg={8} xl={10} />
              <Col xs={20} sm={16} md={12} lg={8} xl={4}>
                <TodoList
                  handleRemoveTodo={this.handleRemoveTodo}
                  handleToggleTodo={this.handleToggleTodo}
                  todos={this.state.todos}
                />
              </Col>
              <Col xs={2} sm={4} md={6} lg={8} xl={10} />
            </Row>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Todo App ©1990</Footer>
      </Layout>
    );
  }
}

export default TodoApp;
