const getCloudinaryConfig = () => {
  const cloudName = import.meta.env.VITE_CLOUD_NAME?.trim();
  const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET?.trim();

  if (!cloudName) {
    throw new Error("Missing VITE_CLOUD_NAME configuration");
  }

  if (!uploadPreset) {
    throw new Error("Missing VITE_UPLOAD_PRESET configuration");
  }

  return {
    cloudName,
    uploadPreset,
    uploadUrl: `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
  };
};

export const cloudinaryConfig = getCloudinaryConfig();
