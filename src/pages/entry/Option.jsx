import axios from "axios";
import React from "react";
import { Row } from "react-bootstrap";
import { pricePerItem } from "../../constants";
import { useOrderDetails } from "../../contexts/OrderDetail";
import AlertBanner from "../common/AlertBanner";
import ScoopOption from "./ScoopOption";
import ToppingOption from "./ToppingOption";

const Option = ({ optionType }) => {
  const [items, setItems] = React.useState([]);
  const [error, setError] = React.useState(false);
  const [orderDetails, updateItemCount] = useOrderDetails();
  React.useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((res) => setItems(res.data))
      .catch((err) => setError(true));
  }, [optionType]);

  if (error) {
    return <AlertBanner />;
  }

  const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOption;
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
      updateItemCount={(itemName, newItemCount) =>
        updateItemCount(itemName, newItemCount, optionType)
      }
    />
  ));

  return (
    <>
      <h2>{title}</h2>
      <p>{pricePerItem[optionType]} each</p>
      <p>
        {title} total: {orderDetails.totals[optionType]}
      </p>
      <Row>{optionItems}</Row>;
    </>
  );
};

export default Option;
