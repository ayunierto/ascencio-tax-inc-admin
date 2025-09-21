import { api } from "@/api/api";

export const uploadImageFile = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const { data } = await api<string>({
      url: "/files/upload-image",
      method: "POST",
      data: formData,
    });

    return data;
  } catch (error) {
    throw error;
  }
};
