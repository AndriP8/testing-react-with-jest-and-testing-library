import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Option from "../Option";

it("update scoop subtotal when scoops change", async () => {
  render(<Option optionType="scoops" />);

  const scoopSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopSubtotal).toHaveTextContent("0.00");

  const vanillaInput = await screen.findByRole("spinbutton", {
    name: /vanilla/i
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  expect(scoopSubtotal).toHaveTextContent("2.00 ");

  const chocolateInput = await screen.findByRole("spinbutton", {
    name: /chocolate/
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");
  expect(scoopSubtotal).toHaveTextContent("6.00");
});
