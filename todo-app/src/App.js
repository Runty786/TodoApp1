import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore"; // Import necessary functions
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { FormControl, InputLabel, Input } from "@mui/material";

import { db } from "../src/Firebase";
import { List, ListItem, ListItemText } from "@mui/material";

function App() {
  const [todos, setTodos] = useState(["abc", "bca"]);
  const [input, setInput] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const firestore = getFirestore();
        const productCollection = collection(firestore, "todo");
        const snapshot = await getDocs(productCollection);
        const productsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
      } catch (error) {
        console.error("Error getting products: ", error);
      }
    };

    fetchProducts();
  }, []);

  const addTodos = async (event) => {
    event.preventDefault();
    try {
      const firestore = getFirestore();
      const todoRef = collection(firestore, "todo");
      await addDoc(todoRef, { name: input, timestamp: serverTimestamp() });

      setInput("");
    } catch (error) {
      console.error("Error adding todo: ", error);
    }
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
          {products.map((todo, index) => (
            <div key={index}>
              <List>
                <ListItem>
                  <ListItemText>
                    {todo.name}
                    {todo.age}
                    {todo.city}
                  </ListItemText>
                </ListItem>
              </List>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
