import { api } from '@/api/api';
import { Service } from '../schemas/service.schema';
import { ServiceResponse } from '../interfaces/service.response';
import { uploadImageFile } from '@/admin/actions/upload-image-file.action';

export const createUpdateServiceAction = async (
  serviceLike: Partial<Service>
): Promise<ServiceResponse> => {
  const { id, imageFile, imageUrl, ...rest } = serviceLike;

  const isCreating = id === 'new';

  let imageUrlToSave: string | undefined = undefined;
  if (imageFile) {
    const uploadedImage = await uploadImageFile(imageFile);
    imageUrlToSave = uploadedImage;
  }

  const { data } = await api<ServiceResponse>({
    url: isCreating ? '/services' : `/services/${id}`,
    method: isCreating ? 'POST' : 'PATCH',
    data: { ...rest, imageUrl: imageUrlToSave ?? imageUrl },
  });

  return data;
};
