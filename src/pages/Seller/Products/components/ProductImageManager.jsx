import { useEffect, useRef, useState } from "react";
import { ImagePlus, Star, Trash2, RefreshCcw } from "lucide-react";
import { PRODUCT_IMAGE_LIMITS } from "../../../../api/productImageApi";
import "./ProductImageManager.scss";

const formatMb = (bytes) => Math.round(bytes / 1024 / 1024);

const createClientId = () => {
  if (crypto?.randomUUID) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const getFileKey = (file) => `${file.name}-${file.size}-${file.lastModified}`;

const ProductImageManager = ({
  mode,
  productName,
  existingImages = [],
  pendingImages,
  onPendingImagesChange,
  selectedPrimary,
  onSelectedPrimaryChange,
  onDeleteExistingImage,
  onSetExistingPrimary,
  onRetryImages,
  isLoadingExisting = false,
  isErrorExisting = false,
  isBusy = false,
  showRetry = false,
  maxImages = PRODUCT_IMAGE_LIMITS.maxImages,
}) => {
  const inputRef = useRef(null);
  const pendingImagesRef = useRef(pendingImages);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    pendingImagesRef.current = pendingImages;
  }, [pendingImages]);

  useEffect(() => {
    return () => {
      pendingImagesRef.current.forEach((image) => {
        URL.revokeObjectURL(image.previewUrl);
      });
    };
  }, []);

  const visibleCount = existingImages.length + pendingImages.length;

  const validateFiles = (files) => {
    const currentKeys = new Set(pendingImages.map((image) => image.fileKey));
    const nextErrors = [];
    const validFiles = [];

    files.forEach((file) => {
      if (visibleCount + validFiles.length >= maxImages) {
        nextErrors.push(`Mỗi sản phẩm chỉ được tối đa ${maxImages} ảnh.`);
        return;
      }

      if (!file.size) {
        nextErrors.push(`${file.name}: Ảnh không được để trống.`);
        return;
      }

      if (!PRODUCT_IMAGE_LIMITS.allowedTypes.includes(file.type)) {
        nextErrors.push(`${file.name}: Chỉ hỗ trợ JPG, PNG và WebP.`);
        return;
      }

      if (file.size > PRODUCT_IMAGE_LIMITS.maxSizeBytes) {
        nextErrors.push(
          `${file.name}: Ảnh không được vượt quá ${formatMb(PRODUCT_IMAGE_LIMITS.maxSizeBytes)} MB.`,
        );
        return;
      }

      const fileKey = getFileKey(file);
      if (
        currentKeys.has(fileKey) ||
        validFiles.some((item) => getFileKey(item) === fileKey)
      ) {
        nextErrors.push(`${file.name}: Ảnh đã được chọn.`);
        return;
      }

      validFiles.push(file);
    });

    return { validFiles, nextErrors };
  };

  const handleFiles = (fileList) => {
    const files = Array.from(fileList ?? []);
    const { validFiles, nextErrors } = validateFiles(files);

    setErrors([...new Set(nextErrors)]);

    if (!validFiles.length) return;

    const shouldSelectFirst =
      !selectedPrimary &&
      existingImages.length === 0 &&
      pendingImages.length === 0;
    const nextImages = validFiles.map((file, index) => ({
      clientId: createClientId(),
      file,
      fileKey: getFileKey(file),
      previewUrl: URL.createObjectURL(file),
      isPrimary: shouldSelectFirst && index === 0,
    }));

    onPendingImagesChange([...pendingImages, ...nextImages]);

    if (shouldSelectFirst) {
      onSelectedPrimaryChange({
        type: "pending",
        clientId: nextImages[0].clientId,
      });
    }
  };

  const handleInputChange = (event) => {
    handleFiles(event.target.files);
    event.target.value = "";
  };

  const removePendingImage = (clientId) => {
    const removed = pendingImages.find((image) => image.clientId === clientId);
    if (removed) URL.revokeObjectURL(removed.previewUrl);

    const nextImages = pendingImages.filter(
      (image) => image.clientId !== clientId,
    );
    onPendingImagesChange(nextImages);

    if (
      selectedPrimary?.type === "pending" &&
      selectedPrimary.clientId === clientId
    ) {
      const serverPrimary =
        existingImages.find((image) => image.isPrimary) ?? existingImages[0];
      const nextPending = nextImages[0];
      onSelectedPrimaryChange(
        serverPrimary
          ? { type: "existing", imageId: serverPrimary.id }
          : nextPending
            ? { type: "pending", clientId: nextPending.clientId }
            : null,
      );
    }
  };

  const isImagePrimary = (image) => {
    if (selectedPrimary?.type === "existing")
      return selectedPrimary.imageId === image.id;
    if (selectedPrimary?.type === "pending") return false;
    return image.isPrimary;
  };

  const isPendingPrimary = (image) =>
    selectedPrimary?.type === "pending" &&
    selectedPrimary.clientId === image.clientId;

  return (
    <section className="product-image-manager">
      <div className="product-image-manager__header">
        <div>
          <h3>Product images</h3>
          <p>
            JPG, PNG, WebP. Maximum {maxImages} images,{" "}
            {formatMb(PRODUCT_IMAGE_LIMITS.maxSizeBytes)} MB each.
          </p>
        </div>
        <span>
          {visibleCount}/{maxImages} image
        </span>
      </div>

      <label
        className={`product-image-manager__dropzone ${isBusy ? "is-disabled" : ""}`}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={PRODUCT_IMAGE_LIMITS.accept}
          disabled={isBusy || visibleCount >= maxImages}
          onChange={handleInputChange}
        />
        <ImagePlus size={22} />
        <strong>Selected image item</strong>
        <small>
          The image is temporarily stored on the device until the product is
          saved.
        </small>
      </label>

      {errors.length > 0 && (
        <div className="product-image-manager__errors">
          {errors.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      )}

      {isLoadingExisting && (
        <p className="product-image-manager__state">Uploading image...</p>
      )}
      {isErrorExisting && (
        <p className="product-image-manager__state is-error">
          Item image cannot uploading.
        </p>
      )}
      {!isLoadingExisting && visibleCount === 0 && (
        <p className="product-image-manager__state">
          Item image need to selected.
        </p>
      )}

      <div className="product-image-manager__grid">
        {existingImages.map((image) => {
          const primary = isImagePrimary(image);
          return (
            <article className="product-image-card" key={image.id}>
              <img
                src={image.imageUrl}
                alt={image.altText || productName || "Product image"}
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = "/placeholder-image.svg";
                }}
              />
              {primary && (
                <span className="product-image-card__badge">Main Image</span>
              )}
              <div className="product-image-card__actions">
                <button
                  type="button"
                  disabled={isBusy || primary}
                  aria-label="Đặt ảnh này làm ảnh chính"
                  onClick={() => {
                    onSelectedPrimaryChange({
                      type: "existing",
                      imageId: image.id,
                    });
                    onSetExistingPrimary?.(image.id);
                  }}
                >
                  <Star size={15} />
                  Set main
                </button>
                <button
                  type="button"
                  disabled={isBusy}
                  aria-label="Delete image"
                  onClick={() => onDeleteExistingImage?.(image)}
                >
                  <Trash2 size={15} />
                  Delete
                </button>
              </div>
            </article>
          );
        })}

        {pendingImages.map((image) => {
          const primary = isPendingPrimary(image);
          return (
            <article
              className="product-image-card is-pending"
              key={image.clientId}
            >
              <img
                src={image.previewUrl}
                alt={image.file.name || productName || "Product image preview"}
              />
              {primary && (
                <span className="product-image-card__badge">Main image</span>
              )}
              <span className="product-image-card__pending">Not uploading</span>
              <div className="product-image-card__actions">
                <button
                  type="button"
                  disabled={isBusy || primary}
                  aria-label="Set this image is main"
                  onClick={() =>
                    onSelectedPrimaryChange({
                      type: "pending",
                      clientId: image.clientId,
                    })
                  }
                >
                  <Star size={15} />
                  Set main
                </button>
                <button
                  type="button"
                  disabled={isBusy}
                  aria-label="Delete the image that hasn't been uploaded yet."
                  onClick={() => removePendingImage(image.clientId)}
                >
                  <Trash2 size={15} />
                  Delete
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {mode === "create" && showRetry && pendingImages.length > 0 && (
        <button
          type="button"
          className="product-image-manager__retry"
          disabled={isBusy}
          onClick={onRetryImages}
        >
          <RefreshCcw size={16} />
          Try to upload again
        </button>
      )}
    </section>
  );
};

export default ProductImageManager;
