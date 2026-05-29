import { Ticket } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function CartVoucher({ defaultValue, disabled, onApply }) {
  const [code, setCode] = useState(defaultValue || "");
  const prevDefaultValueRef = useRef(defaultValue);

  useEffect(() => {
    if (prevDefaultValueRef.current !== defaultValue) {
      prevDefaultValueRef.current = defaultValue;
      setCode(defaultValue || "");
    }
  }, [defaultValue]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = code.trim();
    if (!trimmed) {
      return;
    }
    onApply(trimmed);
  };

  return (
    <div className="border-t border-gray-100 p-4">
      <form className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between" onSubmit={handleSubmit}>
        <div className="flex items-start gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-secom-50 text-secom-600">
            <Ticket size={16} />
          </span>
          <div>
            <p className="text-sm font-semibold text-slate-900">SECOM Voucher</p>
            {defaultValue ? (
              <p className="text-xs text-slate-500">
                Applied: <span className="font-medium text-secom-600">{defaultValue}</span>
              </p>
            ) : (
              <p className="text-xs text-slate-500">Apply voucher to save more on this item.</p>
            )}
          </div>
        </div>

        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter voucher code"
            disabled={disabled}
            className="h-10 flex-1 rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-secom-500 focus:ring-2 focus:ring-secom-100 disabled:cursor-not-allowed disabled:bg-gray-50 sm:w-72"
          />
          <button
            type="submit"
            disabled={disabled || !code.trim()}
            className="h-10 min-w-[100px] rounded-lg bg-secom-500 px-4 text-sm font-semibold text-white transition hover:bg-secom-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Apply
          </button>
        </div>
      </form>
    </div>
  );
}
