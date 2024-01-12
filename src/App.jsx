import Todo from "./components/Todo"
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import { useState, useRef, useEffect } from "react";
import { nanoid } from "nanoid";  //using nanoid to create unique IDs for our new tasks

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}


const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};
const FILTER_NAMES = Object.keys(FILTER_MAP);




function App(props) {
  //setTasks is hook here
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState("All");
  

  function addTask(name){
    //first create newTask with the same structure as existing tasks
    //addTask gives each task the same id
    const newTask = { id: `todo-${nanoid()}`, name, completed: false};
    //not passing name directly in setTask as it will replace the array of existing tasks
    //we use spread syntax(`...`) to create a new array with existing tasks followed by newTask adn then update the state of tasks using setTasks

    setTasks([...tasks, newTask]);
  }
  
  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }
  
  function deleteTask(id){
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // Copy the task and update its name
        return { ...task, name: newName };
      }
      // Return the original task if it's not the edited task
      return task;
    });
    setTasks(editedTaskList);
  }
  

  const taskList = tasks
  .filter(FILTER_MAP[filter])
  .map((task) => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));


  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton 
      key={name} 
      name={name} 
      isPressed={name === filter}
      setFilter={setFilter}/>
  ));
  

  const tasksNoun = taskList.length <=1? "task":"tasks";
  const headingText = `${taskList.length} ${tasksNoun} remaining`
  const listHeadingRef = useRef(null);
  const prevTaskLength = usePrevious(tasks.length);

  useEffect(() => {
    if (tasks.length < prevTaskLength) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);

  return (
    <div className="todoapp stack-large">
      <h1 hidden>TodoMatic</h1>

      {/* addTask is a callback prop because we want to get data from child(Form) to parent(App) */}
      <Form addTask={addTask}/> 
  
      <div className="filters btn-group stack-exception">
      {filterList}
      </div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {headingText}
      </h2>

      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {taskList}
        {/* <Todo name = "Eat" id="todo-0" completed/>
        <Todo name = "Sleep" id="todo-1"/>
        <Todo name = "Repeat" id="todo-2"/> */}
      </ul>
    </div>
  );
}

export default App;
