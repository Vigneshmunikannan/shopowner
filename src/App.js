import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddItems from './AddItems'
import DeleteItems from './DeleteItems'
import EditItems from './EditItems'
import Items from './Items'
import Edit from './Edit'
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<AddItems/>} >
            <Route path="/delete/:category" element={<Items/>}></Route>
          <Route path="/delete" element={<DeleteItems/>} />
          <Route path="/edit/:item"  element={<Edit/>} />
          <Route path="/edit"  element={<EditItems/>} />
          
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
