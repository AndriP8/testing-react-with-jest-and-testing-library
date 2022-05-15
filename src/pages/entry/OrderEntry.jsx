import React from "react";
import { useOrderDetails } from "../../contexts/OrderDetail";
import Option from "./Option";

const OrderEntry = () => {
  const [orderDetails] = useOrderDetails();

  return (
    <div>
      <h1>Design your sundae!</h1>
      <Option optionType={"scoops"} />
      <Option optionType={"toppings"} />
      <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
    </div>
  );
};

export default OrderEntry;
