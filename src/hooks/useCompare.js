import { useCallback, useEffect, useState } from "react";

import {
  getCompareProductIds,
  addCompareProductId,
  removeCompareProductId,
  clearCompareProducts,
} from "../utils/compareProducts";

export default function useCompare() {
  const [compareIds, setCompareIds] = useState([]);

  useEffect(() => {
    const sync = () => {
      setCompareIds(getCompareProductIds());
    };

    sync();

    window.addEventListener("compare-products-change", sync);

    return () => {
      window.removeEventListener("compare-products-change", sync);
    };
  }, []);

  const isCompared = useCallback(
    (id) => {
      return compareIds.includes(String(id));
    },
    [compareIds],
  );

  const add = useCallback((id) => {
    return addCompareProductId(String(id));
  }, []);

  const remove = useCallback((id) => {
    return removeCompareProductId(String(id));
  }, []);

  const clear = useCallback(() => {
    return clearCompareProducts();
  }, []);

  const toggle = useCallback(
    (id) => {
      if (isCompared(id)) {
        remove(id);
      } else {
        add(id);
      }
    },
    [isCompared, add, remove],
  );

  return {
    compareIds,

    isCompared,

    add,

    remove,

    clear,

    toggle,
  };
}
