import React from "react";
import { List, ListItem ,ListItemText  } from '@mui/material';

const Todos = (props) => {
  return (
    <div>
        <List>
            <ListItem>
                <ListItemText primary="Todo" secondary={props.text} />
            </ListItem>
        </List>
    </div>
  );
};

export default Todos;
