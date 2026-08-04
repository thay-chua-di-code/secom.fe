import { cloudinaryConfig } from "../config/cloudinary";
import { PRODUCT_IMAGE_LIMITS } from "../constants/productImage";

export const validateProductImage = (file) => {
  if (!file || file.size <= 0) {
    throw new Error("Invalid image file");
  }

  if (!PRODUCT_IMAGE_LIMITS.allowedTypes.includes(file.type)) {
    throw new Error("Only JPG, PNG, and WebP images are supported");
  }

  if (file.size > PRODUCT_IMAGE_LIMITS.maxSizeBytes) {
    throw new Error("Image must not exceed 5 MB");
  }
};

export const uploadImageToCloudinary = async (file, options = {}) => {
  validateProductImage(file);

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", cloudinaryConfig.uploadPreset);
  formData.append("folder", options.folder ?? "secom/products");

  const response = await fetch(cloudinaryConfig.uploadUrl, {
    method: "POST",
    body: formData,
  });

  const responseBody = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      responseBody?.error?.message || "Failed to upload image to Cloudinary",
    );
  }

  if (!responseBody?.secure_url || !responseBody?.public_id) {
    throw new Error("Cloudinary response is missing secure_url or public_id");
  }

  console.debug("Cloudinary response:", {
    secure_url: responseBody.secure_url,
    public_id: responseBody.public_id,
    width: responseBody.width,
    height: responseBody.height,
    format: responseBody.format,
  });

  return responseBody;
};

export const uploadProductImagesToCloudinary = async (images, options = {}) => {
  const uploadedImages = await Promise.all(
    images.map(async (image, index) => {
      const result = await uploadImageToCloudinary(image.file, {
        folder: options.folder ?? "secom/products",
      });

      return {
        imageUrl: result.secure_url,
        publicId: result.public_id,
        isPrimary: Boolean(image.isPrimary),
        displayOrder: index,
      };
    }),
  );

  console.debug("Normalized images:", uploadedImages);

  return uploadedImages;
};
