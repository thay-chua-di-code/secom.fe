import { uploadImageToCloudinary as uploadImage } from "../services/cloudinaryService";

export const uploadImageToCloudinary = async (file) => {
  const result = await uploadImage(file);
  return result.secure_url;
};
