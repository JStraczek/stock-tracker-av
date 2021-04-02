import './App.css';
import React, {useState, useEffect} from 'react'
import List from './components/List.js';
import Details from './components/Details.js'
import Table from 'react-bootstrap/Table'
import { av } from './config/av.js'

function App() {
  const [stonks, setStonks] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [hasContent, setHasContent] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [symbols, setSymbols] = useState([])
  const [clicked, setClicked] = useState(symbols[0]);
  const [region, setRegion] = useState("United States")

  const searchFetch = async () => {
      const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${inputValue}&apikey=${av.apikey}`;
      const response = await fetch(url);
      const data = await response.json();
      setSearchData(data["bestMatches"]);
      setSearchData(oldArray => oldArray.filter(element => element["4. region"]===region))
  }

  useEffect(()=>{
    const fetchData = async () => {
      setStonks([]);
      for (let i=0; i<symbols.length; i++){
        const url = `${av.base_url}/query?function=TIME_SERIES_DAILY&symbol=${symbols[i]}&interval=15min&apikey=${av.apikey}&datatype=json`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        setStonks(oldArray => [...oldArray, data]);
      }
    }
    fetchData();
    setHasContent(true);
  }, [symbols])

  const addTracker = (symbol) => {
    if (!symbols.includes(symbol)){
      setSymbols(oldArray => [...oldArray, symbol]);
    }
  }

  //Retrieves info about which company to detail
  const handleClick = (id) => {
    setClicked(id);
  }

  return (
    <div className="App">

      <div className="flex-container">

        <div className="searchbox">
          <label for="region">Choose a region:</label>
          <select onChange={(e) => setRegion(e.target.value)}>
            <option value="United States">USA</option>
            <option value="United Kingdom">UK</option>
          </select>
        
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
              {hasContent && searchData.map(result => (
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
          hasContent={hasContent}
          onClick={(id) => handleClick(id)}
        />

        <Details
          stonks={stonks}
          hasContent={hasContent}
          clicked={clicked}
        />
      </div>
    </div>
  );
}

export default App;
