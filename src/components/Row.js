import React, {useState, useEffect} from 'react'

const Row = ({name="gówno"}) => {
    const [price, setPrice] = useState(100);
    const [symbol, setSymbol] = useState('TSLA');
    const [time, setTime] = useState('09:45');

    return (
        <tr>
            <th>{name}</th>
            <th>{price}</th>
            <th>{time}</th>
        </tr>
    )
}

export default Row
