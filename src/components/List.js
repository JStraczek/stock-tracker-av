import React from 'react'
import Row from './Row.js'
import Table from 'react-bootstrap/Table'


const List = () => {

    return (
        <Table striped bordered hover size="sm" className="list">
            <thead>
            <tr>
                <th>Company Symbol</th>
                <th>Price</th>
                <th>Time of last refresh</th>
            </tr>
            </thead>
            <tbody>
                <Row smbl="IBM"/>
                {/* <Row smbl="TSLA"/>
                <Row smbl="GME"/>
                <Row smbl="GOOG"/>
                <Row smbl="CDR"/> */}
            </tbody>
        </Table>    
    )
}

export default List
