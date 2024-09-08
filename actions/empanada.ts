import axios from "axios";

export const PostEmpanada = async (item : any) => {
  try {
    const { data } = await axios.post("/api/empanada", item);
    return data
  } catch (err) {
    console.log(err);
  }
  }
