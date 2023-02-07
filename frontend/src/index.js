
import React from 'react';
import ReactDOM from 'react-dom/client';
import ResponsiveAppBar from './Appbar';
import './index.css';
import KanbanBoard from './Kanbanboard';

  
  class Mainpage extends React.Component {
    render() {
      return (
        <div>
          <ResponsiveAppBar/>
          <KanbanBoard />
        </div>
      );
    }
  }
  
  // ========================================
  

  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Mainpage />);

