import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AddressCard from "../Card";
import { addressService } from "../../../../service/addressService";

export default function AddressList() {
  const dispatch = useDispatch();

  const addresses = useSelector((state) => state.user.addresses);

  useEffect(() => {
    addressService.getAddress(dispatch);
  }, [dispatch]);

  if (!addresses?.length) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 p-10 text-center text-gray-500">
        No address found.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {addresses.map((address) => (
        <AddressCard key={address.id} address={address} />
      ))}
    </div>
  );
}
