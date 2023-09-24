import { useState } from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

const App = () => {

  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTask] = useState(
    [
      {
        id: 1,
        text: 'Food Shopping',
        day: 'Feb 5th at 2:30pm',
        reminder: false
      },
      {
        id: 2,
        text: 'Homework',
        day: 'Feb 7th at 3:30pm',
        reminder: true
      },
      {
        id: 3,
        text: 'Movies night',
        day: 'Feb 14th at 7:00pm',
        reminder: false
      }
    ]
  )

  // Delete task
  const deleteTask = (id) => {
    setTask(tasks.filter((task)=> task.id !== id))
  }

  // Toggle reminder

  const toggleReminder = (id) => {
    setTask(
      tasks.map((task) => task.id === id ? 
    {...task, reminder: !task.reminder} : task))
  }

  // Add Task

  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1
    const newTask = {id, ...task}
    setTask([...tasks, newTask])
  }

  return (
    <div className="container">
      <Header onAdd={() => 
        setShowAddTask(!showAddTask)}
        showAdd={showAddTask}/>
      {showAddTask && <AddTask onAdd={addTask}/>}
      {tasks.length > 0 ? 
      (<Tasks tasks={tasks} onDelete={deleteTask}
              onToggle={toggleReminder}/>) 
      : ('No tasks to show')}
    </div>
  )
}

export default App
