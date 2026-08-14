import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoriesService } from "../../../../service/categoriesService";
import {
  fetchSellerProducts,
  updateSellerProduct,
} from "../../../../redux/slice/seller/product/thunk";
import {
  deleteProductImage,
  getProductImages,
  setPrimaryProductImage,
  uploadProductImages,
} from "../../../../api/productImageApi";
import ProductImageManager from "../components/ProductImageManager";
import { toast } from "react-hot-toast";
import { PackageCheck, X } from "lucide-react";
import "./style.scss";

const getErrorMessage = (error, fallback) =>
  error?.response?.data?.message ||
  error?.data?.message ||
  error?.message ||
  fallback;

const mapProductToForm = (product) => ({
  name: product?.name || "",
  description: product?.description || "",
  price: product?.price || "",
  categoryId: product?.categoryId || "",
  condition: product?.condition || "",
  location: product?.location || "",
  isActive: product?.isActive ?? true,
  isPublic: product?.isPublic ?? true,
});

const normalizeExistingImage = (image, index, isPrimary) => ({
  imageUrl: image?.imageUrl || "",
  publicId: image?.publicId || image?.public_id || undefined,
  altText: image?.altText || image?.alt_text || undefined,
  isPrimary,
  displayOrder: index,
});

const UpdateProductModal = ({ open, product, onClose }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const productId = product?.id || product?.productId;

  const [form, setForm] = useState(() => mapProductToForm(product));
  const [existingImages, setExistingImages] = useState([]);
  const [pendingImages, setPendingImages] = useState([]);
  const [selectedPrimary, setSelectedPrimary] = useState(null);
  const [imagesLoading, setImagesLoading] = useState(true);
  const [imagesError, setImagesError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [imageActionLoading, setImageActionLoading] = useState(false);

  const orderedExistingImages = useMemo(
    () =>
      [...existingImages].sort((a, b) => {
        if (a.isPrimary !== b.isPrimary) return a.isPrimary ? -1 : 1;
        return (a.displayOrder ?? 0) - (b.displayOrder ?? 0);
      }),
    [existingImages],
  );

  const currentPrimaryImage = existingImages.find((image) => image.isPrimary);

  const pendingPrimaryIndex = useMemo(() => {
    if (selectedPrimary?.type !== "pending") return undefined;
    const index = pendingImages.findIndex(
      (image) => image.clientId === selectedPrimary.clientId,
    );
    return index >= 0 ? index : undefined;
  }, [pendingImages, selectedPrimary]);

  const refetchImages = useCallback(async () => {
    if (!productId) return;

    setImagesLoading(true);
    setImagesError(false);
    try {
      const images = await getProductImages(productId);
      setExistingImages(images);
      setSelectedPrimary((current) => {
        if (current) return current;
        const primary = images.find((image) => image.isPrimary) ?? images[0];
        return primary ? { type: "existing", imageId: primary.id } : null;
      });
    } catch (error) {
      setImagesError(true);
      toast.error(getErrorMessage(error, "Item image is not uploaded."));
    } finally {
      setImagesLoading(false);
    }
  }, [productId]);

  const clearPendingImages = () => {
    pendingImages.forEach((image) => URL.revokeObjectURL(image.previewUrl));
    setPendingImages([]);
  };

  useEffect(() => {
    if (!open || !product) return;

    getProductImages(productId)
      .then((images) => {
        setExistingImages(images);
        const primary = images.find((image) => image.isPrimary) ?? images[0];
        setSelectedPrimary(
          primary ? { type: "existing", imageId: primary.id } : null,
        );
      })
      .catch((error) => {
        setImagesError(true);
        toast.error(getErrorMessage(error, "Item image is not uploaded."));
      })
      .finally(() => {
        setImagesLoading(false);
      });
  }, [open, product, productId]);

  useEffect(() => {
    if (!open || categories.length) return;
    categoriesService.getCategories(dispatch);
  }, [dispatch, open, categories.length]);

  const handleClose = () => {
    if (submitting || imageActionLoading) return;
    clearPendingImages();
    onClose();
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDeleteExistingImage = async (image) => {
    if (!productId || imageActionLoading) return;

    const confirmed = window.confirm(
      image.isPrimary
        ? "This is main image. After deletion, the system will automatically select another photo as the main photo. Are you sure you want to delete it?"
        : "Are you sure you want to delete this product image?",
    );

    if (!confirmed) return;

    setImageActionLoading(true);
    try {
      await deleteProductImage(productId, image.id);
      toast.success("Product image removed");
      if (
        selectedPrimary?.type === "existing" &&
        selectedPrimary.imageId === image.id
      ) {
        setSelectedPrimary(null);
      }
      await refetchImages();
      await dispatch(fetchSellerProducts({ page: 1, pageSize: 8 }));
    } catch (error) {
      toast.error(getErrorMessage(error, "Delete item image was failed."));
    } finally {
      setImageActionLoading(false);
    }
  };

  const handleSetExistingPrimary = async (imageId) => {
    if (!productId || imageActionLoading) return;

    setImageActionLoading(true);
    try {
      await setPrimaryProductImage(productId, imageId);
      toast.success("Main image was updated.");
      await refetchImages();
      await dispatch(fetchSellerProducts({ page: 1, pageSize: 8 }));
    } catch (error) {
      toast.error(getErrorMessage(error, "Update main image was failed."));
    } finally {
      setImageActionLoading(false);
    }
  };

  const uploadPendingImages = async () => {
    const fileImages = pendingImages.filter(
      (image) => image?.file instanceof File,
    );

    if (!fileImages.length) return [];

    const imagesForUpload = fileImages.map((image, index) => ({
      ...image,
      isPrimary: pendingPrimaryIndex === index,
    }));

    return uploadProductImages({
      pendingImages: imagesForUpload,
    });
  };

  const buildImagePayload = async () => {
    const selectedExistingPrimaryId =
      selectedPrimary?.type === "existing" ? selectedPrimary.imageId : null;

    const existingPayload = orderedExistingImages
      .filter((image) => typeof image?.imageUrl === "string" && image.imageUrl.trim())
      .map((image, index) =>
        normalizeExistingImage(
          image,
          index,
          selectedExistingPrimaryId === image.id,
        ),
      );

    const uploadedPayload = await uploadPendingImages();
    const offset = existingPayload.length;
    const pendingPrimarySelected = selectedPrimary?.type === "pending";
    const normalizedUploadedPayload = uploadedPayload.map((image, index) => ({
      imageUrl: image.imageUrl,
      publicId: image.publicId,
      isPrimary: pendingPrimarySelected ? image.isPrimary : false,
      displayOrder: offset + index,
    }));

    const images = [...existingPayload, ...normalizedUploadedPayload];
    const hasPrimary = images.some((image) => image.isPrimary);
    const normalizedImages = images.map((image, index) => ({
      imageUrl: image.imageUrl,
      ...(image.publicId ? { publicId: image.publicId } : {}),
      ...(image.altText ? { altText: image.altText } : {}),
      isPrimary: hasPrimary ? image.isPrimary : index === 0,
      displayOrder: index,
    }));

    return normalizedImages;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productId || submitting || imageActionLoading) {
      if (!productId) toast.error("Product not found!");
      return;
    }

    setSubmitting(true);
    let metadataUpdated = false;

    try {
      const updateData = {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        categoryId: form.categoryId,
        condition: form.condition,
        location: form.location,
        isActive: form.isActive,
      };

      const images = await buildImagePayload();
      const payload = {
        ...updateData,
        images,
      };

      await dispatch(
        updateSellerProduct({ productId, data: payload }),
      ).unwrap();
      metadataUpdated = true;

      if (
        selectedPrimary?.type === "existing" &&
        selectedPrimary.imageId &&
        currentPrimaryImage?.id !== selectedPrimary.imageId
      ) {
        try {
          await setPrimaryProductImage(productId, selectedPrimary.imageId);
        } catch (primaryError) {
          toast.error(
            getErrorMessage(
              primaryError,
              "The image has been uploaded, but the main image has not yet been set.",
            ),
          );
          await refetchImages();
          return;
        }
      }

      clearPendingImages();
      await refetchImages();
      await dispatch(fetchSellerProducts({ page: 1, pageSize: 8 }));
      toast.success("Product updated successfully!", { duration: 2500 });
      onClose();
    } catch (error) {
      toast.error(
        metadataUpdated
          ? getErrorMessage(
              error,
              "Product information has been updated, but image processing failed.",
            )
          : getErrorMessage(
              error,
              "Failed to update product. Please try again.",
            ),
        { duration: 3000 },
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  const isBusy = submitting || imageActionLoading;

  return (
    <div className="add-product-modal__overlay">
      <div className="add-product-modal">
        <div className="add-product-modal__header">
          <div className="add-product-modal__title">
            <div className="add-product-modal__icon">
              <PackageCheck size={22} />
            </div>
            <div>
              <h2>Update Product</h2>
              <p>Update your product information</p>
            </div>
          </div>
          <button
            type="button"
            className="add-product-modal__close"
            onClick={handleClose}
            disabled={isBusy}
            aria-label="Close update product modal"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product Name</label>
            <input
              name="name"
              placeholder="Nike Air Force"
              value={form.name}
              onChange={handleChange}
              required
              disabled={isBusy}
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              placeholder="Product description..."
              value={form.description}
              onChange={handleChange}
              required
              disabled={isBusy}
            />
          </div>

          <div className="row">
            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                name="price"
                min="0"
                placeholder="100"
                value={form.price}
                onChange={handleChange}
                required
                disabled={isBusy}
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <select
                name="categoryId"
                value={form.categoryId}
                onChange={handleChange}
                required
                disabled={isBusy}
              >
                <option value="">-- Select Category --</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="row">
            <div className="form-group">
              <label>Condition</label>
              <select
                name="condition"
                value={form.condition}
                onChange={handleChange}
                required
                disabled={isBusy}
              >
                <option value="">-- Select Condition --</option>
                <option value="new">New</option>
                <option value="used">Used</option>
              </select>
            </div>

            <div className="form-group">
              <label>Location</label>
              <input
                name="location"
                placeholder="Ha Noi"
                value={form.location}
                onChange={handleChange}
                disabled={isBusy}
              />
            </div>
          </div>

          <div className="product-switch-group">
            <label className="product-switch-item">
              <input
                type="checkbox"
                name="isActive"
                checked={form.isActive}
                onChange={handleChange}
                disabled={isBusy}
              />
              <span className="product-switch" />
              <span className="product-switch-label">
                <strong>Active Product</strong>
                <small>Product is available for customers</small>
              </span>
            </label>

          </div>

          <ProductImageManager
            mode="edit"
            productName={form.name}
            existingImages={orderedExistingImages}
            pendingImages={pendingImages}
            onPendingImagesChange={setPendingImages}
            selectedPrimary={selectedPrimary}
            onSelectedPrimaryChange={setSelectedPrimary}
            onDeleteExistingImage={handleDeleteExistingImage}
            onSetExistingPrimary={handleSetExistingPrimary}
            isLoadingExisting={imagesLoading}
            isErrorExisting={imagesError}
            isBusy={isBusy}
          />

          <div className="actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={handleClose}
              disabled={isBusy}
            >
              Cancel
            </button>
            <button type="submit" className="create-btn" disabled={isBusy}>
              {imageActionLoading
                ? "Is executing image..."
                : submitting
                  ? "Is saving..."
                  : "Update Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProductModal;
