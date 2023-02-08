
import React from 'react';
import ReactDOM from 'react-dom/client';
import ResponsiveAppBar from './Appbar';
import './index.css';
import KanbanBoard from './Kanbanboard';
import AddTaskButton from './AddTaskButton';


  
  class Mainpage extends React.Component {
    
    render() {
      return (
        <div>
          <ResponsiveAppBar/>
          <AddTaskButton/>
          <KanbanBoard />
        </div>
      );
    }
  }
  
  // ========================================
  

  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Mainpage />);

