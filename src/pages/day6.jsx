import { useState } from "react";
import { useDraggable, useDroppable, DndContext } from "@dnd-kit/core";
import { v4 as uuid } from "uuid";
import { CSS } from "@dnd-kit/utilities";

const Card = ({ todo }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: todo.id,
  });
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`border border-gray-300 p-2.5 my-1.5 bg-gray-500`}
      style={{
        transform: CSS.Translate.toString(transform)
      }}
    >
      {todo.text}
    </div>
  );
};

const DropToDeleteArea = () => {
  const { isOver: isOverDeleteArea, setNodeRef: setDeleteAreaNodeRef } =
    useDroppable({
      id: "delete-task-area",
    });

  return (
    <div
      ref={setDeleteAreaNodeRef}
      className={`text-gray-500 border border-gray-400 p-2.5 m-2.5 min-h-[60px] ${
        isOverDeleteArea ? "bg-lavender" : "bg-[floralwhite]"
      }`}
    >
      Drop here to delete
    </div>
  );
};

const TaskColumn = ({ title, todos }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: title,
  });

  return (
    <div
      ref={setNodeRef}
      className={`border border-gray-400 px-2.5 pb-2.5 m-2.5 min-w-[300px] ${
        isOver ? "bg-lavender" : "bg-transparent"
      }`}
    >
      <h3>{title}</h3>
      <div>
        {todos.map((todo) => (
          <Card key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
};

const ToDoList = ({ todos: initialTodos }) => {
  const [todos, setTodos] = useState(initialTodos);
  const [newTodoText, setNewTodoText] = useState("");

  const handleAddTodo = (e) => {
    e.preventDefault();

    // add the todo
    setTodos([
      ...todos,
      {
        id: uuid,
        text: newTodoText,
        status: "to-do",
      },
    ]);
    // clear the input
    setNewTodoText("");
  };

  const updateTodoStatus = (draggedTodoId, droppedColumnTitle) => {
    const statusByColumn = {
      "To do": "to-do",
      "In progress": "in-progress",
      Done: "done",
    };

    setTodos(
      todos.map((todo) => {
        if (todo.id === draggedTodoId) {
          return {
            ...todo,
            status: statusByColumn[droppedColumnTitle],
          };
        } else {
          return todo;
        }
      })
    );
  };

  const deleteTodo = (draggedTodoId) => {
    setTodos(todos.filter((todo) => todo.id !== draggedTodoId));
  };

  const handleDragEnd = ({ active, over }) => {
    if (!over) {
      // if user dropped the task outside any droppable area, return
      return;
    }
    const draggedTodoId = active.id;
    const droppedAreaId = over.id;
    if (droppedAreaId === "delete-task-area") {
      deleteTodo(active.id);
    } else {
      updateTodoStatus(draggedTodoId, droppedAreaId);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <form
        onSubmit={handleAddTodo}
        className="flex m-2.5 gap-2.5"
      >
        <input
          className="p-2 border border-gray-300 rounded-md"
          type="text"
          name="newTodoText"
          placeholder="type in your todo"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
        />
        <button type="submit">Add todo</button>
      </form>
      <div className="flex">
        <TaskColumn
          title="To do"
          todos={todos.filter((t) => t.status === "to-do")}
        />
        <TaskColumn
          title="In progress"
          todos={todos.filter((t) => t.status === "in-progress")}
        />
        <TaskColumn
          title="Done"
          todos={todos.filter((t) => t.status === "done")}
        />
      </div>
    </DndContext>
  );
};

function Day6() {
  return (
    <>
      <h2 className="text-2xl">Day 6: Build a drag and drop to-do list</h2>
      <a href="https://reactpractice.dev/exercise/build-a-drag-and-drop-to-do-list/?utm_source=calendar.reactpractice.dev&utm_medium=social&utm_campaign=calendar-v1">
        題目連結
      </a>
      <ToDoList
        todos={[
          { id: 1, text: "but fruits", status: "to-do" },
          { id: 2, text: "learning react - Hooks", status: "in-progress" },
          { id: 3, text: "go to gym", status: "done" },
        ]}
      />
    </>
  );

};

export default Day6;