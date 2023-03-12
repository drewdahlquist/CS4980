
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { v4 as uuid } from 'uuid';
import { useEffect } from 'react';
import {TaskDetails } from './TaskDetails';
import { getTasks } from './user-services';


export var itemsFromBackend = [
  { id: 1, description: "First task", date: new Date().toLocaleDateString("en-US") },
  { id: 2, description: "Second task", date: new Date().toLocaleDateString("en-US") },
  { id: 3, description: "Third task", date: new Date().toLocaleDateString("en-US") },

];



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
  const [open, setOpen] = useState(false);

  const [description,setDescription] = useState(null)
  const [date,setDate] = useState(null);

  const [tasks, setTasks] = useState([])
  const [columns, setColumns] = useState(
    {
      0: {
        name: "Requested",
        items: []
      },
      1: {
        name: "To do",
        items: []
      },
      2: {
        name: "In Progress",
        items: []
      },
      3: {
        name: "Done",
        items: []
      }
    }
  );

  const handleClickOpen = (description,date) => {
    setDescription(description);
    setDate(date);
    setOpen(true)
  };

  const handleClose = () => {
      setOpen(false);
  };

  const getUserTasks = async()=>{
    console.log(columns)
    const userTasks =  await getTasks()
    if(userTasks.error){
      console.log("Error fetching tasks")
    }else{

      setColumns({
        0: {
          name: "Requested",
          items: userTasks.data
        },
        1: {
          name: "To do",
          items: []
        },
        2: {
          name: "In Progress",
          items: []
        },
        3: {
          name: "Done",
          items: []
        }
      })
      console.log(userTasks.data)
    }
  };

  useEffect(() => {
    getUserTasks()
  }, []);


 
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
                                    onClick={(event)=>handleClickOpen(item.description,item.date)}
                                  >
                              
                                    <div>{item.description}</div>
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
            </div>
          );
        })}
      </DragDropContext>
      <TaskDetails content={description} date={date} open={open} close={handleClose}/>
    </div>
    
  );
}

export default KanbanBoard;