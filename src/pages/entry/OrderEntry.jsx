import React from "react";
import { Button } from "react-bootstrap";
import { useOrderDetails } from "../../contexts/OrderDetail";
import Option from "./Option";

const OrderEntry = ({setOrderPhase}) => {
  const [orderDetails] = useOrderDetails();

  return (
    <div>
      <h1>Design your sundae!</h1>
      <Option optionType={"scoops"} />
      <Option optionType={"toppings"} />
      <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
      <Button onClick={() => setOrderPhase("review")}>Order Sundae!</Button>
    </div>
  );
};

export default OrderEntry;
