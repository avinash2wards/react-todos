export const addNewTodo = (list, item) => list.concat(item);

export const generateId = list => Math.max(...list.map(a => a.id)) + 1;

export const findTodoById = (id, list) => {
  return list.find(item => item.id === id);
};

export const toggleTodo = todo => {
  return {
    ...todo,
    isComplete: !todo.isComplete
  };
};

export const updateTodo = (list, item) => {
  let updatedIndex = list.findIndex(i => i.id === item.id);

  return [
    ...list.slice(0, updatedIndex),
    item,
    ...list.slice(updatedIndex + 1)
  ];
};

export const removeTodo = (list, id) => {
  let updatedIndex = list.findIndex(i => i.id === id);
  return [...list.slice(0, updatedIndex), ...list.slice(updatedIndex + 1)];
};
