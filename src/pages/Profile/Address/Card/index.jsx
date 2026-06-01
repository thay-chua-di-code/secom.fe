import { Phone, MapPin } from "lucide-react";
import "./style.scss";
import Button from "../../../../components/common/Button/Button";
import { useDispatch } from "react-redux";
import { addressService } from "../../../../service/addressService";
import toast from "react-hot-toast";
export default function AddressCard({ address, onEdit }) {
  const dispatch = useDispatch();
  const handleDelete = async (id) => {
    const result = await addressService.deleteAdress(id, dispatch);
    if (result.success) {
      toast.success("Address deleted successfully");
    } else {
      toast.error("Failed to delete address");
    }
  };
  return (
    <div className="address-card">
      <div className="address-card__header">
        <div>
          <h3 className="address-card__name">{address.receiverName}</h3>

          <div className="address-card__phone">
            <Phone size={14} />
            <span>{address.phoneNumber}</span>
          </div>
        </div>

        {address.isDefault ? (
          <span className="address-card__default">Default</span>
        ) : (
          <span className="address-card__not-default">Make it default</span>
        )}
      </div>

      <div className="address-card__address">
        <MapPin size={18} />

        <div>
          <p>{address.detailAddress}</p>

          <p>
            {address.ward}, {address.district}
          </p>

          <p>{address.province}</p>
        </div>
      </div>

      <div className="address-card__actions">
        <Button onClick={() => onEdit(address)} className="btn-edit">
          Edit
        </Button>

        <Button onClick={() => handleDelete(address.id)} className="btn-delete">
          Delete
        </Button>
      </div>
    </div>
  );
}
