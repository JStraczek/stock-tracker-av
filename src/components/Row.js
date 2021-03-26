import React, {useState, useEffect} from 'react'
import { av } from '../config/av.js'

const Row = ({smbl="IBM"}) => {
    const [data, setData] = useState([]);
    const [stockChartXValues, setStockChartXValues] = useState([]);
    const [stockChartYValues, setStockChartYValues] = useState([]);
    const [showMoreDetails, setShowMoreDetails] = useState(false);

    const url = `${av.base_url}/query?function=TIME_SERIES_DAILY&symbol=${smbl}&interval=15min&apikey=${av.apikey}&datatype=json`;

    // Fething data from API
    useEffect(() =>{  
        const fetchData = async() => {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            setData(data);
        }
        fetchData();
    }, [url]);

    // Accessing data and putting it into arrays
    useEffect(()=>{
        for (let key in data['Time Series (Daily)']){
            setStockChartXValues(oldArray => [...oldArray, key]);
            setStockChartYValues(oldArray => [...oldArray, data['Time Series (Daily)'][key]['1. open']]);
        }
    }, [data]);

    function handleClick(e){
        setShowMoreDetails(!showMoreDetails);
    }

    return (
        <tr onClick={handleClick}>
            <td>{smbl}</td>
            <td>{stockChartYValues[0]}</td>
            <td>{stockChartXValues[0]}</td>
        </tr>
    )
}

export default Row
