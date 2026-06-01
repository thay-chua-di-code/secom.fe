import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus } from "lucide-react";
import AddressCard from "../Card";
import { addressService } from "../../../../service/addressService";
import Button from "../../../../components/common/Button/Button";
import "./style.scss";
import AddAddressModal from "../Form/FormAdd";
export default function AddressList() {
  const dispatch = useDispatch();
  const [openAddModal, setOpenAddModal] = useState(false);
  const addresses = useSelector((state) => state.user.addresses);

  useEffect(() => {
    addressService.getAddress(dispatch);
  }, [dispatch]);

  return (
    <div className="address-list">
      <div className="address-list__header flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Button
          className="address-list__add-btn"
          onClick={() => setOpenAddModal(true)}
        >
          <Plus size={16} />
          Add New Address
        </Button>
      </div>

      {!addresses?.length ? (
        <div className="address-list__empty">
          <p>You don't have any saved addresses yet.</p>

          <Button
            className="address-list__add-btn"
            onClick={() => setOpenAddModal(true)}
          >
            <Plus size={16} />
            Add Your First Address
          </Button>
        </div>
      ) : (
        <div className="address-list__content">
          {addresses.map((address) => (
            <AddressCard key={address.id} address={address} />
          ))}
        </div>
      )}

      <AddAddressModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
      />
    </div>
  );
}
