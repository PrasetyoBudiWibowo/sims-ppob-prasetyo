import api from "../../utils/api";

export const getBalance = async () => {
  const response = await api.get("/balance");

  return response.data;
};