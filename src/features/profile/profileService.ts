import api from "../../services/api";

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