
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { v4 as uuid } from 'uuid';
import axios from 'axios'
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};


export var itemsFromBackend = [
  { id: uuid(), content: "First task", date: new Date().toLocaleDateString("en-US") },
  { id: uuid(), content: "Second task", date: new Date().toLocaleDateString("en-US") },
  { id: uuid(), content: "Third task", date: new Date().toLocaleDateString("en-US") },
  { id: uuid(), content: "Fourth task", date: new Date().toLocaleDateString("en-US") },
  { id: uuid(), content: "Fifth task", date: new Date().toLocaleDateString("en-US") }
];

const columnsFromBackend = {
  [uuid()]: {
    name: "Requested",
    items: itemsFromBackend
  },
  [uuid()]: {
    name: "To do",
    items: []
  },
  [uuid()]: {
    name: "In Progress",
    items: []
  },
  [uuid()]: {
    name: "Done",
    items: []
  }
};

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  }
};

function KanbanBoard() {

  const [content,setContent] = useState(null)
  const [date,setDate] = useState(null);

  const [open, setOpen] = useState(false);
  const [columns, setColumns] = useState(columnsFromBackend);

  const handleClickOpen = (content,date) => {
    setContent(content);
    setDate(date);
    setOpen(true)
    console.log(content+date);
  };
  const handleClose = () => {
    setOpen(false);
  };
  
  useEffect(() => {
      axios.get('http://localhost:5001').then((response) => {
        console.log(response.data);
      }, (error) => {
        console.log(error);
      });

  }, []);

  //basic http GET request to root at backend

 
  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      <DragDropContext
        onDragEnd={result => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
              key={columnId}
            >
              <h2>{column.name}</h2>
              <div style={{ margin: 8 }}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "lightgrey",
                          padding: 4,
                          width: 250,
                          minHeight: 500
                        }}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                              
                            >
                              
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      padding: 16,
                                      margin: "0 0 8px 0",
                                      minHeight: "50px",
                                      backgroundColor: snapshot.isDragging
                                        ? "#2E3B55"
                                        : "#2E3B55",
                                      color: "white",
                                      borderRadius:"15px",
                                      ...provided.draggableProps.style
                                    }}
                                    onClick={(event)=>handleClickOpen(item.content,item.date)}
                                  >
                              
                                    <div>{item.content}</div>
                                    <div>Due: {item.date}</div>
                                    
                                  </div>

                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
              <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                style={{
                  opacity:0.7,
                }}
                maxWidth='lg'
              >
                <BootstrapDialogTitle 
                id="customized-dialog-title" 
                onClose={handleClose}
                style={{
                  textAlign:'center'
                }}
                >
                  {content}
                </BootstrapDialogTitle>
                <DialogContent dividers
                style={{
                  width:'500px',
                  textAlign:'center'
                }
                }>
                  <Typography gutterBottom>
                    {date}
                  </Typography>
                </DialogContent>
                <DialogActions>
                  <Button autoFocus onClick={handleClose}>
                    close
                  </Button>
                </DialogActions>
              </BootstrapDialog>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}

export default KanbanBoard;