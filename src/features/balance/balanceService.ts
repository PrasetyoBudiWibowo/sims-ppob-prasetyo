import api from "../../services/api";

export const getBalance = async () => {
  const response = await api.get("/balance");

  return response.data;
};