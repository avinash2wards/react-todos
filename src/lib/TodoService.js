const baseUrl = "http://localhost:9090/todos";

export const toDoService = {
  loadTodos: () => {
    return fetch(baseUrl).then(res => res.json());
  },

  createTodo: newTodo => {
    return fetch(baseUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTodo)
    }).then(res => res.json());
  },

  updateTodo: updatedTodo => {
    return fetch(`${baseUrl}/${updatedTodo.id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedTodo)
    }).then(res => res.json());
  },

  deleteTodo: id => {
    return fetch(`${baseUrl}/${id}`, {
      method: "DELETE"
    });
  }
};
