import './App.css';
import React from "react";
import CellsGrid from "./components/CellsGrid";
import About from "./components/About";

function App() {
  return (
      <div>
          <div style={{minHeight: '90vh', width: '20vw', marginLeft: 20, float: 'left'}}>
              <About/>
          </div>
          <div style={{display: 'flex', justifyContent: 'center', marginTop: 30}} className="App">
              <CellsGrid/>
          </div>
      </div>

  );
}

export default App;
