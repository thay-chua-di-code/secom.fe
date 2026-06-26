import { useState } from "react";
import shipIcon from "../../assets/icons/icon-ship.png";
import returnIcon from "../../assets/icons/icon-return.png";
import Button from "../../components/common/Button/Button";
import "./style.scss";
import ProductReview from "./Review";
import { mockProducts } from "../../utils/temporary";
import { useParams } from "react-router-dom";
import { formatCurrencyVN } from "../../utils/fncUtils";
import SellerShow from "./SellerShow";
const images = [
  "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/l/a/laptop-acer-predator-helios-300_1_.jpg",
  "https://tramanh.vn/wp-content/uploads/2023/09/acer-predator-helios-300-2022-2.jpg",
  "https://product.hstatic.net/1000331874/product/acer_predator_helios_300_c__4c0a76c20c89418e9125ad4916a7acde.jpg",
  "https://cdn2.fptshop.com.vn/unsafe/512x0/filters:format(webp):quality(75)/2021_9_27_637683516027568465_acer-predator-helios-gaming-ph315-54-den-4.jpg",
];

export default function ProductDetail() {
  const { id } = useParams();
  const productDetail = mockProducts.find(
    (product) => product.id.toString() === id,
  );
  const [selectedImage, setSelectedImage] = useState(productDetail.images[0]);
  const [quantity, setQuantity] = useState(2);

  return (
    <>
      <div className="product-detail">
        <div className="product-detail__gallery">
          <div className="thumbnail-list">
            {productDetail.images.map((img, index) => (
              <div
                key={index}
                className={`thumbnail ${selectedImage === img ? "active" : ""}`}
                onClick={() => setSelectedImage(img)}
              >
                <img src={img} alt="" />
              </div>
            ))}
          </div>

          <div className="main-image">
            <img src={selectedImage} alt="" />
          </div>
        </div>

        <div className="product-detail__info">
          <h1>{productDetail.name}</h1>

          <div className="rating">
            <div className="stars">★★★★☆</div>
            <span>(150 Reviews)</span>
            <div className="divider"></div>
            <span className="stock">In Stock</span>
          </div>

          <div className="price">{formatCurrencyVN(productDetail.price)}</div>

          <p className="description">
            PlayStation 5 Controller Skin High quality vinyl with air channel
            adhesive for easy bubble free install & mess free removal.
          </p>

          <div className="option-group">
            <span>Colours:</span>

            <div className="colors">
              <button className="color blue active"></button>
              <button className="color red"></button>
            </div>
          </div>

          {/* <div className="option-group">
          <span>Size:</span>

          <div className="sizes">
            <button>XS</button>
            <button>S</button>
            <button className="active">M</button>
            <button>L</button>
            <button>XL</button>
          </div>
        </div> */}

          <div className="purchase">
            <div className="quantity">
              <Button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              >
                -
              </Button>

              <span>{quantity}</span>

              <Button onClick={() => setQuantity((prev) => prev + 1)}>+</Button>
            </div>

            <button className="buy-btn">Buy Now</button>

            <button className="wishlist">♡</button>
          </div>

          <div className="delivery-box">
            <div className="delivery-item">
              <div className="icon">
                <img src={shipIcon} alt="...." />
              </div>

              <div>
                <h4>Free Delivery</h4>
                <p>Enter your postal code for Delivery Availability</p>
              </div>
            </div>

            <div className="delivery-item">
              <div className="icon">
                <img src={returnIcon} alt="...." />
              </div>

              <div>
                <h4>Return Delivery</h4>
                <p>Free 30 Days Delivery Returns. Details</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="product-detail-feature">
        <SellerShow shop={productDetail.shop} />
        <ProductReview />
      </div>
    </>
  );
}
