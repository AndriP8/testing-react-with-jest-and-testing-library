import axios from "axios";
import React from "react";
import { Button } from "react-bootstrap";
import { useOrderDetails } from "../../contexts/OrderDetail";

const OrderConfirmation = ({ setOrderPhase }) => {
  const [, , resetOrder] = useOrderDetails();
  const [orderNumber, setOrderNumber] = React.useState(null);

  const handleClick = () => {
    resetOrder();
    setOrderPhase("inProgress");
  };

  React.useEffect(() => {
    axios
      .post(`http://localhost:3030/order`)
      .then((res) => setOrderNumber(res.data.orderNumber));
  }, []);


  if (orderNumber) {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Thank You!</h1>
        <p>Your order number is {orderNumber}</p>
        <p style={{ fontSize: "25%" }}>
          as per our terms and conditions, nothing will happen now
        </p>
        <Button onClick={handleClick}>Create new order</Button>
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
};

export default OrderConfirmation;
