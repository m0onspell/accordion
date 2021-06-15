import axios from 'axios';

const fetchActivity = (type: string) => {
  return axios.get(`https://www.boredapi.com/api/activity?type=${type}`);
};

export { fetchActivity };
