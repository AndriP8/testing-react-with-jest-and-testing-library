import React from "react";
import { pricePerItem } from "../constants";

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
    minimumFractionDigits: 2
  }).format(amount);
};

const OrderDetails = React.createContext();

export const useOrderDetails = () => {
  const context = React.useContext(OrderDetails);

  if (!context) {
    throw new Error(
      "sueOrderDetails must be used within an OrderDetailsProvider"
    );
  }

  return context;
};

const calculateSubtotal = (optionType, optionCounts) => {
  let optionCount = 0;
  for (const count of optionCounts[optionType].values()) {
    optionCount += count;
  }
  return optionCount * pricePerItem[optionType];
};

export const OrderDetailsProvider = (props) => {
  const [optionCounts, setOptionCounts] = React.useState({
    scoops: new Map(),
    toppings: new Map()
  });

  const zeroCurrency = formatCurrency(0);

  const [totals, setTotals] = React.useState({
    scoops: zeroCurrency,
    toppings: zeroCurrency,
    grandTotal: zeroCurrency
  });

  React.useEffect(() => {
    const scoopsSubtotal = calculateSubtotal("scoops", optionCounts);
    const toppingsSubtotal = calculateSubtotal("toppings", optionCounts);
    const grandTotal = scoopsSubtotal + toppingsSubtotal;
    setTotals({
      scoops: formatCurrency(scoopsSubtotal),
      toppings: formatCurrency(toppingsSubtotal),
      grandTotal: formatCurrency(grandTotal)
    });
  }, [optionCounts]);

  const value = React.useMemo(() => {
    const updateItemCount = (itemName, newItemCount, optionType) => {
      const newOptionCounts = { ...optionCounts };

      const optionCountsMap = optionCounts[optionType];
      optionCountsMap.set(itemName, parseInt(newItemCount));

      setOptionCounts(newOptionCounts);
    };
    return [{ ...optionCounts, totals }, updateItemCount];
  }, [optionCounts, totals]);

  return <OrderDetails.Provider value={value} {...props} />;
};
