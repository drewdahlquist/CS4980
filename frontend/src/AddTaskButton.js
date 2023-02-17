import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
//import KanbanBoard from './Kanbanboard';
//import { itemsFromBackend } from './Kanbanboard';



export default function AddTaskButton() {
    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleCreateTask = (event) => {
        handleClose();
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
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleCreateTask}>Add Task</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }


