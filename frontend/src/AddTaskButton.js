import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { v4 as uuid } from 'uuid';
import { itemsRequested } from './Kanbanboard';
import { itemsDone } from './Kanbanboard';
import { itemsInProgress } from './Kanbanboard';
import { itemsToDo } from './Kanbanboard';

export default function AddTaskButton() {
    const [name, setName] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const [taskStatus, setStatus] = React.useState("");
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleCreateTask = (event) => {
        if(taskStatus === "requested")
        {
          itemsRequested.push( { id: uuid(), content: {name}, date: new Date().toLocaleDateString("en-US") } );
        }
        else if(taskStatus === "todo")
        {
          itemsToDo.push( { id: uuid(), content: {name}, date: new Date().toLocaleDateString("en-US") } );
        }
        else if(taskStatus === "inprogress")
        {
          itemsInProgress.push( { id: uuid(), content: {name}, date: new Date().toLocaleDateString("en-US") } );
        }
        else if(taskStatus === "done")
        {
          itemsDone.push( { id: uuid(), content: {name}, date: new Date().toLocaleDateString("en-US") } );
        }
        handleClose();
        setName("");
        setStatus("");
    };
  
    return (
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Add Task
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add New Task</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter information about the new task to be created.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="task"
              label="Task"
              type="task"
              fullWidth
              variant="standard"
              size="medium"
              value={name}
              onChange={(e) => {setName(e.target.value);
              }}
            />
            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={taskStatus}
              label="Status"
              onChange={(e) => {setStatus(e.target.value);
              }}
            >
              <MenuItem value={"requested"}>Requested</MenuItem>
              <MenuItem value={"todo"}>To-Do</MenuItem>
              <MenuItem value={"inprogress"}>In-Progress</MenuItem>
              <MenuItem value={"done"}>Done</MenuItem>
            </Select>
          </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleCreateTask}>Add Task</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }


