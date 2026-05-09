import api from "../../services/api";

export const fetchTransactionHistory = async ({
  offset,
  limit,
}: {
  offset: number;
  limit: number;
}) => {
  const response = await api.get(
    `/transaction/history?offset=${offset}&limit=${limit}`,
  );

  return response.data;
};