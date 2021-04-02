import './styles/List.css'
import React from 'react'
import Row from './Row.js'
import Table from 'react-bootstrap/Table'


const List = ({stonks, onClick, hasContent}) => {
    const renderAllRows = () => {
        var rows = [];
        for (let i=0; i<stonks.length; i++){
            var symbol = stonks[i]["Meta Data"]["2. Symbol"]
            let counter = 0
            let timeValues = [];
            let priceValues = [];
            for (let key in stonks[i]['Time Series (Daily)']){
                timeValues.push(key);
                priceValues.push(stonks[i]['Time Series (Daily)'][key]['1. open']);
                if(counter === 1){
                    break;
                }
                counter++;
            }       
            
            let price = priceValues[0];
            let time = timeValues[0];
            let change = (100*(priceValues[0]-priceValues[1])/priceValues[1])

            rows.push(<Row
                key={symbol}
                symbol={symbol}
                price={price}
                time={time}
                change={change}
                onClick={(id) => handleClick(id)}
                />)    
        }
        return rows
    }

    const handleClick = (id) => {
        onClick(id)
    }

    if (hasContent){
        return (
            <div className="list">
            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>Company Symbol</th>
                    <th>Price</th>
                    <th>Change</th>
                    <th>Time of last refresh</th>
                </tr>
                </thead>
                <tbody>
                    {renderAllRows()}
                </tbody>
            </Table>
            </div>  
        )  
    }else{
        return (
            <div className="list">
            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>Company Symbol</th>
                    <th>Price</th>
                    <th>Change</th>
                    <th>Time of last refresh</th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Add a company to track</td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </Table>
            </div>
        )
    }
}

export default List
