import api from "../../utils/api";

export interface RegisterPayload {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}

export const registerUser = async (payload: RegisterPayload) => {
  const response = await api.post("/registration", payload);
  return response.data;
};

export interface LoginPayload {
  email: string;
  password: string;
}

export const loginUser = async (payload: LoginPayload) => {
  const response = await api.post("/login", payload);
  return response.data;
};