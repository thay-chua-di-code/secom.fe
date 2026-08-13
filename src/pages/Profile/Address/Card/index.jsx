import { Check, MapPin, Phone, Pencil, Trash2 } from "lucide-react";

import "./style.scss";

import Button from "../../../../components/common/Button/Button";
import { useDispatch } from "react-redux";
import { addressService } from "../../../../service/addressService";
import toast from "react-hot-toast";

export default function AddressCard({ address, onEdit, index = 0 }) {
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    const result = await addressService.deleteAdress(id, dispatch);

    if (result.success) {
      toast.success("Address deleted successfully");
    } else {
      toast.error("Failed to delete address");
    }
  };

  const handleSetDefault = async () => {
    if (address.isDefault) return;

    const result = await addressService.makeAddressDefault(
      address.id,
      dispatch,
    );

    if (result.success) {
      toast.success("Address set as default successfully");
    } else {
      toast.error("Failed to set address as default");
    }
  };

  return (
    <article
      className="address-card"
      style={{
        "--address-index": index,
      }}
    >
      <div className="address-card__header">
        <div className="address-card__identity">
          <div className="address-card__avatar">
            {address.receiverName?.charAt(0).toUpperCase() || "A"}
          </div>

          <div>
            <h3 className="address-card__name">{address.receiverName}</h3>

            <div className="address-card__phone">
              <Phone size={12} />

              <span>{address.phoneNumber}</span>
            </div>
          </div>
        </div>

        {address.isDefault ? (
          <span className="address-card__default">
            <Check size={12} />
            Default
          </span>
        ) : (
          <button
            type="button"
            className="address-card__not-default"
            onClick={handleSetDefault}
          >
            Make default
          </button>
        )}
      </div>

      <div className="address-card__address">
        <div className="address-card__address-icon">
          <MapPin size={15} />
        </div>

        <div>
          <p>{address.detailAddress}</p>

          <span>
            {address.ward}, {address.district}, {address.province}
          </span>
        </div>
      </div>

      <div className="address-card__actions">
        <Button onClick={() => onEdit(address)} className="btn-edit">
          <Pencil size={13} />
          Edit
        </Button>

        <Button onClick={() => handleDelete(address.id)} className="btn-delete">
          <Trash2 size={13} />
          Delete
        </Button>
      </div>
    </article>
  );
}
