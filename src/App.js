import './App.css';
import React, {useState, useEffect} from 'react'
import List from './components/List.js';
import Details from './components/Details.js'
import Table from 'react-bootstrap/Table'
import { av } from './config/av.js'

function App() {
  const [stonks, setStonks] = useState([]);
  const [clicked, setClicked] = useState("IBM");
  const [isLoading, setIsLoading] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [hasResults, setHasResults] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [symbols, setSymbols] = useState([])

  const searchFetch = async () => {
      const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${inputValue}&apikey=${av.apikey}`;
      const response = await fetch(url);
      const data = await response.json();
      setSearchData(data["bestMatches"]);
      setHasResults(true);
  }

  useEffect(()=>{
    const fetchData = async () => {
      setStonks([]);
      setIsLoading(true);
      for (let i=0; i<symbols.length; i++){
        const url = `${av.base_url}/query?function=TIME_SERIES_DAILY&symbol=${symbols[i]}&interval=15min&apikey=${av.apikey}&datatype=json`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        setStonks(oldArray => [...oldArray, data]);
      }
    }
    fetchData();
    setIsLoading(false);
  }, [symbols])

  const addTracker = (symbol) => {
    setSymbols(oldArray => [...oldArray, symbol])
  }

  //Retrieves info about which company to detail
  const handleClick = (id) => {
    setClicked(id);
  }

  return (
    <div className="App">
      <div className="flex-container">

        <div className="searchbox">
        <form onSubmit={(e) => e.preventDefault()}>
          <label>Search for company</label>
          <input onChange={(e) => setInputValue(e.target.value)}></input>
          <button type="submit" onClick={() => searchFetch()}>Search</button>
        </form>
        <Table hover size="sm">
          <thead>
            <tr>
                <th>Symbol</th>
                <th>Company name</th>
            </tr>
          </thead>
          <tbody>
            {hasResults && searchData.map(result => (
              <tr onClick={() => addTracker(result["1. symbol"])}>
                <td>{result["1. symbol"]}</td>
                <td>{result["2. name"]}</td>
              </tr>
            ))}
          </tbody>
          
        </Table>
        </div>

        <List 
          stonks={stonks}
          isLoading={isLoading}
          onClick={(id) => handleClick(id)}
        />

        <Details
          stonks={stonks}
          isLoading={isLoading}
          clicked={clicked}
        />

      </div>
    </div>
  );
}

export default App;
