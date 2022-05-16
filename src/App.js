import { Container } from "react-bootstrap";
import OrderEntry from "./pages/entry/OrderEntry";
import { OrderDetailsProvider } from "./contexts/OrderDetail";
import React from "react";
import OrderSummary from "./pages/summary/OrderSummary";
import OrderConfirmation from "./pages/confirmation/OrderConfirmation";

function App() {
  const [orderPhase, setOrderPhase] = React.useState("inProgress");

  let Component = OrderEntry;
  switch (orderPhase) {
    case "inProgress":
      Component = OrderEntry;
      break;
    case "review":
      Component = OrderSummary;
      break;
    case "completed":
      Component = OrderConfirmation;
      break;
    default:
      break;
  }

  return (
      <OrderDetailsProvider>
        <Container>{<Component setOrderPhase={setOrderPhase} />}</Container>
      </OrderDetailsProvider>
  );
}

export default App;
