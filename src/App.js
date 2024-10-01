import './App.css';
import Feedback from './UI_Component/Feedback';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import UpdateForm from './UI_Component/UpdateForm';


function App() {
  return (
    <div className='App' >
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Feedback />}></Route>
        <Route path="/edit" element={<UpdateForm/>}></Route>


      </Routes>
    
    </BrowserRouter>
       
        
    </div>
  );
}

export default App;
