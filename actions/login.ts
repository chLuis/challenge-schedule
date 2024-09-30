import axios from "axios";
//const url = "https://challenge-schedule.vercel.app"
const url = "http://localhost:3000"

export const LoginAcc = async (req: any) => {
  //console.log(req, "req")
  try {
    const { data } = await axios.post(`${url}/api/auth/login`, req);
    //console.log(data, "data")
    return data
  } catch (err) {
    //console.log(err, "err")
    return [];
  }
}