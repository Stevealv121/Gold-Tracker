import axios from 'axios';

export default axios.create({
    baseURL: 'https://goldtrackerapi.herokuapp.com/api/v1',
    //baseURL: 'http://localhost:5000/api/v1',
    headers: {
        "Content-type": "application/json"
    }
});