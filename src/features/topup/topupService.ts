import api from "../../utils/api";

export interface TopUpPayload {
  top_up_amount: number;
}

export const topUpBalance = async (
  payload: TopUpPayload
) => {
  const response = await api.post(
    "/topup",
    payload
  );

  return response.data;
};