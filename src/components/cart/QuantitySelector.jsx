import { Minus, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function QuantitySelector({ quantity, disabled, onChange }) {
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
    <div className="inline-flex h-9 items-center overflow-hidden rounded-lg border border-gray-300 bg-white">
      <button
        type="button"
        className="flex h-full w-9 items-center justify-center border-r border-gray-300 text-gray-600 transition hover:bg-secom-50 hover:text-secom-600 disabled:cursor-not-allowed disabled:opacity-50"
        onClick={() => scheduleChange(Math.max(1, quantity - 1))}
        disabled={disabled || quantity <= 1}
      >
        <Minus size={14} />
      </button>
      <input
        min="1"
        step="1"
        type="number"
        value={localQuantity}
        onChange={handleInputChange}
        onBlur={commitCurrentValue}
        disabled={disabled}
        className="h-full w-10 border-none text-center text-sm font-medium text-gray-900 outline-none disabled:cursor-not-allowed disabled:bg-gray-50"
      />
      <button
        type="button"
        className="flex h-full w-9 items-center justify-center border-l border-gray-300 text-gray-600 transition hover:bg-secom-50 hover:text-secom-600 disabled:cursor-not-allowed disabled:opacity-50"
        onClick={() => scheduleChange(quantity + 1)}
        disabled={disabled}
      >
        <Plus size={14} />
      </button>
    </div>
  );
}
