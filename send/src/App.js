import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { FormControl, InputLabel, Input } from "@mui/material";
import Todos from "./Components/Todos";
import db from "./Firebase";
function App() {
  const [todos, setTodos] = useState(['abc' , 'bca']);
  const [input, setInput] = useState("");

  useEffect(()=>{
    db.collection("todos").onSnapshot((snapshot)=>{
      console.log(snapshot.docs.map((doc)=>doc.data().todo));
      setTodos(snapshot.docs.map((doc)=>doc.data().todo));
      
           
    })
  },[]);
 
  const addTodos = (event) => {
    console.log("i am working");
    event.preventDefault(); //will stop the refresh
    setTodos([...todos, input]);
    setInput(""); //clear inut feild after click on button
  };
  return (
    <>
      <div className="" style={{ textAlign: "center" }}>
        <h1>Hello TODO APP</h1>
        <form action="">
          <FormControl>
            <InputLabel htmlFor="my-input">Write a Todo</InputLabel>
            <Input
              id="my-input"
              type="text "
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
          </FormControl>
          <Button
            disabled={!input}
            type="submit"
            onClick={addTodos}
            variant="contained"
          >
            Add Todo
          </Button>
        </form>
        <ul>
          {todos.map((todo, index) => (
            <div key={index}>
              <Todos text={todo} />
            </div>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
