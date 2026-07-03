import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus } from "lucide-react";
import AddressCard from "../Card";
import { addressService } from "../../../../service/addressService";
import Button from "../../../../components/common/Button/Button";
import "./style.scss";
import AddAddressModal from "../Form/FormAdd";
import UpdateAddressForm from "../Form/FormUpdate";
export default function AddressList() {
  const dispatch = useDispatch();
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleEdit = (address) => {
    setSelectedAddress(address);
    setOpenUpdate(true);
  };
  const [openAddModal, setOpenAddModal] = useState(false);
  const addresses = useSelector((state) => state.user.addresses);

  useEffect(() => {
    addressService.getAddress(dispatch);
  }, [dispatch]);

  return (
    <div className="address-list" data-testid="profile-address-section">
      <div className="address-list__header flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Button
          data-testid="add-address-btn"
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
            data-testid="add-address-btn"
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
            <AddressCard
              key={address.id}
              address={address}
              onEdit={handleEdit}
            />
          ))}
        </div>
      )}

      <AddAddressModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
      />

      <UpdateAddressForm
        open={openUpdate}
        onClose={() => setOpenUpdate(false)}
        initialData={selectedAddress}
      />
    </div>
  );
}
