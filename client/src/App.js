import './App.css';
import {Routes, Route} from 'react-router-dom';
import Landingpage from './components/LandingPage' ;
import Home from './components/Home';
import SearchBar from './components/SearchBar';
import Detail from './components/Detail';
import CreateDog from './components/CreateDog'


function App() {
 
  return (
    
    <div className="App">
      <SearchBar/>
      
      <Routes>
        <Route exact path='/' element= {<Landingpage/>} /> 
        <Route path='/home' element={<Home/>} />
        <Route exact path = '/home/:id' element={<Detail/>}/> 
        <Route path='/dog' element={<CreateDog/>} />
      </Routes>
      <h1>Henry Dogs</h1>
    </div>
   
  );
  
 }

export default App;
