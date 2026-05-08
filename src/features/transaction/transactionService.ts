import api from "../../services/api";

export interface TransactionPayload {
  service_code: string;
}

export const createTransaction = async (
  payload: TransactionPayload,
) => {
  const response = await api.post(
    "/transaction",
    payload,
  );

  return response.data;
};