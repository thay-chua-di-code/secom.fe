import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MapPin, Plus } from "lucide-react";

import AddressCard from "../Card";
import { addressService } from "../../../../service/addressService";
import Button from "../../../../components/common/Button/Button";

import AddAddressModal from "../Form/FormAdd";
import UpdateAddressForm from "../Form/FormUpdate";

import "./style.scss";

export default function AddressList() {
  const dispatch = useDispatch();

  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [openAddModal, setOpenAddModal] = useState(false);

  const addresses = useSelector((state) => state.user.addresses);

  useEffect(() => {
    addressService.getAddress(dispatch);
  }, [dispatch]);

  const handleEdit = (address) => {
    setSelectedAddress(address);
    setOpenUpdate(true);
  };

  return (
    <div className="address-list" data-testid="profile-address-section">
      <div className="address-list__header">
        <div className="address-list__heading">
          <span>SHIPPING ADDRESSES</span>

          <div>
            <h3>Saved addresses</h3>

            <p>Manage where your orders should be delivered.</p>
          </div>
        </div>

        <Button
          data-testid="add-address-btn"
          className="address-list__add-btn"
          onClick={() => setOpenAddModal(true)}
        >
          <Plus size={15} />
          Add New Address
        </Button>
      </div>

      {!addresses?.length ? (
        <div className="address-list__empty">
          <div className="address-list__empty-icon">
            <MapPin size={26} />
          </div>

          <h3>No saved addresses</h3>

          <p>Add your first shipping address to make checkout faster.</p>

          <Button
            data-testid="add-address-btn"
            className="address-list__add-btn"
            onClick={() => setOpenAddModal(true)}
          >
            <Plus size={15} />
            Add Your First Address
          </Button>
        </div>
      ) : (
        <div className="address-list__content">
          {addresses.map((address, index) => (
            <AddressCard
              key={address.id}
              address={address}
              onEdit={handleEdit}
              index={index}
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
        onClose={() => {
          setOpenUpdate(false);
          setSelectedAddress(null);
        }}
        initialData={selectedAddress}
      />
    </div>
  );
}
