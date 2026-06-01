import { Phone, MapPin } from "lucide-react";

export default function AddressCard() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="mb-3 flex items-start justify-between">
        <div>
          <h3 className="text-base font-semibold text-gray-900">
            {address.receiverName}
          </h3>

          <div className="mt-1 flex items-center gap-2 text-sm text-gray-600">
            <Phone size={14} />
            <span>{address.phoneNumber}</span>
          </div>
        </div>

        {address.isDefault && (
          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
            Default
          </span>
        )}
      </div>

      <div className="mb-4 flex items-start gap-2 text-sm text-gray-600">
        <MapPin size={16} className="mt-0.5 shrink-0" />

        <div>
          <p>{address.detailAddress}</p>

          <p>
            {address.ward}, {address.district}
          </p>

          <p>{address.province}</p>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <button
          onClick={() => onEdit(address)}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm transition hover:bg-gray-100"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(address.id)}
          className="rounded-lg bg-red-500 px-4 py-2 text-sm text-white transition hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
