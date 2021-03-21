import React, {useState, useEffect} from 'react'
import Row from './Row.js'
import Table from 'react-bootstrap/Table'

import fetchData from './utils/fetchData'


const List = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        fetchData().then((data)=>{
            setData(data || 'failed to load')
        })
    }, []);

    return (
        <div>
        <Table striped bordered hover size="sm">
            <thead>
            <tr>
                <th>Company Symbol</th>
                <th>Price</th>
                <th>Time of last refresh</th>
            </tr>
            </thead>
            <tbody>
                <Row />
                <Row name={data.name}/>
                <Row name="GME"/>
            </tbody>
            
            
        </Table>
        </div>

        
    )
}

export default List
