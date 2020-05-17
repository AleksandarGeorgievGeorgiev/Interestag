import axios from 'axios'

const configAxios = () => {
  axios.defaults.headers.common['WithCredentials'] = true;
}

export { configAxios };