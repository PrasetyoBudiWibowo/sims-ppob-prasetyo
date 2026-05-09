import api from "../../utils/api";

export interface ProfileData {
  email: string;
  first_name: string;
  last_name: string;
  profile_image: string;
}

export interface ProfileResponse {
  status: number;
  message: string;
  data: ProfileData;
}

export const getProfile = async (): Promise<ProfileResponse> => {
  const response = await api.get("/profile");
  return response.data;
};

interface UpdateProfilePayload {
  first_name: string;
  last_name: string;
}

export const updateProfile = async (
  payload: UpdateProfilePayload,
) => {
  const response = await api.put(
    "/profile/update",
    payload,
  );

  return response.data;
};