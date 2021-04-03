import './styles/Details.css'
import React, {useState, useEffect} from 'react'
import Plot from 'react-plotly.js'
import { av } from '../config/av.js'

const Details = ({stonks, toDetail}) => {
    const [xValues, setXValues] = useState([]);
    const [yValues, setYValues] = useState([]);
    const [description, setDescription] = useState("");
    const [hasContent, setHasContent] = useState(false);

    useEffect(()=>{
        const fetchDetails = async () => {
            const url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${toDetail}&apikey=${av.apikey}`;
            const response = await fetch(url);
            const data = await response.json();
            setDescription(data["Description"]);
            setHasContent(true);
        }
        try{
            let stonk = stonks.filter(element => element["Meta Data"]["2. Symbol"]===toDetail)
            fetchDetails();
            setXValues([]);
            setYValues([]);
            for (let key in stonk[0]['Time Series (Daily)']){
                setXValues(oldArray => [...oldArray, key]);
                setYValues(oldArray => [...oldArray, stonk[0]['Time Series (Daily)'][key]['1. open']]);
            } 
        }catch(e){
            return <div>Fetch limit reached</div>        
        }
        
    },[toDetail])

    if(hasContent){
        return (
            <div className="details">
                <div className="plot">
                <Plot
                data={[
                    {
                        x: xValues,
                        y: yValues,
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: {color: 'red'},
                    }
                    
                ]}
                layout={{title: toDetail}}
                />
                </div>
                <div className="description">
                    <p>{description}</p>
                </div>
            </div>
        )
    }else{
        return(
        <div className="details">
            <div className="description">
                Data not loaded...
            </div>
            <div className="plot">
                <Plot
                data={[
                    {
                        x: [],
                        y: [],
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: {color: 'red'},
                    }
                    
                ]}
                layout={{title: toDetail}}
                />
            </div>
        </div>
        )
    }
    
}

export default Details
