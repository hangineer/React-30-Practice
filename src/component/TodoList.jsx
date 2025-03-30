import { useState } from "react";
import { useLocalStorage } from "@/hooks";
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import { v4 as uuidv4 } from 'uuid';

function TodoList() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useLocalStorage("todoList", []);

  const handleToggleTodo = (todo) => {
    const updatedTodos = todos.map((t) =>
      t.id === todo.id
        ? { ...t, status: !t.status }
        : t
    );
    setTodos(updatedTodos);
  };

  const handleAddTodo = (e) => {
    e.preventDefault();

    const newTodoItem = {
      id: uuidv4(),
      text: newTodo,
      status: false,
    };
    setTodos([...todos, newTodoItem]);
    setNewTodo("");
  };

  const handleDeleteTodo = (todo) => {
    const target = todos.filter(t => t.id !== todo.id);
    setTodos(target);
  };

  return(
    <div>
      <input
        className="border-1 p-1 mr-2 mt-2"
        type="text"
        placeholder="Add a new todo"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button type="button" onClick={handleAddTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              className="mr-1"
              type="checkbox"
              checked={todo.status}
              onChange={() => handleToggleTodo(todo)}
            />
            <span className={todo.status ? "line-through" : ""}>{todo.text}</span>
            <RestoreFromTrashIcon className="cursor-pointer hover:opacity-50 ml-4" onClick={() => handleDeleteTodo(todo)} />
          </li>
        ))}
      </ul>
    </div>
  )
};

export default TodoList;