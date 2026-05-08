import api from "../../services/api";

export interface ServiceItem {
  service_code: string;
  service_name: string;
  service_icon: string;
  service_tariff: number;
}

export const getServices = async (): Promise<ServiceItem[]> => {
  const response = await api.get("/services");

  return response.data.data;
};