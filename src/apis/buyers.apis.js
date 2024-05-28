import axios from "axios";

export const registerBuyer = async (
  body = { email: "", password: "", firstname: "", lastname: "" ,phone:""}
) => {
  console.log(body)
  const { data } = await axios.post(`https://rentify-apis.onrender.com/buyers/register`, body);
  console.log(data)
  return data;
};

export const loginBuyer = async (body = { email: "", password: ""}) => {
  console.log(body)
  const { data } = await axios.post(`https://rentify-apis.onrender.com/buyers/login`, body);
  console.log(data)
  return data;
};
