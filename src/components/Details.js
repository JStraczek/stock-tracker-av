import './styles/Details.css'
import React, {useState, useEffect} from 'react'
import Plot from 'react-plotly.js';

const Details = ({stonks, clicked}) => {
    const [xValues, setXValues] = useState([]);
    const [yValues, setYValues] = useState([]);
    
    useEffect(()=>{
        console.log(stonks)
        try{
            for (let key in stonks[0]['Time Series (Daily)']){
                setXValues(oldArray => [...oldArray, key]);
                setYValues(oldArray => [...oldArray, stonks[0]['Time Series (Daily)'][key]['1. open']]);
            } 
        }catch(e){
            console.log('Data still loading');
        }
        
    },[stonks, clicked])

    return (
        <div className="details">
            {clicked} - fetched full company name
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
            layout={{title: clicked}}
            />
        </div>
    )
}

export default Details
