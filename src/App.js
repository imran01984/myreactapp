import Navbar from './components/Navbar';
import OpenApi from './components/OpenApi';
import ChatGpt from './components/Images/ChatGpt-Icon.jpg';
import './App.css';

function App() {

  return (
    <>
    
    <Navbar title="React App" about="About us"/>  <br/>
    <div> 
    <h1>Welcome to ChatGPT App</h1>    
    <img src={ChatGpt} alt='ChatGpt'  width="550" height="200"/>    
    <OpenApi />
    </div>
    </>
  ); 
}

export default App;
