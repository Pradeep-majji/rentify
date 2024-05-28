import axios from "axios";

export const register = async (
  body = { email: "", password: "", firstname: "", lastname: "" ,phone:""}
) => {
  console.log(body)
  const { data } = await axios.post(`https://rentify-apis.onrender.com/sellers/register`, body);
  console.log(data)
  return data;
};

export const login = async (body = { email: "", password: ""}) => {
  console.log(body)
  const { data } = await axios.post(`https://rentify-apis.onrender.com/sellers/login`, body);
  return data;
};
