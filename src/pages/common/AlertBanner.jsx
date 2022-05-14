import { Alert } from "react-bootstrap";

const AlertBanner = ({ message, variant }) => {
  const alertMessage =
    message || "An unxpected error, ocured. Please try again later";
  const alertVariant = variant || "danger";
  return (
    <Alert variant={alertVariant} style={{ backgroundColor: "red" }}>
      {alertMessage}
    </Alert>
  );
};

export default AlertBanner;
