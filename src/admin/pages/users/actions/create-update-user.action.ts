import { api } from "@/api/api";
import { User } from "../schemas/user.schema";
import { UserResponse } from "../interfaces/user.response";
import { uploadImageFile } from "@/admin/actions/upload-image-file.action";

export const createUpdateUserAction = async (
  userLike: Partial<User>
): Promise<UserResponse> => {
  const { id, imageFile, imageUrl, ...rest } = userLike;

  const isCreating = id === "new";

  try {
    let imageUrlToSave: string | undefined = undefined;
    if (imageFile) {
      const uploadedImage = await uploadImageFile(imageFile);
      imageUrlToSave = uploadedImage;
    }

    const { data } = await api<UserResponse>({
      url: isCreating ? "/users" : `/users/${id}`,
      method: isCreating ? "POST" : "PATCH",
      data: { ...rest, imageUrl: imageUrlToSave ?? imageUrl },
    });

    return data;
  } catch (error) {
    throw error;
  }
};
