import logo from './logo.svg';
import './App.css';
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import {HomePage} from './pages';
import {AddMovie} from './components';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage />}/>
        <Route path="add" element={<AddMovie/>}/>
        <Route path="edit/:id" element={<AddMovie/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
