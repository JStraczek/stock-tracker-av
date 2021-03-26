import './App.css';
import List from './components/List.js';
import Details from './components/Details.js'

function App() {
  return (
    <div className="App">
      <div className="flex-container">
        <div className="list"><List/></div>
        <div className="details"><Details/></div>
      </div>
    </div>
  );
}

export default App;
