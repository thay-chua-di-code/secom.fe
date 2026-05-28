import { useEffect, useState } from "react";

export default function CartVoucher({
  defaultValue,
  disabled,
  onApply,
}) {
  const [code, setCode] = useState(defaultValue || "");

  useEffect(() => {
    setCode(defaultValue || "");
  }, [defaultValue]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedCode = code.trim();
    if (!trimmedCode) {
      return;
    }

    onApply(trimmedCode);
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <label className="block text-sm font-medium text-slate-700">Voucher code</label>
      <div className="flex gap-3">
        <input
          type="text"
          value={code}
          onChange={(event) => setCode(event.target.value)}
          placeholder="Enter voucher code"
          disabled={disabled}
          className="h-11 flex-1 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-slate-400 disabled:cursor-not-allowed disabled:bg-slate-100"
        />
        <button
          type="submit"
          disabled={disabled || !code.trim()}
          className="rounded-xl bg-slate-900 px-4 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Apply
        </button>
      </div>
    </form>
  );
}
