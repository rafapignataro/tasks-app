import '../styles/tasklist.scss';

import { useState } from 'react';
import { FiCheckSquare, FiTrash } from 'react-icons/fi';

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    if (!newTaskTitle || newTaskTitle.length === 0) return;

    let id: number;

    do {
      id = Math.floor(Math.random() * Math.floor(1000));
    } while (tasks.some((task) => task.id === id));

    const newTask = {
      id: Math.floor(Math.random() * Math.floor(1000)),
      title: newTaskTitle,
      isComplete: false,
    };

    setTasks([...tasks, newTask]);
  }

  function handleToggleTaskCompletion(id: number) {
    const finalArray = [...tasks];
    const taskIndex = finalArray.findIndex((task) => task.id === id);

    if (!finalArray[taskIndex]) return;

    finalArray[taskIndex].isComplete = !finalArray[taskIndex].isComplete;

    setTasks(finalArray);
  }

  function handleRemoveTask(id: number) {
    const newArray = tasks.filter((task) => task.id !== id);

    setTasks(newArray);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Your tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? 'completed' : ''}
                data-testid="task"
              >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
