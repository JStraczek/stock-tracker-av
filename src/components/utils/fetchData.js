import axios from "axios"

function fetchData () {
    return axios.get('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo')
        .then(({data}) => {
            console.log(data)
            return data;
        })
        .catch(err => {
            console.error(err);
        })
    }

export default fetchData