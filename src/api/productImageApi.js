import axiosClient from "./axiosClient";
import { API_ENDPOINTS } from "./endPoint";
import { uploadProductImagesToCloudinary } from "../services/cloudinaryService";
export { PRODUCT_IMAGE_LIMITS } from "../constants/productImage";

const unwrapData = (response) => response.data?.data ?? response.data;

export const productImageKeys = {
  all: ["product-images"],
  list: (productId) => ["product-images", productId],
};

export const getProductImages = async (productId) => {
  const response = await axiosClient.get(
    API_ENDPOINTS.PRODUCT.IMAGES.LIST(productId),
  );

  return unwrapData(response) ?? [];
};

export const uploadProductImages = async ({ pendingImages }) => {
  return uploadProductImagesToCloudinary(pendingImages, {
    folder: "secom/products",
  });
};

export const setPrimaryProductImage = async (productId, imageId) => {
  const response = await axiosClient.patch(
    API_ENDPOINTS.PRODUCT.IMAGES.PRIMARY(productId, imageId),
  );

  return unwrapData(response);
};

export const updateProductImage = async (productId, imageId, data) => {
  const response = await axiosClient.put(
    API_ENDPOINTS.PRODUCT.IMAGES.UPDATE(productId, imageId),
    data,
  );

  return unwrapData(response);
};

export const reorderProductImages = async (productId, items) => {
  const response = await axiosClient.put(
    API_ENDPOINTS.PRODUCT.IMAGES.ORDER(productId),
    { items },
  );

  return unwrapData(response) ?? [];
};

export const deleteProductImage = async (productId, imageId) => {
  await axiosClient.delete(API_ENDPOINTS.PRODUCT.IMAGES.DELETE(productId, imageId));
};
