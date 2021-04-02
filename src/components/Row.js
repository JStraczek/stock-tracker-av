import './styles/Row.css'
import React from 'react'


const Row = ({symbol, price, change, time, onClick}) => {

    return (
        <tr onClick={() => onClick(symbol)}>
            <td>{symbol}</td>
            <td>{price}</td>
            {change>0
                ?<td><p style={{ color : "green" }}>{change.toFixed(3)}%</p></td>
                :<td><p style={{ color : "red" }}>{change.toFixed(3)}%</p></td>
            }            
            <td>{time}</td>
        </tr>
    )
}

export default Row
