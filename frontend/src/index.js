
import React from 'react';
import ReactDOM from 'react-dom/client';
import ResponsiveAppBar from './Appbar';
import './index.css';

  
  class Mainpage extends React.Component {
    render() {
      return (
        <div>
          <ResponsiveAppBar/>
        </div>
      );
    }
  }
  
  // ========================================
  

  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Mainpage />);

