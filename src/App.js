import { useEffect, useState } from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";

const App = () => {

  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTask] = useState([])

  useEffect(()=> {
    const getTasks = async() => {
      const tasksFromServer = await fetchTasks()
      setTask(tasksFromServer)
    }

    getTasks()
  }, [])

  // Fetch Tasks
  const fetchTasks = async() => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

  // Fetch Task
  const fetchTask = async(id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  // Delete task
  const deleteTask = async (id) => {

    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })
    
    setTask(tasks.filter((task)=> task.id !== id))
  }

  // Toggle reminder

  const toggleReminder = async (id) => {

    const taskToToggle = await fetchTask(id)
    const updatedTask = {...taskToToggle, reminder: !taskToToggle.reminder}
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    })

    const data = await res.json()

    setTask(
      tasks.map((task) => task.id === id ? 
    {...task, reminder: !task.reminder} : task))
  }

  // Add Task

  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()

    setTask([...tasks, data])
  }

  // const addTask = (task) => {
  //   const id = Math.floor(Math.random() * 10000) + 1
  //   const newTask = {id, ...task}
  //   setTask([...tasks, newTask])
  // }

  return (
    <Router>
    <div className="container">
      <Header onAdd={() => 
        setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
        />
      
      
      <Routes>
      <Route path="/" element={
        <>
          {showAddTask && <AddTask onAdd={addTask}/>}
      {tasks.length > 0 ? 
      (<Tasks tasks={tasks} onDelete={deleteTask}
              onToggle={toggleReminder}/>) 
      : ('No tasks to show')}
        </>
      }></Route>
      <Route exact path="/about" element={<About/>}></Route>
      </Routes>

      <Footer/>
    </div>
    </Router>
  )
}

export default App
