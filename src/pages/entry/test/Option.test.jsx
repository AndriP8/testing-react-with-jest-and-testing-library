import { render, screen } from "@testing-library/react";
import Option from "../Option";

it("display image for each scoop option from server", async () => {
  render(<Option optionType="scoops" />);

  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

it("display image for each topping option from server", async () => {
  render(<Option optionType={"toppings"} />);

  const toopingImages = await screen.findAllByRole("img", {
    name: /topping$/i
  });
  expect(toopingImages).toHaveLength(3);

  const altText = toopingImages.map((element) => element.alt);
  expect(altText).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fudge topping"
  ]);
});
