import { useState } from "react";



function Form(props){
  // here name is a constant with initial value learn react and setName is a function using which we will set the value of name
  const [name, setName] = useState("");
  
  function handleChange(event){
    setName(event.target.value);
  }

    function handleSubmit(event){
        event.preventDefault();
        props.addTask(name);
        setName("");
    }
    return(
        <form onSubmit={handleSubmit}>
        <h2 className="label-wrapper">
          <label htmlFor="new-todo-input" className="label__lg">
            What needs to be done?
          </label>
        </h2>
        <input
          type="text"
          id="new-todo-input"
          className="input input__lg"
          name="text"
          autoComplete="off"
          value={name}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn__primary btn__lg">
          Add
        </button>
      </form>
    );
}

export default Form;