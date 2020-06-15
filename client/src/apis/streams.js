import axios from 'axios';

//create a base axios instance to perform request
export default axios.create ({
  baseURL: 'http://localhost:3001',
});
