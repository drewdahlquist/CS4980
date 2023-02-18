
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { v4 as uuid } from 'uuid';
import Axios from 'axios'


export var itemsRequested = [
  { id: uuid(), content: "Fourth task", date: new Date().toLocaleDateString("en-US") },
  { id: uuid(), content: "Fifth task", date: new Date().toLocaleDateString("en-US") }
];

export var itemsToDo = [ 
  { id: uuid(), content: "Third task", date: new Date().toLocaleDateString("en-US") } 
];

export var itemsInProgress = [ 
  { id: uuid(), content: "Second task", date: new Date().toLocaleDateString("en-US") } 
];

export var itemsDone = [
  { id: uuid(), content: "First task", date: new Date().toLocaleDateString("en-US") } 
];


const columnsFromBackend = {
  [uuid()]: {
    name: "Requested",
    items: itemsRequested
  },
  [uuid()]: {
    name: "To do",
    items: itemsToDo
  },
  [uuid()]: {
    name: "In Progress",
    items: itemsInProgress
  },
  [uuid()]: {
    name: "Done",
    items: itemsDone
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

export function KanbanBoard() {

  //basic http GET request to root at backend
  Axios.get('http://localhost:5001')
  .then(response=>{console.log(response.data)})
  .catch(error=>{console.log(error)});
  const [columns, setColumns] = useState(columnsFromBackend);

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
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}

export default KanbanBoard;