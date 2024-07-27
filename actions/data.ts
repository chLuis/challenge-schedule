import axios from 'axios';

const URL = "https://my-json-server.typicode.com/juanpernu/bilog-fe-challenge/schedule";

export const GET = async () => {
  try {
    const {data} = await axios.get(URL);
    return data
    
  } catch (err) {
    console.log(err);
  }
}