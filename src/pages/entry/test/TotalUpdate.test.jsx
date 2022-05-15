import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Option from "../Option";
import OrderEntry from "../OrderEntry";

it("update scoop subtotal when scoops change", async () => {
  render(<Option optionType="scoops" />);
  const scoopSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopSubtotal).toHaveTextContent("0.00");

  const vanillaInput = await screen.findByRole("spinbutton", {
    name: /vanilla/i
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  expect(scoopSubtotal).toHaveTextContent(/2.00$/);

  const chocolateInput = await screen.findByRole("spinbutton", {
    name: /chocolate/i
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");
  expect(scoopSubtotal).toHaveTextContent("6.00");
});

it("update toppings subtotal when toppings change", async () => {
  render(<Option optionType="toppings" />);

  const toppingTotal = screen.getByText("Toppings total: $", { exact: false });
  expect(toppingTotal).toHaveTextContent("0.00");

  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: /cherries/i
  });
  userEvent.click(cherriesCheckbox);
  expect(toppingTotal).toHaveTextContent("1.50");

  const hotFudgeCheckbox = screen.getByRole("checkbox", { name: /hot fudge/i });
  userEvent.click(hotFudgeCheckbox);
  expect(toppingTotal).toHaveTextContent("3.00");

  userEvent.click(hotFudgeCheckbox);
  expect(toppingTotal).toHaveTextContent("1.50");
});

describe("grand total", () => {
  test("grand total start at $0.00", () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i
    });
    expect(grandTotal).toHaveTextContent("0.00");
  });
  test("grand total updates properly if scoop is added first", async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i
    });

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: /vanilla/i
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "2");
    expect(grandTotal).toHaveTextContent("4.00");

    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: /cherries/i
    });
    userEvent.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("5.50");
  });
  test("grand total updates properly if topping is added first", async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i
    });

    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: /cherries/i
    });
    userEvent.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("1.50");

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: /vanilla/i
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "2");
    expect(grandTotal).toHaveTextContent("5.50");
  });
  test("grand total updates properly if item is removed", async () => {
    render(<OrderEntry />);

    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: /cherries/i
    });
    userEvent.click(cherriesCheckbox);

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: /vanilla/i
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "2");

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");

    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i
    });
    expect(grandTotal).toHaveTextContent("3.50");

    userEvent.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("2.00");
  });
});
