import App from "../../App";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("App component", () => {
  it("should render App", function () {
    render(<App />);
  });

  it("should open modal when button is clicked", async () => {
    render(<App />);

    const btn = await screen.findByRole("button", /buy or sell/i);

    userEvent.click(btn);

    let modalTitle =
      "this graph displays exchange rate for CAD/USD for the last 30 days";

    modalTitle.replace(/\/courses\/([^\/]*)\/.*/, "$1");

    const title = screen.getByRole("heading", modalTitle);

    expect(title).toBeInTheDocument();
  });
});
