import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-complete-guide-99df8.firebaseio.com/'
})

export default instance;