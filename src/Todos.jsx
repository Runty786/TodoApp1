// Import necessary functions
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { Button, Modal, TextField, Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, Input } from "@mui/material";

import { db } from "../src/Firebase";
import { List, ListItem, ListItemText,  } from "@mui/material";
import { MdDelete , MdModeEdit } from "react-icons/md";

const Todo = () => {
  const [todos, setTodos] = useState(["abc", "bca"]);
  const [input, setInput] = useState("");
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTodo, setEditedTodo] = useState("");
  const [selectedTodoId, setSelectedTodoId] = useState(null);

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

  const deleteTodo = async (todoId) => {
    try {
      const firestore = getFirestore();
      const todoRef = doc(firestore, "todo", todoId);
      await deleteDoc(todoRef);
      console.log("Todo deleted successfully");
    } catch (error) {
      console.error("Error deleting todo: ", error);
    }
  };

  const delTodo = async (event, todoId) => {
    event.preventDefault();
    try {
      // Call the deleteTodo function with the ID of the todo to be deleted
      await deleteTodo(todoId);
    } catch (error) {
      console.error("Error deleting todo: ", error);
    }
  };

  const openEditModal = (todoId) => {
    setIsEditing(true);
    setSelectedTodoId(todoId);
    // Fetch the existing todo content based on the todoId and set it to editedTodo
    const selectedTodo = products.find((todo) => todo.id === todoId);
    setEditedTodo(selectedTodo ? selectedTodo.name : "");
  };

  const closeEditModal = () => {
    setIsEditing(false);
    setEditedTodo("");
    setSelectedTodoId(null);
  };

  const updateTodoInFirestore = async (todoId, updatedContent) => {
    try {
      const firestore = getFirestore();
      const todoRef = doc(firestore, "todo", todoId);
      await updateDoc(todoRef, {
        name: updatedContent,
        // Add more fields if needed
      });
      console.log("Todo updated successfully");
      closeEditModal();
    } catch (error) {
      console.error("Error updating todo: ", error);
      throw error;
    }
  };

  const updateTodo = async () => {
    try {
      await updateTodoInFirestore(selectedTodoId, editedTodo);
      console.log("Todo updated successfully");
    } catch (error) {
      console.error("Error updating todo: ", error);
    }
  };

  return (
    <>
      <div className="" style={{ textAlign: "center", width:"80%" , margin:"auto" , marginTop:"100px" }}>
        <h1>TODO APP</h1>
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
                  <Button style={{fontSize:"20px"}} onClick={(event) => delTodo(event, todo.id)}>
                  <MdDelete />
                  </Button>
                  <Button style={{fontSize:"20px"}}  onClick={() => openEditModal(todo.id)}>
                  < MdModeEdit/>
                  </Button>
                  
                </ListItem>
              </List>
            </div>
          ))}
        </ul>
      </div>
      <Modal open={isEditing} onClose={closeEditModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="div">
            Edit Todo
          </Typography>
          <TextField
            id="formTodoContent"
            label="Todo Content"
            type="text"
            placeholder="Enter todo content"
            fullWidth
            value={editedTodo}
            onChange={(e) => setEditedTodo(e.target.value)}
          />
          <Box mt={2}>
            <Button
              variant="contained"
              color="secondary"
              onClick={closeEditModal}
            >
              Close
            </Button>{" "}
            <Button variant="contained" color="primary" onClick={updateTodo}>
              Save Changes
            </Button>
          </Box>
        </Box>
      </Modal>
      
    </>
  );
};

export default Todo;
