import axios from "axios";
const url = "https://challenge-schedule.vercel.app"
//const url = "http://localhost:3000"

export const GetAllEmpanadas = async () => {
  try {
    const { data } = await axios.get(`${url}/api/empanada`);
    return data;

  }catch (error) {
    return [];
  }
}

export const PostEmpanada = async (item : any) => {
  try {
    const { data } = await axios.post(`${url}/api/empanada`, item);
    return data
  } catch (err) {
    console.log(err);
  }
}