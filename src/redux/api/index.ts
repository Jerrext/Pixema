import { create } from "apisauce";
import { SigInPayloadData, SigUpPayloadData } from "../reducers/@types";

const API = create({
  baseURL: "https://unelmamovie.com/api/v1",
});

const signUpUser = (data: SigUpPayloadData) => {
  return API.post("/auth/register", data);
};

const signInUser = (data: SigInPayloadData) => {
  return API.post("/auth/login", data);
};

export default { signUpUser, signInUser };
