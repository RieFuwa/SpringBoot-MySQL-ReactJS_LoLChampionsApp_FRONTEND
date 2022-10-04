import logo from './logo.svg';
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Home from './pages/Home';
import Navbar from './layout/Navbar';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddChampion from './pages/AddChampion';
import UpdateChampion from './pages/UpdateChampion';

function App() {
  
  return (
    <div class="container-sm ">
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route exact path="/" element={<Home></Home>}> </Route>
          <Route exact path="/addchampion" element={<AddChampion></AddChampion>}></Route>
          <Route exact path="/updatechampion/:id" element={<UpdateChampion></UpdateChampion>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
