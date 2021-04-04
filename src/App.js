import './App.css';
import React, {useState, useEffect} from 'react'
import List from './components/List.js';
import Details from './components/Details.js'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import { av } from './config/av.js'

function App() {
  const [stonks, setStonks] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [symbols, setSymbols] = useState([]);
  const [renderedSymbols, setRenderedSymbols] = useState([]);
  const [hasContent, setHasContent] = useState(false);
  const [hasResults, setHasResults] = useState(false);
  const [showDetails, setShowDetails] = useState(true);
  const [toDetail, setToDetail] = useState("");
  const [region, setRegion] = useState("United States");
  const [inputValue, setInputValue] = useState("");

  const searchFetch = async () => {
      const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${inputValue}&apikey=${av.apikey}`;
      const response = await fetch(url);
      const data = await response.json();
      setSearchData(data["bestMatches"]);
      setSearchData(oldArray => oldArray.filter(element => element["4. region"]===region))
      setHasResults(true);
  }

  useEffect(()=>{
    const fetchData = async () => {
      while(symbols.length){
        let symbol = symbols.pop();
        const url = `${av.base_url}/query?function=TIME_SERIES_DAILY&symbol=${symbol}&interval=15min&apikey=${av.apikey}&datatype=json`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        setRenderedSymbols(oldArray => [...oldArray, symbol])
        setStonks(oldArray => [...oldArray, data]);
        setToDetail(symbol);
        setHasContent(true);
      }
    }
    fetchData();
  }, [symbols])

  const addTracker = (symbol) => {
    if (!renderedSymbols.includes(symbol)){
      setSymbols(oldArray => [...oldArray, symbol]);
    }
  }

  //Retrieves info about which company to detail
  const handleClick = (id) => {
    setToDetail(id);
  }

  return (
    <div className="App">
      <div className="flex-container">

        <div className="searchbox">
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>Choose a region: </InputGroup.Text>
            </InputGroup.Prepend>
            <InputGroup.Append>
              <select onChange={(e) => setRegion(e.target.value)}>
                <option value="United States">USA</option>
                <option value="United Kingdom">UK</option>
              </select>
            </InputGroup.Append>
          <InputGroup.Prepend>
          <InputGroup.Text>Show more details:</InputGroup.Text>
          </InputGroup.Prepend>
          <InputGroup.Checkbox onChange={(e) => setShowDetails(e.target.checked)} defaultChecked></InputGroup.Checkbox>
          </InputGroup>
          <InputGroup>

            <InputGroup.Prepend>
              <InputGroup.Text>Search for company</InputGroup.Text>
            </InputGroup.Prepend>
            <InputGroup.Append>
            <input type="text" onChange={(e) => setInputValue(e.target.value)}></input>
            </InputGroup.Append>
            
            <Button onClick={() => searchFetch()}>Search</Button>
          </InputGroup>

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
          hasContent={hasContent}
          onClick={(id) => handleClick(id)}
        />
      </div>
      {showDetails && <Details
          stonks={stonks}
          toDetail={toDetail}
        />
      }
    </div>
  );
}

export default App;
