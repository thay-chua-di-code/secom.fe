import { Minus, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function QuantitySelector({
  quantity,
  disabled,
  onChange,
}) {
  const [localQuantity, setLocalQuantity] = useState(quantity);
  const timerRef = useRef(null);

  useEffect(() => {
    setLocalQuantity(quantity);
  }, [quantity]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const scheduleChange = (nextQuantity) => {
    if (!Number.isInteger(nextQuantity) || nextQuantity <= 0) {
      return;
    }

    setLocalQuantity(nextQuantity);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      if (nextQuantity !== quantity) {
        onChange(nextQuantity);
      }
    }, 500);
  };

  const handleInputChange = (event) => {
    const value = Number(event.target.value);

    if (!Number.isInteger(value) || value <= 0) {
      setLocalQuantity(event.target.value);
      return;
    }

    scheduleChange(value);
  };

  const commitCurrentValue = () => {
    const parsedValue = Number(localQuantity);
    const nextQuantity = Number.isInteger(parsedValue) && parsedValue > 0 ? parsedValue : quantity;

    setLocalQuantity(nextQuantity);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (nextQuantity !== quantity) {
      onChange(nextQuantity);
    }
  };

  return (
    <div className="flex items-center rounded-xl border border-slate-200 bg-white">
      <button
        type="button"
        className="flex h-10 w-10 items-center justify-center text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        onClick={() => scheduleChange(Math.max(1, quantity - 1))}
        disabled={disabled || quantity <= 1}
      >
        <Minus size={16} />
      </button>

      <input
        min="1"
        step="1"
        type="number"
        value={localQuantity}
        onChange={handleInputChange}
        onBlur={commitCurrentValue}
        disabled={disabled}
        className="h-10 w-14 border-x border-slate-200 text-center text-sm font-medium text-slate-900 outline-none"
      />

      <button
        type="button"
        className="flex h-10 w-10 items-center justify-center text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        onClick={() => scheduleChange(quantity + 1)}
        disabled={disabled}
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
