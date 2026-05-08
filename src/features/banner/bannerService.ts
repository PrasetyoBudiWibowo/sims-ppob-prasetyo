import api from "../../services/api";

export interface BannerItem {
  banner_name: string;
  banner_image: string;
  description: string;
}

export const getBanners = async (): Promise<BannerItem[]> => {
  const response = await api.get("/banner");

  return response.data.data;
};