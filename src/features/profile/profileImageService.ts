import api from "../../utils/api";

export const updateProfileImage = async (
  formData: FormData,
) => {
  const response = await api.put(
    "/profile/image",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data;
};